// import { JWT_Secret } from "../cryptoConfig.js";
import jwt from 'jsonwebtoken'
import { JWT_Secret } from '../app.js';

//add version to deverify on passwd change
export function generateAccessToken(userId, scope = 0) {
  return jwt.sign({usid: userId, typ: 'access', iss: 'api.libcheck.dvvv.ru', scope: scope}, JWT_Secret, { expiresIn: '7d' });
}

export function generateRefreshToken(userId) {
  return jwt.sign({usid: userId, typ: 'refresh', iss: 'api.libcheck.dvvv.ru'}, JWT_Secret, { expiresIn: '30d' });
}

export function generateResetToken(userId, resetId) {
  return jwt.sign({usid, typ: 'reset_passwd', resetId}, JWT_Secret, { expiresIn: '5m' });
}