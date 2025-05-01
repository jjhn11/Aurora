import express from 'express';
import passport from 'passport';
import checkAuth from '../middlewares/checkAuth.js';

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

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
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

router.get('/status', (req, res) => {
  if (req.isAuthenticated() && req.user) {
    const user = {
      email: req.user.emails[0].value,
      name: req.user.displayName,
      photo: req.user.photos?.[0]?.value || null,
      createdAt: req.user._json?.created_at || new Date().toISOString()
    };
    return res.json({ isAuthenticated: true, user });
  }

  return res.json({ isAuthenticated: false, user: null });
});

export default router;
