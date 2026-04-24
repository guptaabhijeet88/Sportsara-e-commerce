import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  isAdmin: Boolean,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

const getAdmin = async () => {
  try {
    const adminUser = await User.findOne({ isAdmin: true });
    if (adminUser) {
      console.log('Admin found:');
      console.log('Email:', adminUser.email);
      console.log('Name:', adminUser.name);
      console.log('Note: Admin password is usually 123456 or password or admin123 or similar if it was seeded.');
    } else {
      console.log('No admin user found.');
    }
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

getAdmin();
