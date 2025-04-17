import { generateOTP, sendOTP, verifyOTP, hashPassword } from '../utils/otpUtils';
import redis from 'redis';

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
  // Store the email and hashed password in your database
  // Example: await User.create({ email, password: hashedPassword });
  return { message: 'Password set successfully. Your account has been created.' };
};

export { registerUser, verifyUser, setPassword };
