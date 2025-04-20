import express from 'express';
import { refreshToken,logout } from '../controllers/common/authCommon.js';

const router = express.Router();

router.post('/refresh_token', refreshToken);
router.post('/logout', logout);

export default router;
