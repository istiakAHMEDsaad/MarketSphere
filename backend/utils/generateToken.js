import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/env.js';

export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
};
