// src/services/customer/customerService.js
import prisma from '../../config/prisma.js';
import redisClient from '../../config/redis.js';
import { generateOtp, sendOtp } from '../../utils/otpUtils.js';

export const registerCustomer = async (email, password) => {
  const otp = generateOtp();

  // Store OTP in Redis with a 5-minute expiration
  await redisClient.setEx(`otp:${email}`, 300, otp);

  // Send OTP to user's email
  await sendOtp(email, otp);

  return { message: 'OTP sent to your email' };
};

export const verifyOtp = async (email, otp) => {
  const storedOtp = await redisClient.get(`otp:${email}`);

  if (!storedOtp) {
    throw new Error('OTP expired or not found');
  }

  if (storedOtp !== otp) {
    throw new Error('Invalid OTP');
  }

  // Create user in the database
  await prisma.user.create({
    data: { email, password },
  });

  // Delete OTP from Redis
  await redisClient.del(`otp:${email}`);

  return { message: 'Registration successful' };
};
