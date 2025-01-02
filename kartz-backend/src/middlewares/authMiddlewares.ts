import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types/customRequest';
export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
