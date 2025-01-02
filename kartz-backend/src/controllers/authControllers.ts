import { Request, Response } from 'express';

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Authentication logic here
    res.status(200).json({ message: 'Login successful', token: 'your-jwt-token' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
