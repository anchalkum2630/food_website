import prisma from '../config/prisma.js'
import { generateAccessToken} from '../utils/jwtUtils.js';
import jwt from 'jsonwebtoken';
import redisClient from '../config/redis.js';

export const refresh_token = async (Token) => {
    const decoded = jwt.verify(Token, process.env.REFRESH_TOKEN_SECRET);
  const userId = decoded.userId;

  const storedToken = await redisClient.get(`refreshToken:${userId}`);
  if (!storedToken || storedToken !== Token) {
    throw new Error('Invalid or expired refresh token');
  }

  return generateAccessToken({ userId });
};

export const logoutUser = async (refreshToken) => {
  if (!refreshToken) return;
  const hashed = hashToken(refreshToken);
  await prisma.refreshToken.deleteMany({ where: { token: hashed } });
};