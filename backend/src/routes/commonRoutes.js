import express from 'express';
import passport from 'passport';
import { register, verify, setPassword, login, refreshToken,logout,googleCallbackController ,googleAuthInitiate} from '../controllers/authController.js';
const router = express.Router();


// Google OAuth routes
router.get('/google',googleAuthInitiate);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  googleCallbackController
);
router.post('/customer/register', register);
router.post('/customer/verify-otp', verify);
router.post('/customer/set-password', setPassword);
router.post('/login', login);
router.get('/refresh_token', refreshToken);
router.post('/logout', logout);

export default router;
