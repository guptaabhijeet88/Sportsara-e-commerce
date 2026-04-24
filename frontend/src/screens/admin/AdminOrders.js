import { useEffect, useState } from 'react';
import { Container, Table, Badge, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import API from '../../utils/api';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth();
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${API}/admin/orders`, { headers });
        setOrders(data);
      } catch (e) { console.error(e); }
    };
    fetch();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/admin/orders/${id}`, { status }, { headers });
      setOrders((prev) => prev.map((o) => o._id === id ? { ...o, status } : o));
      toast.success(`Order status updated to ${status}`);
    } catch (e) { toast.error('Failed to update'); }
  };

  const statusColors = { Processing: 'warning', Confirmed: 'info', Shipped: 'primary', Delivered: 'success', Cancelled: 'danger' };

  return (
    <Container fluid className="p-4">
      <h2 className="fw-bold mb-4">📋 All Orders</h2>
      <Table responsive hover className="shadow-sm bg-white rounded">
        <thead className="table-dark"><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Date</th></tr></thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="small fw-bold">#{order._id.slice(-6).toUpperCase()}</td>
              <td>{order.user?.name || 'N/A'}<br /><small className="text-muted">{order.user?.email}</small></td>
              <td>{order.items.length} items</td>
              <td className="fw-bold">₹{order.totalAmount}</td>
              <td><Badge bg="secondary">{order.paymentMethod}</Badge></td>
              <td>
                <Form.Select size="sm" value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)}
                  style={{ minWidth: '130px', borderColor: 'transparent', fontWeight: 'bold' }}>
                  {['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map((s) => <option key={s}>{s}</option>)}
                </Form.Select>
              </td>
              <td className="small">{new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminOrders;
