import { generateAccessToken} from '../utils/jwtUtils.js';
import jwt from 'jsonwebtoken';
import redisClient from '../config/redisConfig.js';

export const refresh_token = async (Token) => {
    const decoded = jwt.verify(Token, process.env.REFRESH_TOKEN_SECRET);
    const userId = decoded.userId;

  const storedToken = await redisClient.get(`refreshToken:${userId}`);
  if (!storedToken || storedToken !== Token) {
    throw new Error('Invalid or expired refresh token');
  }

  return generateAccessToken({ userId });
};

