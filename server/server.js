import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

// Load environment variables
config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allows frontend to communicate with backend
app.use(json()); // Allows the backend to understand JSON data
app.use('/api/auth', authRoutes); // Auth Routes
app.use('/api/tasks', taskRoutes); // Task Routes

// A simple test route to ensure server is working
app.get('/', (req, res) => {
  res.send('API is running...');
});

//for local development
// Start the Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// for production deployment
const PORT = process.env.PORT || 5000;

// Only run the server if we are NOT in production (local development)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export the app for Vercel
export default app;