import passport from 'passport';
import pkg from 'passport-google-oauth20';
const { Strategy: GoogleStrategy } = pkg; // ✅ WORKS in ESM
import dotenv from 'dotenv';
import { findOrCreateUser,findUserById } from '../services/authService.js'; // Create a method to handle user creation or fetching

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true, // ✅ This line is required
    },
    async (req,accessToken, refreshToken, profile, done) => {
      try {
        const role = req.session.role;
        const user = await findOrCreateUser(profile,role);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); // Store the user ID in session
});

passport.deserializeUser(async (id, done) => {
  const user = await findUserById(id); // Find the user by ID in your DB
  done(null, user);
});
