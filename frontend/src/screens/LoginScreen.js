import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill in all fields'); return; }
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back! 🎉');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
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
          document.getElementById('google-signin-btn'),
          { theme: 'outline', size: 'large', width: '100%', text: 'signin_with', shape: 'pill' }
        );
      }
    };
    document.head.appendChild(script);
    return () => { if (document.head.contains(script)) document.head.removeChild(script); };
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      await googleLogin(response.credential);
      toast.success('Welcome! 🎉');
      navigate('/');
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.response?.data?.message || error.message || 'Google sign-in failed');
    }
  };

  return (
    <Container className="pt-5 pb-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-lg border-0 auth-card">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <FaSignInAlt size={40} className="text-primary mb-3" />
                <h2 style={{ fontWeight: 'bold' }}>Welcome Back</h2>
                <p className="text-muted">Sign in to your SportSara account</p>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold"><FaEnvelope className="me-2" />Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" value={email}
                    onChange={(e) => setEmail(e.target.value)} size="lg" className="auth-input" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold"><FaLock className="me-2" />Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter your password" value={password}
                    onChange={(e) => setPassword(e.target.value)} size="lg" className="auth-input" />
                </Form.Group>

                <div className="text-end mb-3">
                  <Link to="/forgot-password" className="text-decoration-none" style={{ color: '#e94560' }}>
                    Forgot Password?
                  </Link>
                </div>

                <Button type="submit" variant="dark" className="w-100 py-3 fw-bold" disabled={loading}
                  style={{ fontSize: '1.1rem', borderRadius: '10px' }}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </Form>

              {/* Google Sign-In */}
              <div className="my-3">
                <div className="d-flex align-items-center my-3">
                  <hr className="flex-grow-1" /><span className="mx-3 text-muted small">OR</span><hr className="flex-grow-1" />
                </div>
                <div id="google-signin-btn" className="d-flex justify-content-center"></div>
              </div>

              <hr className="my-3" />

              <p className="text-center mb-0">
                Don't have an account?{' '}
                <Link to="/register" className="fw-bold text-decoration-none" style={{ color: '#e94560' }}>
                  Create Account
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
