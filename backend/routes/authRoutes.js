import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import Otp from '../models/otpModel.js';
import PasswordResetOtp from '../models/passwordResetOtpModel.js';
import { auth } from '../middleware/auth.js';
import { sendEmail } from '../utils/emailService.js';

const router = express.Router();

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// POST /api/auth/send-otp — Send registration OTP
router.post('/send-otp', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Upsert OTP (replace if exists for same email)
    await Otp.findOneAndUpdate(
      { email: email.toLowerCase() },
      { otp, name, password, expiresAt },
      { upsert: true, new: true }
    );

    // Send OTP email
    const otpDigits = otp.split('').map(d => `<td style="width:48px;height:56px;background:#ffffff;border:2px solid #e8e8e8;border-radius:12px;text-align:center;font-size:28px;font-weight:700;color:#1a1a2e;font-family:'Segoe UI',Arial,sans-serif;">${d}</td>`).join('<td style="width:8px;"></td>');
    await sendEmail(
      email,
      'SportSara — Verify Your Email',
      `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head><body style="margin:0;padding:0;background-color:#f0f2f5;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f2f5;padding:40px 20px;">
        <tr><td align="center">
          <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
            <!-- Header -->
            <tr><td style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);padding:40px 40px 32px;text-align:center;">
              <div style="font-size:36px;margin-bottom:12px;">🏆</div>
              <h1 style="color:#ffffff;font-size:24px;font-weight:700;margin:0 0 8px;letter-spacing:-0.5px;">Welcome to SportSara</h1>
              <p style="color:rgba(255,255,255,0.7);font-size:14px;margin:0;">Your gateway to premium sports gear</p>
            </td></tr>
            <!-- Body -->
            <tr><td style="padding:40px 40px 20px;">
              <p style="color:#555;font-size:16px;line-height:1.6;margin:0 0 8px;">Hi <strong style="color:#1a1a2e;">${name}</strong>,</p>
              <p style="color:#555;font-size:16px;line-height:1.6;margin:0 0 32px;">Thank you for signing up! Please use the verification code below to complete your registration:</p>
              <!-- OTP Box -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
                <tr>${otpDigits}</tr>
              </table>
              <!-- Timer -->
              <div style="text-align:center;margin-bottom:32px;">
                <span style="display:inline-block;background:#fff3f5;color:#e94560;font-size:13px;font-weight:600;padding:8px 20px;border-radius:20px;">⏱ Expires in 5 minutes</span>
              </div>
              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #f0f0f0;margin:0 0 24px;">
              <!-- Security Note -->
              <div style="background:#f8f9fa;border-radius:12px;padding:16px 20px;border-left:4px solid #e94560;">
                <p style="color:#666;font-size:13px;line-height:1.5;margin:0;">🔒 <strong>Security Notice:</strong> Never share this code with anyone. SportSara will never ask for your OTP via phone or chat.</p>
              </div>
            </td></tr>
            <!-- Footer -->
            <tr><td style="padding:24px 40px 32px;text-align:center;">
              <p style="color:#999;font-size:12px;line-height:1.5;margin:0;">This is an automated email from SportSara.<br>If you didn't create an account, you can safely ignore this email.</p>
              <p style="color:#ccc;font-size:11px;margin:16px 0 0;">© ${new Date().getFullYear()} SportSara. All rights reserved.</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
      </body></html>`
    );

    res.json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
});

// POST /api/auth/verify-otp — Verify OTP and create user
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({ email: email.toLowerCase() });
    if (!otpRecord) {
      return res.status(400).json({ message: 'OTP expired or not found. Please request a new one.' });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Create user
    const user = await User.create({
      name: otpRecord.name,
      email: otpRecord.email,
      password: otpRecord.password,
    });

    // Delete used OTP
    await Otp.deleteOne({ email: email.toLowerCase() });

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/auth/register — Direct registration (no OTP fallback)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email: email.toLowerCase(), password });
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/auth/login — Email/password login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/auth/google — Google OAuth login/register
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;
    const { OAuth2Client } = await import('google-auth-library');
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Create new user with random password (Google users don't need password)
      const randomPassword = googleId + Date.now().toString();
      user = await User.create({
        name,
        email: email.toLowerCase(),
        password: randomPassword,
        avatar: picture,
      });
    } else {
      // Update existing user with latest Google info
      let isUpdated = false;
      if (picture && user.avatar !== picture) {
        user.avatar = picture;
        isUpdated = true;
      }
      if (name && user.name !== name) {
        user.name = name;
        isUpdated = true;
      }
      if (isUpdated) {
        await user.save();
      }
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: 'Google authentication failed', error: error.message });
  }
});

