import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import connectDB from './config/db';

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin-auth/v1', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
