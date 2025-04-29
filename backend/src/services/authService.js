import prisma from '../config/prismaConfig.js';
import redisClient from '../config/redisConfig.js';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/jwtUtils.js';
import { generateOTP, sendOTP, verifyOTP, hashPassword } from '../utils/otpUtils.js';
import bcrypt from 'bcryptjs';

// 🌟 Google OAuth login or signup with role
export const findOrCreateUser = async (profile, role) => {
  const { id, emails, displayName, photos } = profile;
  const email = emails[0].value;
  const image = photos ? photos[0].value : null;

  let user = await prisma.User.findUnique({ where: { email } });

  if (!user) {
    // New User
    user = await prisma.User.create({
      data: {
        email,
        name: displayName,
        picUrl: image,
        googleId: id,
      },
    });

    if (role === "customer") {
      await prisma.Customer.create({
        data: {
          user: { connect: { id: user.id } },
          isActive: true,
        },
      });

      // Deactivate chef role if exists
      await prisma.Chef.updateMany({
        where: { userId: user.id },
        data: {
          isActive: false,
          available: false,
        },
      });

    } else if (role === "chef") {
      await prisma.Chef.create({
        data: {
          user: { connect: { id: user.id } },
          isActive: true,
          available: true,
        },
      });

      // Deactivate customer role if exists
      await prisma.Customer.updateMany({
        where: { userId: user.id },
        data: { isActive: false },
      });
    }

  } else {
    // Existing User
    if (!user.googleId) {
      user = await prisma.User.update({
        where: { email },
        data: { googleId: id },
      });
    } else if (user.googleId !== id) {
      throw new Error('This email is already associated with another Google account');
    }

    if (role === "customer") {
      const existingCustomer = await prisma.Customer.findUnique({
        where: { userId: user.id },
      });

      if (!existingCustomer) {
        await prisma.Customer.create({
          data: {
            user: { connect: { id: user.id } },
            isActive: true,
          },
        });
      } else {
        await prisma.Customer.update({
          where: { userId: user.id },
          data: { isActive: true },
        });
      }

      await prisma.Chef.updateMany({
        where: { userId: user.id },
        data: {
          isActive: false,
          available: false,
        },
      });

    } else if (role === "chef") {
      const existingChef = await prisma.Chef.findUnique({
        where: { userId: user.id },
      });

      if (!existingChef) {
        await prisma.Chef.create({
          data: {
            user: { connect: { id: user.id } },
            isActive: true,
            available: true,
          },
        });
      } else {
        await prisma.Chef.update({
          where: { userId: user.id },
          data: {
            isActive: true,
            available: true,
          },
        });
      }

      await prisma.Customer.updateMany({
        where: { userId: user.id },
        data: { isActive: false },
      });
    }
  }

  return user;
};

// ✅ Find user by ID
export const findUserById = async (id) => {
  return await prisma.User.findUnique({
    where: { id },
  });
};

// ✅ Logout (revoke refresh token)
export const logoutUser = async (refreshToken) => {
  if (!refreshToken) return;
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const redisKey = `refreshToken:${decoded.userId}`;
  await redisClient.del(redisKey);
};

// ✅ Refresh token flow
export const refresh_token = async (Token) => {
  const decoded = jwt.verify(Token, process.env.REFRESH_TOKEN_SECRET);
  const userId = decoded.userId;

  const storedToken = await redisClient.get(`refreshToken:${userId}`);
  if (!storedToken || storedToken !== Token) {
    throw new Error('Invalid or expired refresh token');
  }

  return generateAccessToken({ userId });
};

// ✅ Registration: Generate and send OTP
const registerUser = async (email) => {
  const existingUser = await prisma.User.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { success: false };
  }

  const otp = generateOTP();
  await redisClient.setEx(`otp:${email}`, 300, otp); // expires in 5 min
  await sendOTP(email, otp);

  return { success: true, message: 'OTP sent to your email address' };
};

// ✅ OTP verification
const verifyUser = async (email, otp) => {
  const isVerified = await verifyOTP(email, otp);
  if (isVerified) {
    return { message: 'OTP verified successfully. Proceed to set your password.' };
  }
  return { message: 'Invalid OTP' };
};

// ✅ Create user with password + assign role
const insertPassword = async (email, password, role) => {
  const hashedPassword = await hashPassword(password);

  const user = await prisma.User.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  if (role === 'customer') {
    await prisma.Customer.create({
      data: {
        user: { connect: { id: user.id } },
        isActive: true,
      },
    });

    await prisma.Chef.updateMany({
      where: { userId: user.id },
      data: {
        isActive: false,
        available: false,
      },
    });

  } else if (role === 'chef') {
    await prisma.Chef.create({
      data: {
        user: { connect: { id: user.id } },
        isActive: true,
        available: true,
      },
    });

    await prisma.Customer.updateMany({
      where: { userId: user.id },
      data: { isActive: false },
    });
  }

  return { message: 'Password set successfully. Your account has been created.' };
};

// ✅ Login
const loginUser = async (email, password) => {
  const user = await prisma.User.findUnique({ where: { email } });
  if (!user || !user.password) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const accessToken = generateAccessToken({ userId: user.id });
  const refreshToken = generateRefreshToken({ userId: user.id });

  await redisClient.set(`refreshToken:${user.id}`, refreshToken, {
    EX: 7 * 24 * 60 * 60, // 7 days
  });

  return { accessToken, refreshToken, name: user.name };
};

export {
  registerUser,
  verifyUser,
  insertPassword,
  loginUser
};
