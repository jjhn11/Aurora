require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('./config/passport');
const open = (...args) => import('open').then(m => m.default(...args));
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const checkAuth = require('./middlewares/checkAuth');
const { pool } = require('./config/db');
const { sequelize } = require('./config/db');
const communityRoutes = require('./routes/community');

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
