import redis from 'redis';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = redis.createClient({ url: process.env.REDIS_URL });
await redisClient.connect();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

const verifyOTP = async (email, otp) => {
  const storedOtp = await redisClient.get(`otp:${email}`);
  if (storedOtp === otp) {
    await redisClient.del(`otp:${email}`);
    return true;
  }
  return false;
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export { generateOTP, sendOTP, verifyOTP, hashPassword };
