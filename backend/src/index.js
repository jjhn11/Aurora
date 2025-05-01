import dotenv from 'dotenv'; dotenv.config();
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from './config/passport.js';
const open = (...args) => import('open').then(m => m.default(...args));
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/task.js';
import checkAuth from './middlewares/checkAuth.js';
import { pool, sequelize } from './config/db.js';
import communityRoutes from './routes/community.js';
import mailRoutes from './routes/mail.js';

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
    maxAge: 1 * 60 * 60 * 1000, // 1 hour
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true,
    // javaScriptEnabled: false
  }
}));

app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api', communityRoutes);
app.use('/mail', mailRoutes);

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
