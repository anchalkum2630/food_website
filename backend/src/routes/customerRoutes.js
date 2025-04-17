// src/routes/customerRoutes.js
import express from 'express';
import { register, verify } from '../controllers/customer/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/verify', verify);

export default router;
