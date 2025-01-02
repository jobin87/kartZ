import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface CustomRequest extends Request {
  user?: string | JwtPayload; // Adjust type based on your application's needs
}
