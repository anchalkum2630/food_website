import redisClient from '../config/redis.js';
import jwt from 'jsonwebtoken';

export const logoutUser = async (refreshToken) => {
  if (!refreshToken) return;
   const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
   const redisKey = `refreshToken:${decoded.userId}`;
   await redisClient.del(redisKey); // ⛔️ Delete token from Redis
};