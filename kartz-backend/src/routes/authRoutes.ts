import express from 'express';
import { adminLogin } from '../controllers/authControllers';

const authRoutes = express.Router();

// Admin login route
authRoutes.post('/admin-login', adminLogin);

export default authRoutes;
