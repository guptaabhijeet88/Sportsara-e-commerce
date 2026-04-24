import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, ProgressBar } from 'react-bootstrap';
import { FaBox, FaUsers, FaShoppingCart, FaRupeeSign, FaExclamationTriangle, FaChartLine, FaTrophy, FaArrowUp } from 'react-icons/fa';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import API from '../../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${API}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(data);
      } catch (error) {
        console.error('Fetch stats error:', error);
      } finally { setLoading(false); }
    };
    fetchStats();
  }, [token]);

  if (loading) return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '60vh' }}>
      <div className="text-center">
        <div className="spinner-border text-dark mb-3" style={{ width: 50, height: 50 }}></div>
        <h5>Loading Dashboard...</h5>
      </div>
    </div>
  );

  if (!stats) return <div className="text-center p-5"><h4>Failed to load stats</h4></div>;

  const statCards = [
    { title: 'Total Products', value: stats.totalProducts, icon: <FaBox />, color: '#3498db', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { title: 'Total Users', value: stats.totalUsers, icon: <FaUsers />, color: '#2ecc71', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { title: 'Total Orders', value: stats.totalOrders, icon: <FaShoppingCart />, color: '#e67e22', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { title: 'Revenue', value: `₹${stats.totalRevenue?.toLocaleString() || 0}`, icon: <FaRupeeSign />, color: '#e74c3c', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  ];

  // Order status distribution
  const orderStages = [
    { label: 'Processing', count: stats.totalOrders - (stats.confirmedOrders + stats.shippedOrders + stats.deliveredOrders), color: '#f39c12' },
    { label: 'Confirmed', count: stats.confirmedOrders || 0, color: '#3498db' },
    { label: 'Shipped', count: stats.shippedOrders || 0, color: '#9b59b6' },
    { label: 'Delivered', count: stats.deliveredOrders || 0, color: '#27ae60' },
  ];

  return (
    <Container fluid className="p-4" style={{ background: '#f4f6f9', minHeight: '100vh' }}>
      {/* Header & Quick Actions */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold mb-1">📊 Dashboard</h2>
          <p className="text-muted mb-0">Welcome back, Admin! Here's your store overview.</p>
        </div>
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <Badge bg="dark" className="px-3 py-2 fs-6">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
          </Badge>
        </div>
      </div>

      {/* Stat Cards */}
      <Row className="mb-4">
        {statCards.map((card, i) => (
          <Col key={i} xs={6} lg={3} className="mb-3">
            <Card className="border-0 shadow-sm h-100 overflow-hidden" style={{ borderRadius: '14px' }}>
              <Card.Body className="d-flex align-items-center position-relative p-3">
                <div className="d-flex align-items-center justify-content-center rounded-circle me-3"
                  style={{ width: '55px', height: '55px', background: card.gradient, flexShrink: 0 }}>
                  <span style={{ fontSize: '1.4rem', color: 'white' }}>{card.icon}</span>
                </div>
                <div>
                  <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>{card.title}</small>
                  <h3 className="mb-0 fw-bold">{card.value}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        {/* Order Pipeline */}
        <Col lg={8} className="mb-4">
          <Card className="border-0 shadow-sm" style={{ borderRadius: '14px' }}>
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4"><FaChartLine className="me-2 text-primary" />Order Pipeline</h5>
              <div className="d-flex gap-3 mb-4">
                {orderStages.map((stage, i) => (
                  <div key={i} className="flex-fill text-center p-3 rounded" style={{ background: `${stage.color}15`, borderRadius: '12px' }}>
                    <h3 className="fw-bold mb-1" style={{ color: stage.color }}>{stage.count}</h3>
                    <small className="fw-bold text-muted">{stage.label}</small>
                  </div>
                ))}
              </div>
              {stats.totalOrders > 0 && (
                <ProgressBar style={{ height: '10px', borderRadius: '5px' }}>
                  {orderStages.map((stage, i) => (
                    <ProgressBar key={i} now={(stage.count / Math.max(stats.totalOrders, 1)) * 100}
                      style={{ backgroundColor: stage.color }} />
                  ))}
                </ProgressBar>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Revenue Chart */}
        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '14px' }}>
            <Card.Body className="p-4 d-flex flex-column">
              <h5 className="fw-bold mb-3"><FaArrowUp className="me-2 text-success" />Revenue Trends</h5>
              <div style={{ width: '100%', flexGrow: 1, minHeight: '220px' }}>
                {stats.monthlyRevenue?.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.monthlyRevenue} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#764ba2" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} style={{ fontSize: '0.8rem', fill: '#888' }} />
                      <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} cursor={{ stroke: '#667eea', strokeWidth: 1, strokeDasharray: '3 3' }} />
                      <Area type="monotone" dataKey="revenue" stroke="#667eea" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="d-flex align-items-center justify-content-center h-100 text-muted small">
                    No revenue data yet
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Recent Orders */}
        <Col lg={8} className="mb-4">
          <Card className="border-0 shadow-sm" style={{ borderRadius: '14px' }}>
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3">🕒 Recent Orders</h5>
              {stats.recentOrders?.length > 0 ? (
                <Table responsive hover className="mb-0 align-middle">
                  <thead style={{ background: '#f8f9fa' }}><tr><th>Order</th><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                  <tbody>
                    {stats.recentOrders?.slice(0, 8).map((order) => (
                      <tr key={order._id}>
                        <td><span className="fw-bold">#{order._id.slice(-6).toUpperCase()}</span></td>
                        <td>
                          <div className="d-flex align-items-center">
                            {order.user?.avatar ? (
                              <img src={order.user.avatar} alt="user" className="rounded-circle me-2" style={{ width: 32, height: 32, objectFit: 'cover' }} referrerPolicy="no-referrer" />
                            ) : (
                              <div className="rounded-circle d-flex align-items-center justify-content-center me-2"
                                style={{ width: 32, height: 32, background: '#e9ecef', fontSize: '0.8rem', fontWeight: 'bold', color: '#555' }}>
                                {order.user?.name?.[0] || '?'}
                              </div>
                            )}
                            <span className="fw-medium">{order.user?.name || 'N/A'}</span>
                          </div>
                        </td>
                        <td className="fw-bold">₹{order.totalAmount}</td>
                        <td><Badge bg={order.status === 'Delivered' ? 'success' : order.status === 'Cancelled' ? 'danger' : order.status === 'Shipped' ? 'primary' : 'warning'}
                          className="px-2 py-1">{order.status}</Badge></td>
                        <td className="small text-muted">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : <p className="text-muted text-center py-4">No orders yet</p>}
            </Card.Body>
          </Card>
        </Col>

        {/* Low Stock + Top Selling */}
        <Col lg={4} className="mb-4">
          {/* Low Stock */}
          <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '14px' }}>
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3"><FaExclamationTriangle className="text-warning me-2" />Low Stock Alert</h5>
              {stats.lowStock?.length > 0 ? stats.lowStock.slice(0, 5).map((p) => (
                <div key={p._id} className="d-flex justify-content-between align-items-center mb-2 p-2 px-3 rounded"
                  style={{ background: p.stock < 10 ? '#fce4e4' : '#fff3cd', borderRadius: '10px' }}>
                  <span className="small fw-bold" style={{ maxWidth: '70%' }}>{p.name}</span>
                  <Badge bg={p.stock < 10 ? 'danger' : 'warning'} text={p.stock < 10 ? 'light' : 'dark'}>{p.stock} left</Badge>
                </div>
              )) : <p className="text-muted mb-0">All products well stocked! ✅</p>}
            </Card.Body>
          </Card>

          {/* Top Selling */}
          {stats.topSelling?.length > 0 && (
            <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '14px' }}>
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3"><FaTrophy className="text-warning me-2" />Top Sellers</h5>
                {stats.topSelling.slice(0, 5).map((p, i) => (
                  <div key={p._id} className="d-flex align-items-center mb-3">
                    <span className="fw-bold me-3 d-flex align-items-center justify-content-center rounded-circle"
                      style={{ width: 28, height: 28, background: i === 0 ? '#f39c12' : i === 1 ? '#95a5a6' : i === 2 ? '#cd7f32' : '#e9ecef',
                        color: i < 3 ? 'white' : '#333', fontSize: '0.75rem', flexShrink: 0 }}>
                      {i + 1}
                    </span>
                    <div className="flex-grow-1">
                      <small className="fw-bold d-block" style={{ lineHeight: '1.2' }}>{p.name}</small>
                      <small className="text-muted">{p.totalSold} sold · ₹{p.price}</small>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm" style={{ borderRadius: '14px', background: 'linear-gradient(135deg, #1a1a2e, #16213e)', color: 'white' }}>
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4 text-white">⚡ Quick Actions</h5>
              <div className="d-grid gap-3">
                <a href="/admin/products" className="btn btn-light text-start fw-bold p-3 rounded" style={{ textDecoration: 'none' }}>
                  <FaBox className="me-2 text-primary" /> Manage Products
                </a>
                <a href="/admin/orders" className="btn btn-light text-start fw-bold p-3 rounded" style={{ textDecoration: 'none' }}>
                  <FaShoppingCart className="me-2 text-warning" /> View Pending Orders
                </a>
                <a href="/admin/users" className="btn btn-light text-start fw-bold p-3 rounded" style={{ textDecoration: 'none' }}>
                  <FaUsers className="me-2 text-success" /> Customer Directory
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
