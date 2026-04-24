import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true },
  otp: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

// Auto-delete expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
// One OTP per email at a time
otpSchema.index({ email: 1 }, { unique: true });

const Otp = mongoose.model('Otp', otpSchema);
export default Otp;
