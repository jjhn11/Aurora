import express from 'express';
import passport from 'passport';
import checkAuth from '../middlewares/checkAuth.js';
import ensureUserExists from '../middlewares/ensureUserExists.js';
import User from '../models/User/Users.js';

const router = express.Router();

router.get('/google',
  (req, res, next) => {
    const returnTo = req.query.returnTo || '/';
    res.cookie('returnTo', returnTo, { httpOnly: true });
    next();
  },
  passport.authenticate('google', {
    scope: [
      'profile', 
      'email',
      'https://mail.google.com/'  // Añadir scope para Gmail
    ],
    accessType: 'offline',
    prompt: 'consent'
  })
);

// Actualizar la ruta de callback para incluir ensureUserExists
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  ensureUserExists, // Añadir el middleware aquí
  (req, res) => {
    const returnTo = req.cookies.returnTo || '/';
    res.clearCookie('returnTo');
    res.redirect(returnTo);
  }
);

router.get('/failure', (req, res) => {
  res.status(403).json({ error: 'Acceso denegado. Dominio no permitido.' });
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie('connect.sid');
      res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
  });
});

// Reemplazar la ruta de status con esta versión mejorada
router.get('/status', async (req, res) => {
  if (req.isAuthenticated() && req.user) {
    const googleUser = {
      email: req.user.emails[0].value,
      name: req.user.displayName,
      photo: req.user.photos?.[0]?.value || null,
      createdAt: req.user._json?.created_at || new Date().toISOString()
    };
    
    // Intentar obtener datos adicionales de nuestra BD
    try {
      const dbUser = await User.findOne({ 
        where: { Email: req.user.emails[0].value }
      });
      
      if (dbUser) {
        // Añadir información de la base de datos local
        googleUser.id = dbUser.Id_user;
        googleUser.occupation = dbUser.Id_occupation;
        googleUser.gender = dbUser.Id_gender;
        googleUser.status = dbUser.Id_user_status;
        googleUser.controlNumber = dbUser.Control_num;
      }
    } catch (error) {
      console.error('Error al obtener datos extendidos del usuario:', error);
      // Continuamos sin datos extendidos en caso de error
    }
    
    return res.json({ isAuthenticated: true, user: googleUser });
  }

  return res.json({ isAuthenticated: false, user: null });
});

export default router;
