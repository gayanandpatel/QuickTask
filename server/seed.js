import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import Models
import User from './models/User.js';
import Task from './models/Task.js';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

// Connect to DB
await connectDB();

const importData = async () => {
  try {
    console.log('🌱 Starting Rich Data Seed...');

    // 1. Clear existing data
    await User.deleteMany();
    await Task.deleteMany();
    console.log('✅ Existing Data Destroyed');

    // 2. Create the Reviewer User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const user = await User.create({
      username: 'Reviewer',
      email: 'reviewer@example.com',
      password: hashedPassword
    });

    console.log(`👤 User Created: ${user.email}`);

    // Helper to get a date X days ago
    const daysAgo = (days) => {
      const d = new Date();
      d.setDate(d.getDate() - days);
      return d;
    };

    // Helper to get a date X days in the future
    const daysInFuture = (days) => {
      const d = new Date();
      d.setDate(d.getDate() + days);
      return d;
    };

    // 3. Create Diverse Tasks
    const tasks = [
      // --- COMPLETED TASKS (For Productivity Trend Chart - Last 7 Days) ---
      {
        title: 'Fix Login Bug',
        description: 'Resolve the JWT token issue on frontend.',
        priority: 'High',
        status: 'Completed',
        dueDate: daysAgo(6),
        createdAt: daysAgo(6), // 6 days ago
        userId: user._id
      },
      {
        title: 'Draft System Architecture',
        description: 'Draw diagrams for the microservices.',
        priority: 'Medium',
        status: 'Completed',
        dueDate: daysAgo(5),
        createdAt: daysAgo(5), // 5 days ago
        userId: user._id
      },
      {
        title: 'Setup MongoDB Atlas',
        description: 'Configure network access and IP whitelist.',
        priority: 'High',
        status: 'Completed',
        dueDate: daysAgo(4),
        createdAt: daysAgo(4), // 4 days ago
        userId: user._id
      },
      {
        title: 'Configure ESLint',
        description: 'Add linting rules to the React project.',
        priority: 'Low',
        status: 'Completed',
        dueDate: daysAgo(3),
        createdAt: daysAgo(3), // 3 days ago
        userId: user._id
      },
      {
        title: 'Meeting with Client',
        description: 'Discuss Q1 roadmap requirements.',
        priority: 'Medium',
        status: 'Completed',
        dueDate: daysAgo(2),
        createdAt: daysAgo(2), // 2 days ago
        userId: user._id
      },
      {
        title: 'Update README.md',
        description: 'Add installation instructions.',
        priority: 'Low',
        status: 'Completed',
        dueDate: daysAgo(1),
        createdAt: daysAgo(1), // Yesterday
        userId: user._id
      },
      {
        title: 'Deploy to Vercel',
        description: 'Push the latest build to production.',
        priority: 'High',
        status: 'Completed',
        dueDate: new Date(),
        createdAt: new Date(), // Today
        userId: user._id
      },

      // --- PENDING / IN PROGRESS TASKS (For Pie Chart & Stats Cards) ---
      {
        title: 'Implement Dark Mode',
        description: 'Add a toggle for dark/light themes.',
        priority: 'Low',
        status: 'Todo',
        dueDate: daysInFuture(2),
        createdAt: daysAgo(1),
        userId: user._id
      },
      {
        title: 'Refactor Analytics API',
        description: 'Optimize the Python aggregation pipeline.',
        priority: 'High',
        status: 'In Progress',
        dueDate: daysInFuture(1),
        createdAt: daysAgo(2),
        userId: user._id
      },
      {
        title: 'Design Logo',
        description: 'Create SVGs for the branding.',
        priority: 'Medium',
        status: 'Todo',
        dueDate: daysInFuture(5),
        createdAt: daysAgo(3),
        userId: user._id
      },
      {
        title: 'Write Unit Tests',
        description: 'Cover the auth middleware with tests.',
        priority: 'High',
        status: 'Todo',
        dueDate: daysInFuture(3),
        createdAt: daysAgo(1),
        userId: user._id
      },
      {
        title: 'Optimize Database Indexing',
        description: 'Add indexes to userId and createdAt fields.',
        priority: 'High',
        status: 'In Progress',
        dueDate: daysInFuture(4),
        createdAt: daysAgo(5),
        userId: user._id
      },
      {
        title: 'User Feedback Survey',
        description: 'Prepare Google Form for beta testers.',
        priority: 'Low',
        status: 'Todo',
        dueDate: daysInFuture(7),
        createdAt: daysAgo(2),
        userId: user._id
      },
      {
        title: 'Fix Mobile Navbar',
        description: 'Hamburger menu not opening on iOS.',
        priority: 'Medium',
        status: 'In Progress',
        dueDate: daysInFuture(1),
        createdAt: daysAgo(4),
        userId: user._id
      },
      {
        title: 'Research Competitors',
        description: 'Analyze top 3 task management apps.',
        priority: 'Low',
        status: 'Todo',
        dueDate: daysInFuture(10),
        createdAt: daysAgo(6),
        userId: user._id
      },
      {
        title: 'Dockerize Application',
        description: 'Create Dockerfiles for client and server.',
        priority: 'Medium',
        status: 'Todo',
        dueDate: daysInFuture(6),
        createdAt: daysAgo(1),
        userId: user._id
      },
      {
        title: 'Setup CI/CD Pipeline',
        description: 'Configure GitHub Actions.',
        priority: 'High',
        status: 'Todo',
        dueDate: daysInFuture(8),
        createdAt: daysAgo(2),
        userId: user._id
      },
      {
        title: 'Update Dependencies',
        description: 'Audit npm packages for vulnerabilities.',
        priority: 'Low',
        status: 'In Progress',
        dueDate: daysInFuture(3),
        createdAt: daysAgo(3),
        userId: user._id
      }
    ];

    await Task.insertMany(tasks);
    console.log(`✅ Imported ${tasks.length} Sample Tasks Successfully!`);

    process.exit();
  } catch (error) {
    console.error('❌ Error with data import:', error);
    process.exit(1);
  }
};

importData();