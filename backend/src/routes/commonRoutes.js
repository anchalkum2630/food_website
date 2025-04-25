import express from 'express';
import passport from 'passport';
import { refreshToken,logout,googleCallbackController } from '../controllers/common/authCommon.js';

const router = express.Router();


// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  googleCallbackController
);


router.post('/refresh_token', refreshToken);
router.post('/logout', logout);

export default router;
