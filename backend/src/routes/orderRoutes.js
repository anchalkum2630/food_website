 import express from 'express';
 import { order} from '../controllers/orderController.js';
 import { verifyAccessToken } from '../middlewares/verifyToken.js';
 const router = express.Router();
 router.post('/book',verifyAccessToken, order);
 export default router;