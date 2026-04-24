import { useEffect, useState } from 'react';
import { Container, Card, Badge, Row, Col, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaBox, FaTruck, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API from '../utils/api';

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${API}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data);
      } catch (error) {
        console.error('Fetch orders error:', error);
      } finally { setLoading(false); }
    };
    fetchOrders();
  }, [token, navigate]);

  const statusConfig = {
    Processing: { bg: 'warning', icon: <FaClock /> },
    Confirmed: { bg: 'info', icon: <FaBox /> },
    Shipped: { bg: 'primary', icon: <FaTruck /> },
    Delivered: { bg: 'success', icon: <FaCheckCircle /> },
    Cancelled: { bg: 'danger', icon: <FaTimesCircle /> },
  };

  if (loading) return <Container className="pt-5 text-center"><h4>Loading orders...</h4></Container>;

  return (
    <Container className="pt-4 pb-5">
      <h2 className="mb-4" style={{ fontWeight: 'bold' }}>📦 My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">No orders yet</h4>
          <Link to="/shop" className="btn btn-dark mt-3 fw-bold px-4 py-2">Start Shopping</Link>
        </div>
      ) : (
        orders.map((order) => (
          <Card key={order._id} className="shadow-sm border-0 mb-3">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <div>
                  <small className="text-muted">Order #{order._id.slice(-8).toUpperCase()}</small>
                  <p className="mb-0 text-muted small">{new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}</p>
                </div>
                <Badge bg={statusConfig[order.status]?.bg || 'secondary'} className="px-3 py-2 fs-6">
                  {statusConfig[order.status]?.icon} <span className="ms-1">{order.status}</span>
                </Badge>
              </div>

              <Row>
                {order.items.map((item, idx) => (
                  <Col key={idx} xs={12} className="mb-2">
                    <div className="d-flex align-items-center gap-3">
                      <Image src={item.image} alt={item.name} rounded style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                      <div className="flex-grow-1">
                        <p className="mb-0 fw-bold">{item.name}</p>
                        <small className="text-muted">Qty: {item.quantity} × ₹{item.price}</small>
                      </div>
                      <strong>₹{item.price * item.quantity}</strong>
                    </div>
                  </Col>
                ))}
              </Row>

              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">{order.paymentMethod}</span>
                <h5 className="mb-0 fw-bold text-success">Total: ₹{order.totalAmount}</h5>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default OrdersScreen;
