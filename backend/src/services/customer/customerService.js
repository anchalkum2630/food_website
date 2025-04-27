import { generateOTP, sendOTP, verifyOTP, hashPassword } from '../../utils/otpUtils.js';
import prisma from '../../config/prismaConfig.js'
import { generateAccessToken,generateRefreshToken } from '../../utils/jwtUtils.js';
import bcrypt from 'bcryptjs';
import redisClient from '../../config/redisConfig.js';

// const redisClient = redis.createClient({ url: process.env.REDIS_URL });
// await redisClient.connect();

const registerUser = async (email) => {
   const existingUser = await prisma.User.findUnique({
    where: { email },
  });
  // console.log(existingUser)
  if (existingUser) {
    return {success: false};
  }

  // If email doesn't exist, generate OTP and send it
  const otp = generateOTP();
  await redisClient.setEx(`otp:${email}`, 300, otp); // OTP expires in 5 minutes
  await sendOTP(email, otp); // Send OTP to email
  
  return { success: true,message: 'OTP sent to your email address' };
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
  // console.log(email,password)
  const user = await prisma.User.findUnique({ where: { email } });
  if (!user || !user.password) throw new Error('Invalid credentials');
  // console.log(user)
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const accessToken = generateAccessToken({ userId: user.id });
  const refreshToken = generateRefreshToken({ userId: user.id });

  // Optional: store hashed refresh token in DB
  // const hashed = hashToken(refreshToken);
   await redisClient.set(`refreshToken:${user.id}`, refreshToken, {
    EX: 7 * 24 * 60 * 60, // 7 days
  });

  // console.log('Access:', accessToken);
  // console.log('Refresh:', refreshToken);

  return { accessToken, refreshToken };
};

export { registerUser, verifyUser, insertPassword,loginUser };
