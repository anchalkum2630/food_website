import { refresh_token } from '../../services/refreshTokenService.js';
import { logoutUser } from '../../services/logoutService.js';
import { generateAccessToken,generateRefreshToken } from '../../utils/jwtUtils.js';
import redisClient from '../../config/redisConfig.js';

export const googleCallbackController = async(req, res) => {
  try {
    const user = req.user;
    const accessToken = generateAccessToken({ userId: user.id });
    const refreshToken = generateRefreshToken({ userId: user.id });

   await redisClient.set(`refreshToken:${user.id}`, refreshToken, {
    EX: 7 * 24 * 60 * 60, // 7 days
  });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    console.log("google login done")
    res.status(200).json({ accessToken , refreshToken });
  } catch (error) {
    console.error('Google Callback Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const refreshToken = async (req, res) => {
  
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ message: 'Refresh token missing' });
  // console.log(token)
  try {
    const newAccessToken = await refresh_token(token);
    // console.log(token)
    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    console.log("error")
    res.status(403).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    await logoutUser(req.cookies?.refreshToken);
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


