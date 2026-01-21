import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from environment variables
    await connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Stop the app if DB fails to connect
  }
};

export default connectDB;