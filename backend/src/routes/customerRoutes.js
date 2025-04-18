import express from 'express';
import { register, verify, setPassword, login } from '../controllers/customer/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verify);
router.post('/set-password', setPassword);
router.post('/login', login);

export default router;
