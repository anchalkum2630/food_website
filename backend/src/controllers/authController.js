import { registerUser, verifyUser, insertPassword, loginUser, refresh_token, logoutUser } from '../services/authService.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwtUtils.js';
import redisClient from '../config/redisConfig.js';
import passport from 'passport';

// Register user with email
const register = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  const response = await registerUser(email);
  res.status(200).json(response);
};

// Verify user with OTP
const verify = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }
  const response = await verifyUser(email, otp);
  if (response.message === 'OTP verified successfully. Proceed to set your password.') {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
};

// Set password after OTP verification
const setPassword = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password, and role are required' });
  }

  if (role !== 'chef' && role !== 'customer') {
    return res.status(400).json({ message: 'Invalid role. Must be "chef" or "customer"' });
  }

  try {
    const response = await insertPassword(email, password, role);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Login with email & password
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { name, accessToken, refreshToken ,image } = await loginUser(email, password);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    console.log(accessToken)
    res.status(200).json({ accessToken, name, image});
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// Initiate Google OAuth
const googleAuthInitiate = (req, res, next) => {
  const { role } = req.query;
  req.session.role = role;
  passport.authenticate("google", {
    scope: ["profile", "email"],
     prompt: 'select_account',
    state: role,
  })(req, res, next);
};

// Google OAuth callback
const googleCallbackController = async (req, res) => {
  try {
    const user = req.user;
    // const accessToken = generateAccessToken({ userId: user.id });
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

    delete req.session.role;

    const frontendUrl = "http://localhost:5173";
    res.redirect(`${frontendUrl}/google-callback`);
  } catch (error) {
    console.error('Google Callback Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Refresh access token using refresh token
const refreshAccessToken = async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ message: 'Refresh token missing' });

  try {
    const {accessToken,picUrl} = await refresh_token(token);
    // console.log("in refresh  access  "+accessToken+" image :"+picUrl)
    res.status(200).json({ accessToken: accessToken,picUrl:picUrl });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

// Logout user and clear token
const logout = async (req, res) => {
  try {
    await logoutUser(req.cookies?.refreshToken);
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Export all controller functions
export {
  register,
  verify,
  setPassword,
  login,
  googleAuthInitiate,
  googleCallbackController,
  refreshAccessToken as refreshToken,
  logout
};
