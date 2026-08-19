import jwt from 'jsonwebtoken'

const ACCESS_SECRET = process.env.ACCESS_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_SECRET as string;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error('JWT secrets missing');
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET);
}

export function signAccessToken(payload: {
  userId: number;
  role: string;
  phone: string;
}) {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '3d',
  });
}

export function signRefreshToken(payload: {
  userId: number;
}) {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: '30d',
  });
}