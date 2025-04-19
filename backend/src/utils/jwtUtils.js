// src/utils/jwtUtils.js
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString('hex');
};