import { generateOTP, sendOTP, verifyOTP, hashPassword } from '../../utils/otpUtils.js';
import redis from 'redis';
import prisma from '../../config/prisma.js'
import { generateToken } from '../../utils/jwtUtils.js';
import bcrypt from 'bcryptjs';


const redisClient = redis.createClient({ url: process.env.REDIS_URL });
await redisClient.connect();

const registerUser = async (email) => {
  const otp = generateOTP();
  await redisClient.setEx(`otp:${email}`, 300, otp); // OTP expires in 5 minutes
  await sendOTP(email, otp);
  return { message: 'OTP sent to your email address' };
};

const verifyUser = async (email, otp) => {
  const isVerified = await verifyOTP(email, otp);
  if (isVerified) {
    return { message: 'OTP verified successfully. Proceed to set your password.' };
  }
  return { message: 'Invalid OTP' };
};

const insertPassword = async (email, password) => {
  const hashedPassword = await hashPassword(password);

const user = await prisma.User.create({
    data: {
      email,
      password: hashedPassword,
      authType: 'MANUAL',
      // Add other user-specific fields if needed
    },
  });

  // Create Customer linked to the User
  const customer = await prisma.Customer.create({
    data: {
      user: {
        connect: { id: user.id },
      },
      // Add other customer-specific fields if needed
    },
  });


  return { message: 'Password set successfully. Your account has been created.' };
};

const loginUser = async (email, password) => {
  const user = await prisma.User.findUnique({ where: { email } });
  if (!user || !user.password) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken({ userId: user.id });
  return { token };
};

export { registerUser, verifyUser, insertPassword,loginUser };
