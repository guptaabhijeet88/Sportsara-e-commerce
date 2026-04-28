import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';

dotenv.config();

const listUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find({}, 'email name');
    console.log(users);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

listUsers();
