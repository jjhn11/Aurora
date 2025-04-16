const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mysql = require('mysql2/promise');
const cookies = require('cookie-parser');
const open = (...args) => import('open').then(m => m.default(...args));
require('dotenv').config();


const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
      return next();
  } 
  return res.redirect('/auth/google');
}


// Create express app
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookies());

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true
  }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;
  const domain = email.split('@')[1];
  if (domain === process.env.ALLOWED_DOMAIN) {
    return done(null, profile);
  } else {
    return done(null, false, { message: 'Dominio no permitido' });
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get('/auth/google', 
  (req, res, next) => {
    const returnTo = req.query.returnTo || '/';
    res.cookie('returnTo', returnTo, {
      httpOnly: true
    });
    console.log('ReturnTo from query:', returnTo); // Debugging
    next();
  },
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account'  
    })
  );

  app.get('/auth/failure', (req, res) => {
    res.status(403).json({ error: 'Acceso denegado. Dominio no permitido.' });
  });
  
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/failure' }),
    (req, res) => {
      const user = req.user;
      const filteredUser = {
        name: user.displayName,
        email: user.emails[0].value,
        id: user.id 
      };
      // res.json(filteredUser);
      const returnTo = req.cookies.returnTo || '/';
      res.clearCookie('returnTo');
      res.redirect(returnTo);
    }
  );
  

  app.get('/', checkAuth, (req, res) => {
    res.json({ message: 'Tas loggeado tilin' });
  });

  app.get('/auth/logout', (req, res) => {
    // 1. Passport limpia su autenticación
    req.logout((err) => {
        if (err) return next(err);
        
        // 2. express-session limpia su sesión
        req.session.destroy((err) => {
            if (err) return next(err);
            
            // 3. Tú limpias lo que enviaste al cliente
            res.clearCookie('connect.sid');
            
            console.log(`User ${req.user?.email} completely logged out. Must see "undefined".`);
            res.redirect('/');
        });
    });
});

  

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword',
  database: process.env.DB_NAME || 'mydb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Enhanced database connection with retry logic
async function connectWithRetry(maxAttempts = 10, delay = 5000) {
  let attempts = 0;
  
  console.log('Starting database connection attempts...');
  
  while (attempts < maxAttempts) {
    try {
      console.log(`Attempt ${attempts + 1}/${maxAttempts} to connect to database...`);
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT NOW() as now');
      console.log('Database connected:', rows[0].now);
      connection.release();
      return true;
    } catch (err) {
      attempts++;
      console.log(`Database connection attempt ${attempts}/${maxAttempts} failed:`, err.message);
      
      if (attempts >= maxAttempts) {
        console.error('Max connection attempts reached. Giving up.');
        return false;
      }
      
      console.log(`Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend' });
});

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const { name, description, completed } = req.body;
    const [result] = await pool.query(
      'INSERT INTO tasks (name, description, completed) VALUES (?, ?, ?)',
      [name, description, completed]
    );
    
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { name, description, completed } = req.body;
    const taskId = req.params.id;
    
    const [result] = await pool.query(
      'UPDATE tasks SET name = ?, description = ?, completed = ? WHERE id = ?',
      [name, description, completed, taskId]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [taskId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// Start server after ensuring database connection
async function startServer() {
  console.log('Starting server initialization...');

  const server = app.listen(PORT, '0.0.0.0', async () => {
    console.log(`Server process running on port ${PORT}, waiting for database...`);
    if (process.env.NODE_ENV !== 'production') {
      await open(`http://localhost:${PORT}`);
    }
  });
  

//Si activas la base de datos, puedes hacer el retry aquí como antes

  
  // Try to connect to database
  const connected = await connectWithRetry();
  console.log('Database connection result:', connected);
  
  if (!connected) {
    console.error('Failed to connect to database after maximum retries. Shutting down.');
    server.close();
    process.exit(1);
  }
  
  console.log(`Server fully initialized and ready for connections on port ${PORT}`);
}



// Initialize the server with better error handling
console.log('Initializing application...');
startServer().catch(err => {
  console.error('Fatal error during startup:', err);
  process.exit(1);
});