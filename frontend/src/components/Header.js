// Header component
import { Navbar, Nav, Container, Badge, NavDropdown, Form, InputGroup } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaBoxOpen, FaCog, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/shop?search=${encodeURIComponent(keyword)}`);
    } else {
      navigate('/shop');
    }
  };

  return (
    <header>
      <Navbar bg="white" expand="md" collapseOnSelect className="py-0 premium-navbar shadow-sm sticky-top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="m-0 p-0">
            <img src="/images/logo.jpg" alt="SportSara"
              style={{ height: '76px', width: 'auto', display: 'block', objectFit: 'contain' }} />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto py-3 align-items-center">
              {/* Custom Search Engine Bar */}
              <Form onSubmit={submitHandler} className="d-none d-lg-flex me-4 mb-2 mb-lg-0">
                <InputGroup style={{ minWidth: '280px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderRadius: '25px' }}>
                  <Form.Control
                    type="text"
                    placeholder="Search premium gear..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{ borderRadius: '25px 0 0 25px', border: '1px solid #eee', borderRight: 'none', paddingLeft: '20px', fontSize: '0.9rem', boxShadow: 'none' }}
                  />
                  <InputGroup.Text style={{ background: 'white', borderRadius: '0 25px 25px 0', border: '1px solid #eee', borderLeft: 'none', cursor: 'pointer' }} onClick={submitHandler}>
                    <FaSearch color="#1a1a2e" />
                  </InputGroup.Text>
                </InputGroup>
              </Form>

              <Nav.Link as={Link} to="/shop" className="premium-nav-link">Shop</Nav.Link>

              <Nav.Link as={Link} to="/cart" className="premium-nav-link d-flex align-items-center">
                <FaShoppingCart className="me-1" style={{ fontSize: '1.1rem' }} />
                Cart
                {cartCount > 0 && (
                  <Badge pill className="ms-2 premium-badge">{cartCount}</Badge>
                )}
              </Nav.Link>

              <div className="d-none d-md-block mx-2" style={{ height: '20px', borderRight: '1px solid #ddd' }}></div>

              {user ? (
                <NavDropdown title={<span className="premium-nav-link" style={{ letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, fontSize: '0.85rem' }}>
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', marginRight: '8px' }} referrerPolicy="no-referrer" />
                  ) : (
                    <FaUser className="me-1" />
                  )}
                  {user.name.split(' ')[0]}
                </span>} id="user-dropdown">
                  <NavDropdown.Item as={Link} to="/profile"><FaUser className="me-2" />My Profile</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/orders"><FaBoxOpen className="me-2" />My Orders</NavDropdown.Item>
                  {user.role === 'admin' && (
                    <NavDropdown.Item as={Link} to="/admin"><FaCog className="me-2" />Admin Panel</NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}><FaSignOutAlt className="me-2" />Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login" className="premium-nav-link d-flex align-items-center">
                  <FaUser className="me-1" style={{ fontSize: '1.1rem' }} />
                  Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;