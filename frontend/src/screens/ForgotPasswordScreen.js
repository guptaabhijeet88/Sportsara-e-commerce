import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaKey } from 'react-icons/fa';
import axios from 'axios';
import API from '../utils/api';
import toast from 'react-hot-toast';

const ForgotPasswordScreen = () => {
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) { toast.error('Please enter your email'); return; }
    setLoading(true);
    try {
      await axios.post(`${API}/auth/forgot-password`, { email });
      toast.success('Reset OTP sent to your email! 📧');
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally { setLoading(false); }
  };

  const handleVerifyAndReset = async (e) => {
    e.preventDefault();
    if (step === 2) { if (!otp) { toast.error('Please enter OTP'); return; } setStep(3); return; }
    if (!newPassword || !confirmPassword) { toast.error('Please fill in all fields'); return; }
    if (newPassword !== confirmPassword) { toast.error('Passwords do not match'); return; }
    if (newPassword.length < 6) { toast.error('Password must be at least 6 characters'); return; }

    setLoading(true);
    try {
      await axios.post(`${API}/auth/reset-password`, { email, otp, newPassword });
      toast.success('Password reset successful! 🎉');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Reset failed');
    } finally { setLoading(false); }
  };

  return (
    <Container className="pt-5 pb-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-lg border-0 auth-card">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <FaKey size={40} className="text-warning mb-3" />
                <h2 style={{ fontWeight: 'bold' }}>
                  {step === 1 ? 'Forgot Password' : step === 2 ? 'Enter OTP' : 'New Password'}
                </h2>
              </div>

              <Form onSubmit={step === 1 ? handleSendOtp : handleVerifyAndReset}>
                {step === 1 && (
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold"><FaEnvelope className="me-2" />Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your registered email" value={email}
                      onChange={(e) => setEmail(e.target.value)} size="lg" className="auth-input" />
                  </Form.Group>
                )}
                {step === 2 && (
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Enter 6-digit OTP</Form.Label>
                    <Form.Control type="text" placeholder="Enter OTP" value={otp} maxLength={6}
                      onChange={(e) => setOtp(e.target.value)} size="lg" className="auth-input text-center"
                      style={{ letterSpacing: '8px', fontSize: '1.5rem' }} />
                  </Form.Group>
                )}
                {step === 3 && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold"><FaLock className="me-2" />New Password</Form.Label>
                      <Form.Control type="password" placeholder="Min. 6 characters" value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} size="lg" className="auth-input" />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold"><FaLock className="me-2" />Confirm Password</Form.Label>
                      <Form.Control type="password" placeholder="Re-enter password" value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} size="lg" className="auth-input" />
                    </Form.Group>
                  </>
                )}
                <Button type="submit" variant="dark" className="w-100 py-3 fw-bold" disabled={loading}
                  style={{ fontSize: '1.1rem', borderRadius: '10px' }}>
                  {loading ? 'Please wait...' : step === 1 ? 'Send OTP' : step === 2 ? 'Continue' : 'Reset Password'}
                </Button>
              </Form>

              <hr className="my-4" />
              <p className="text-center mb-0">
                <Link to="/login" className="fw-bold text-decoration-none" style={{ color: '#e94560' }}>← Back to Sign In</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordScreen;
