import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';

dotenv.config();

const deleteUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const emailToDelete = 'dilipgupta07071972@gmail.com';
    const result = await User.deleteOne({ email: emailToDelete });
    
    if (result.deletedCount > 0) {
      console.log(`Successfully deleted user with email: ${emailToDelete}`);
    } else {
      console.log(`User with email ${emailToDelete} not found in the database.`);
    }
    
    process.exit();
  } catch (error) {
    console.error('Error deleting user:', error);
    process.exit(1);
  }
};

deleteUser();
