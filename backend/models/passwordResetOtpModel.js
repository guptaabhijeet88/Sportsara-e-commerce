import mongoose from 'mongoose';

const passwordResetOtpSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

// Auto-delete expired OTPs
passwordResetOtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
// One OTP per email at a time
passwordResetOtpSchema.index({ email: 1 }, { unique: true });

const PasswordResetOtp = mongoose.model('PasswordResetOtp', passwordResetOtpSchema);
export default PasswordResetOtp;
