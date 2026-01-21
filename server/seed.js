import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Fix for __dirname in ES modules (optional, but good for robust pathing)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import your models and DB connection
// ENSURE these files explicitly use "export default" (see Step 2 below)
import User from './models/User.js';
import Task from './models/Task.js';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

// Connect to DB
await connectDB();

const importData = async () => {
  try {
    console.log('🌱 Starting Seed Process...');

    // 1. Clear existing data
    await User.deleteMany();
    await Task.deleteMany();
    console.log('✅ Existing Data Destroyed');

    // 2. Create a Test User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const user = await User.create({
      username: 'Reviewer',
      email: 'reviewer@example.com',
      password: hashedPassword
    });

    console.log(`👤 User Created: ${user.email} (ID: ${user._id})`);

    // 3. Create Sample Tasks
    const tasks = [
      {
        title: 'Review Project Documentation',
        description: 'Read the README.md to understand architecture.',
        priority: 'High',
        status: 'Completed',
        dueDate: new Date(),
        userId: user._id // Linking to the new user
      },
      {
        title: 'Test Authentication',
        description: 'Try logging in and registering a new user.',
        priority: 'High',
        status: 'In Progress',
        dueDate: new Date(Date.now() + 86400000), // Tomorrow
        userId: user._id
      },
      {
        title: 'Check Analytics Dashboard',
        description: 'Verify that the charts are rendering correctly.',
        priority: 'Medium',
        status: 'Todo',
        dueDate: new Date(Date.now() + 172800000), // 2 days later
        userId: user._id
      }
    ];

    // Explicitly catching Task errors
    try {
      await Task.insertMany(tasks);
      console.log('✅ Sample Tasks Imported Successfully!');
    } catch (taskError) {
      console.error('❌ Error Inserting Tasks:', taskError.message);
      // Log validation errors if available
      if (taskError.errors) console.error(taskError.errors);
    }

    process.exit();
  } catch (error) {
    console.error('❌ General Seed Error:', error);
    process.exit(1);
  }
};

importData();