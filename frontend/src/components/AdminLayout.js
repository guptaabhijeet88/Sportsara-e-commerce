import { NavLink, Outlet } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FaChartBar, FaBox, FaShoppingCart, FaUsers, FaArrowLeft } from 'react-icons/fa';

const AdminLayout = () => {
  const navItems = [
    { to: '/admin', icon: <FaChartBar />, label: 'Dashboard', end: true },
    { to: '/admin/products', icon: <FaBox />, label: 'Products' },
    { to: '/admin/orders', icon: <FaShoppingCart />, label: 'Orders' },
    { to: '/admin/users', icon: <FaUsers />, label: 'Users' },
  ];

  return (
    <div className="d-flex" style={{ minHeight: 'calc(100vh - 76px)' }}>
      {/* Sidebar */}
      <div className="admin-sidebar" style={{
        width: '250px', background: '#1a1a2e', padding: '20px 0', flexShrink: 0,
      }}>
        <div className="px-3 mb-4">
          <h5 className="text-white fw-bold mb-0">⚙️ Admin Panel</h5>
        </div>
        <Nav className="flex-column">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}
              className={({ isActive }) => `d-flex align-items-center px-3 py-3 text-decoration-none ${isActive ? 'admin-nav-active' : 'admin-nav-link'}`}
              style={{ color: '#ccc', borderLeft: '3px solid transparent', transition: 'all 0.2s' }}>
              <span className="me-3">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '10px 15px' }} />
          <NavLink to="/" className="d-flex align-items-center px-3 py-3 text-decoration-none admin-nav-link" style={{ color: '#ccc' }}>
            <FaArrowLeft className="me-3" /> Back to Store
          </NavLink>
        </Nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1" style={{ background: '#f8f9fa', overflowY: 'auto' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