// GET /api/auth/me — Get current user
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      user: { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role, avatar: req.user.avatar },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/auth/profile — Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    
    if (req.body.password) {
      user.password = req.body.password; // Mongoose pre-save hook handles hashing
    }

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/auth/forgot-password — Send password reset OTP
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'No account found with this email' });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await PasswordResetOtp.findOneAndUpdate(
      { email: email.toLowerCase() },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    const resetOtpDigits = otp.split('').map(d => `<td style="width:48px;height:56px;background:#ffffff;border:2px solid #e8e8e8;border-radius:12px;text-align:center;font-size:28px;font-weight:700;color:#1a1a2e;font-family:'Segoe UI',Arial,sans-serif;">${d}</td>`).join('<td style="width:8px;"></td>');
    await sendEmail(
      email,
      'SportSara — Password Reset',
      `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head><body style="margin:0;padding:0;background-color:#f0f2f5;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f2f5;padding:40px 20px;">
        <tr><td align="center">
          <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
            <!-- Header -->
            <tr><td style="background:linear-gradient(135deg,#e94560 0%,#c62a45 50%,#a01030 100%);padding:40px 40px 32px;text-align:center;">
              <div style="font-size:36px;margin-bottom:12px;">🔐</div>
              <h1 style="color:#ffffff;font-size:24px;font-weight:700;margin:0 0 8px;letter-spacing:-0.5px;">Password Reset</h1>
              <p style="color:rgba(255,255,255,0.8);font-size:14px;margin:0;">Secure account recovery</p>
            </td></tr>
            <!-- Body -->
            <tr><td style="padding:40px 40px 20px;">
              <p style="color:#555;font-size:16px;line-height:1.6;margin:0 0 8px;">Hi there,</p>
              <p style="color:#555;font-size:16px;line-height:1.6;margin:0 0 32px;">We received a request to reset your password. Use the code below to proceed:</p>
              <!-- OTP Box -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
                <tr>${resetOtpDigits}</tr>
              </table>
              <!-- Timer -->
              <div style="text-align:center;margin-bottom:32px;">
                <span style="display:inline-block;background:#fff3f5;color:#e94560;font-size:13px;font-weight:600;padding:8px 20px;border-radius:20px;">⏱ Expires in 5 minutes</span>
              </div>
              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #f0f0f0;margin:0 0 24px;">
              <!-- Security Note -->
              <div style="background:#fef3f2;border-radius:12px;padding:16px 20px;border-left:4px solid #e94560;">
                <p style="color:#666;font-size:13px;line-height:1.5;margin:0;">⚠️ <strong>Didn't request this?</strong> If you didn't ask to reset your password, please ignore this email. Your account is safe — no changes have been made.</p>
              </div>
            </td></tr>
            <!-- Footer -->
            <tr><td style="padding:24px 40px 32px;text-align:center;">
              <p style="color:#999;font-size:12px;line-height:1.5;margin:0;">This is an automated email from SportSara.<br>Never share your reset code with anyone.</p>
              <p style="color:#ccc;font-size:11px;margin:16px 0 0;">© ${new Date().getFullYear()} SportSara. All rights reserved.</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
      </body></html>`
    );

    res.json({ message: 'Password reset OTP sent to your email' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Failed to send reset OTP', error: error.message });
  }
});

// POST /api/auth/reset-password — Verify OTP and update password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const otpRecord = await PasswordResetOtp.findOne({ email: email.toLowerCase() });
    if (!otpRecord) {
      return res.status(400).json({ message: 'OTP expired or not found' });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    user.password = newPassword;
    await user.save(); // Triggers pre-save hash

    await PasswordResetOtp.deleteOne({ email: email.toLowerCase() });

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
