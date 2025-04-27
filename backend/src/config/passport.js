import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';


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

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

export default passport;
