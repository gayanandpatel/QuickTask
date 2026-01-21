import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';

// Load environment variables
config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allows frontend to communicate with backend
app.use(json()); // Allows the backend to understand JSON data
app.use('/api/auth', authRoutes); // Auth Routes

// A simple test route to ensure server is working
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});