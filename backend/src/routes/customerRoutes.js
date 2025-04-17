import express from 'express';
import { register, verify, setPassword } from '../controllers/customer/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verify);
router.post('/set-password', setPassword);

export default router;
