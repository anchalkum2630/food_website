import jwt from 'jsonwebtoken';
import prisma from '../config/prismaConfig.js'; // adjust path to your Prisma client

export const verifyAccessToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;              // standard header name
  // console.log("verify authheader token "+authHeader)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token required' });
  }
  
  const token = authHeader.split(' ')[1];
  // console.log("verify token "+token)
  try {
    // 1. Verify and decode
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    
    // 2. (Optional) Fetch full user record from DB
    const user = await prisma.User.findUnique({
      where: { id: decoded.userId }
    });
    if (!user || user.isBlocked) {
      return res.status(403).json({ message: 'User not found or blocked' });
    }

    // 3. Attach user to request
    req.user = user;
    next();
  } catch (err) {
    console.error('JWT verification failed:', err);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};


