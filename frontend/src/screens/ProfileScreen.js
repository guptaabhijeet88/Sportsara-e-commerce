import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API from '../utils/api';
import toast from 'react-hot-toast';

const ProfileScreen = () => {
  const { user, token } = useAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    try {
      await axios.put(`${API}/auth/profile`, { name, password }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Profile updated successfully');
      setPassword('');
      setConfirmPassword('');
      // Soft refresh to show updated name
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating profile');
    }
  };

  return (
    <Container className="pt-5 pb-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm border-0 p-4" style={{ borderRadius: '16px' }}>
            <h2 className="fw-bold mb-4">👤 My Profile</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ borderRadius: '8px' }} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Email</Form.Label>
                <Form.Control type="email" value={user?.email || ''} disabled style={{ background: '#f8f9fa', borderRadius: '8px' }} />
                <Form.Text className="text-muted">Email cannot be changed for security reasons.</Form.Text>
              </Form.Group>
              
              <hr className="my-4" style={{ borderColor: '#eee' }} />
              
              <h5 className="fw-bold mb-3">Security</h5>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" placeholder="Leave blank to keep current password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ borderRadius: '8px' }} />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ borderRadius: '8px' }} />
              </Form.Group>
              
              <Button type="submit" variant="dark" className="w-100 py-3 fw-bold" style={{ borderRadius: '12px', fontSize: '1rem' }}>
                Update Profile
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
