import { useEffect, useState } from 'react';
import { Container, Table, Badge, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import API from '../../utils/api';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { token } = useAuth();
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${API}/admin/users`, { headers });
        setUsers(data);
      } catch (e) { console.error(e); }
    };
    fetch();
  }, []);

  const toggleRole = async (id) => {
    try {
      const { data } = await axios.put(`${API}/admin/users/${id}/role`, {}, { headers });
      setUsers((prev) => prev.map((u) => u._id === id ? { ...u, role: data.role } : u));
      toast.success(`Role updated to ${data.role}`);
    } catch (e) { toast.error('Failed to update role'); }
  };

  return (
    <Container fluid className="p-4">
      <h2 className="fw-bold mb-4">👥 All Users</h2>
      <Table responsive hover className="shadow-sm bg-white rounded">
        <thead className="table-dark"><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Action</th></tr></thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="align-middle">
              <td>
                <div className="d-flex align-items-center">
                  {user.avatar ? (
                    <img src={user.avatar} alt="user" className="rounded-circle me-3" style={{ width: 40, height: 40, objectFit: 'cover' }} referrerPolicy="no-referrer" />
                  ) : (
                    <div className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ width: 40, height: 40, background: '#e9ecef', fontSize: '1rem', fontWeight: 'bold', color: '#555' }}>
                      {user.name?.[0] || '?'}
                    </div>
                  )}
                  <span className="fw-bold">{user.name}</span>
                </div>
              </td>
              <td>{user.email}</td>
              <td><Badge bg={user.role === 'admin' ? 'danger' : 'primary'}>{user.role}</Badge></td>
              <td className="small">{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <Button variant={user.role === 'admin' ? 'outline-warning' : 'outline-success'} size="sm"
                  onClick={() => toggleRole(user._id)}>
                  {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminUsers;
