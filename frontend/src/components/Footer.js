import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ background: '#1a1a2e', color: '#ccc', marginTop: '60px' }}>
      <Container className="py-5">
        <Row>
          {/* Brand */}
          <Col lg={3} md={6} className="mb-4">
            <h4 className="fw-bold text-white mb-3">🏆 SportSara</h4>
            <p className="small">Your ultimate destination for premium sports equipment, apparel, and accessories. Gear up for greatness!</p>
            <div className="d-flex gap-3 mt-3">
              <FaFacebook size={20} style={{ cursor: 'pointer', color: '#4267B2' }} />
              <FaTwitter size={20} style={{ cursor: 'pointer', color: '#1DA1F2' }} />
              <FaInstagram size={20} style={{ cursor: 'pointer', color: '#E1306C' }} />
              <FaYoutube size={20} style={{ cursor: 'pointer', color: '#FF0000' }} />
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={3} md={6} className="mb-4">
            <h6 className="fw-bold text-white text-uppercase mb-3">Explore</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/shop" className="text-decoration-none" style={{ color: '#ccc' }}>Shop All</Link></li>
              <li className="mb-2"><Link to="/cart" className="text-decoration-none" style={{ color: '#ccc' }}>Cart</Link></li>
              <li className="mb-2"><Link to="/orders" className="text-decoration-none" style={{ color: '#ccc' }}>My Orders</Link></li>
            </ul>
          </Col>

          {/* Categories */}
          <Col lg={3} md={6} className="mb-4">
            <h6 className="fw-bold text-white text-uppercase mb-3">Categories</h6>
            <ul className="list-unstyled">
              <li className="mb-2" style={{ color: '#ccc' }}>Team Sports</li>
              <li className="mb-2" style={{ color: '#ccc' }}>Apparel</li>
              <li className="mb-2" style={{ color: '#ccc' }}>Footwear</li>
              <li className="mb-2" style={{ color: '#ccc' }}>Fitness</li>
              <li className="mb-2" style={{ color: '#ccc' }}>Accessories</li>
            </ul>
          </Col>

          {/* Contact */}
          <Col lg={3} md={6} className="mb-4">
            <h6 className="fw-bold text-white text-uppercase mb-3">Contact Us</h6>
            <p className="small mb-2"><FaMapMarkerAlt className="me-2" />New Delhi, India</p>
            <p className="small mb-2"><FaPhone className="me-2" />+91 98765 43210</p>
            <p className="small mb-2"><FaEnvelope className="me-2" />support@sportsara.com</p>
          </Col>
        </Row>
      </Container>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '15px 0', background: '#16162a' }}>
        <Container>
          <p className="text-center mb-0 small" style={{ color: '#888' }}>
            © {new Date().getFullYear()} SportSara. All rights reserved. Built with ❤️
          </p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
