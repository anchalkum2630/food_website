import { refresh_token } from '../../services/refreshTokenService.js';

export const refreshToken = async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ message: 'Refresh token missing' });
  // console.log(token)
  try {
    const newAccessToken = await refresh_token(token);
    console.log(token)
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


