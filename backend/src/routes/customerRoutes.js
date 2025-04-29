import express from 'express';
import { getCustomerProfile, updateCustomerProfile } from '../controllers/customerController.js';
import { verifyAccessToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/profile', verifyAccessToken, getCustomerProfile);
router.put('/profile', verifyAccessToken, updateCustomerProfile);

export default router;
