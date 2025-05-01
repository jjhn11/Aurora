import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import { executeSqlFile, sequelize } from './config/db.js';
import passport from './config/passport.js';
import checkAuth from './middlewares/checkAuth.js';
import authRoutes from './routes/auth.js';
import communityRoutes from './routes/community.js';
import taskRoutes from './routes/task.js';

dotenv.config();
const open = (...args) => import('open').then(m => m.default(...args));

import { isProfane } from './middlewares/checkProfane.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());



app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false, 
  rolling: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1 * 60 * 1000,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true
  }
}));

executeSqlFile('src/data/sample_data.sql');

app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api', communityRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'backend' }));

// Home (protegido)
app.get('/', checkAuth, (req, res) => {
  res.json({ message: 'Tas loggeado tilin' });
});

app.post('/test/profanity', isProfane(['texto1', 'texto2', 'texto3']), (req, res) => {
  console.log(req.body);
  res.json({ message: 'No hay profanidad' });
});

// DB init  **************CONSULTAS MANUALES*************
// async function connectWithRetry(maxAttempts = 10, delay = 5000) {
//   let attempts = 0;
//   while (attempts < maxAttempts) {
//     try {
//       const conn = await pool.getConnection();
//       const [rows] = await conn.query('SELECT NOW() as now');
//       console.log('Database connected:', rows[0].now);
//       conn.release();
//       return true;
//     } catch (err) {
//       attempts++;
//       console.log(`Attempt ${attempts} failed:`, err.message);
//       await new Promise(r => setTimeout(r, delay));
//     }
//   }
//   return false;
// }

// DB init with Sequelize
async function connectWithRetry(maxAttempts = 10, delay = 5000) {
  let attempts = 0;
  while (attempts < maxAttempts) {
    try {
      await sequelize.authenticate();
      console.log(' Database connected successfully with Sequelize.');
      await sequelize.sync({ force: false }); 
      // await CommunityEventAttendance.sync(); // Por si no se sincroniza con la linea de arriba
      console.log('Database synchronized successfully.');
      return true;
    } catch (err) {
      attempts++;
      console.log(`Attempt ${attempts} failed:`, err.message);
      await new Promise(r => setTimeout(r, delay));
    }
  }
  return false;
}



// Start server
async function startServer() {
  const server = app.listen(PORT, '0.0.0.0', async () => {
    console.log(`Server running on port ${PORT}`);
    if (process.env.NODE_ENV !== 'production') {
      await open(`http://localhost:${PORT}`);
    }
  });

  const connected = await connectWithRetry();
  if (!connected) {
    console.error('DB connection failed. Exiting.');
    server.close();
    process.exit(1);
  }
}

startServer().catch(err => {
  console.error('Startup error:', err);
  process.exit(1);
});

console.log('Modelo registrado: ', Object.keys(sequelize.models));
