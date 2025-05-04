import express from 'express';
import {
  getCustomerProfile,
  updateCustomerProfile,
} from '../controllers/customerController.js';
import { verifyAccessToken } from '../middlewares/verifyToken.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.get('/profile', verifyAccessToken, getCustomerProfile);

// 'pic' is the field name for the file
router.put('/profile', verifyAccessToken, upload.single('pic'), updateCustomerProfile);

export default router;
