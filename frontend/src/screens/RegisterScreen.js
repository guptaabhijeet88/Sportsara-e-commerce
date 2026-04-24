import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const RegisterScreen = () => {
  const [step, setStep] = useState(1); // 1: form, 2: OTP
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, sendOtp, verifyOtp, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) { toast.error('Please fill in all fields'); return; }
    if (password !== confirmPassword) { toast.error('Passwords do not match'); return; }
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }

    setLoading(true);
    try {
      await sendOtp(name, email, password);
      toast.success('OTP sent to your email! 📧');
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP. Please check email configuration.');
    } finally { setLoading(false); }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) { toast.error('Please enter the OTP'); return; }
    setLoading(true);
    try {
      await verifyOtp(email, otp);
      toast.success('Account created successfully! 🎉');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally { setLoading(false); }
  };

  // Google Sign-In
  useEffect(() => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    if (!clientId || clientId === 'your_google_client_id_here') return;

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById('google-signup-btn'),
          { theme: 'outline', size: 'large', width: '100%', text: 'signup_with', shape: 'pill' }
        );
      }
    };
    document.head.appendChild(script);
    return () => { if (document.head.contains(script)) document.head.removeChild(script); };
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      await googleLogin(response.credential);
      toast.success('Account created! 🎉');
      navigate('/');
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.response?.data?.message || error.message || 'Google sign-up failed');
    }
  };

  return (
    <Container className="pt-5 pb-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-lg border-0 auth-card">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <FaUserPlus size={40} className="text-primary mb-3" />
                <h2 style={{ fontWeight: 'bold' }}>{step === 1 ? 'Create Account' : 'Verify Email'}</h2>
                <p className="text-muted">
                  {step === 1 ? 'Join SportSara today' : `Enter the OTP sent to ${email}`}
                </p>
              </div>

              {step === 1 ? (
                <>
                  <Form onSubmit={handleSendOtp}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold"><FaUser className="me-2" />Full Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter your name" value={name}
                        onChange={(e) => setName(e.target.value)} size="lg" className="auth-input" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold"><FaEnvelope className="me-2" />Email</Form.Label>
                      <Form.Control type="email" placeholder="Enter your email" value={email}
                        onChange={(e) => setEmail(e.target.value)} size="lg" className="auth-input" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold"><FaLock className="me-2" />Password</Form.Label>
                      <Form.Control type="password" placeholder="Min. 6 characters" value={password}
                        onChange={(e) => setPassword(e.target.value)} size="lg" className="auth-input" />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold"><FaLock className="me-2" />Confirm Password</Form.Label>
                      <Form.Control type="password" placeholder="Re-enter password" value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} size="lg" className="auth-input" />
                    </Form.Group>
                    <Button type="submit" variant="dark" className="w-100 py-3 fw-bold" disabled={loading}
                      style={{ fontSize: '1.1rem', borderRadius: '10px' }}>
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </Form>

                  {/* Google Sign-Up */}
                  <div className="my-3">
                    <div className="d-flex align-items-center my-3">
                      <hr className="flex-grow-1" /><span className="mx-3 text-muted small">OR</span><hr className="flex-grow-1" />
                    </div>
                    <div id="google-signup-btn" className="d-flex justify-content-center"></div>
                  </div>
                </>
              ) : (
                <Form onSubmit={handleVerifyOtp}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Enter 6-digit OTP</Form.Label>
                    <Form.Control type="text" placeholder="Enter OTP" value={otp} maxLength={6}
                      onChange={(e) => setOtp(e.target.value)} size="lg" className="auth-input text-center"
                      style={{ letterSpacing: '8px', fontSize: '1.5rem' }} />
                  </Form.Group>
                  <Button type="submit" variant="dark" className="w-100 py-3 fw-bold" disabled={loading}
                    style={{ fontSize: '1.1rem', borderRadius: '10px' }}>
                    {loading ? 'Verifying...' : 'Verify & Create Account'}
                  </Button>
                  <Button variant="link" className="w-100 mt-2" onClick={() => setStep(1)}>
                    ← Go Back
                  </Button>
                </Form>
              )}

              <hr className="my-3" />
              <p className="text-center mb-0">
                Already have an account?{' '}
                <Link to="/login" className="fw-bold text-decoration-none" style={{ color: '#e94560' }}>Sign In</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;
