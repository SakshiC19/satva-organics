import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiGrid, FiBox, FiList, FiUsers, FiLogOut, FiHome } from 'react-icons/fi';
import './Admin.css';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: <FiGrid />, label: 'Dashboard' },
    { path: '/admin/products', icon: <FiBox />, label: 'Products' },
    { path: '/admin/categories', icon: <FiList />, label: 'Categories' },
    { path: '/admin/users', icon: <FiUsers />, label: 'Users' },
  ];

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        
        <nav className="admin-nav">
          {menuItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
          
          <div className="admin-nav-divider"></div>
          
          <NavLink to="/" className="admin-nav-item">
            <FiHome />
            <span>View Website</span>
          </NavLink>
          
          <button onClick={handleLogout} className="admin-nav-item logout-btn">
            <FiLogOut />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
