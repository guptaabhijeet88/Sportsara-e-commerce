import { sendEmail } from './utils/emailService.js';
import dotenv from 'dotenv';
dotenv.config();

console.log('Testing email service...');
sendEmail('abhijeetgupta9702@gmail.com', 'Test OTP', 'Your OTP is 123456')
  .then((res) => console.log('Success:', res))
  .catch((err) => console.error('Error:', err));
