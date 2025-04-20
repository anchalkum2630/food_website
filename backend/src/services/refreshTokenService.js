import prisma from '../config/prisma.js'
import { generateAccessToken} from '../utils/jwtUtils.js';

export const refresh_token = async (Token) => {
  // const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  // const hashed = hashToken(refreshToken);

  const tokenInDb = await prisma.User.findUnique({ where: { refreshToken: Token } });
  if (!tokenInDb || tokenInDb.revoked) throw new Error('Invalid refresh token');

  return generateAccessToken({ userId: decoded.userId });
};

export const logoutUser = async (refreshToken) => {
  if (!refreshToken) return;
  const hashed = hashToken(refreshToken);
  await prisma.refreshToken.deleteMany({ where: { token: hashed } });
};