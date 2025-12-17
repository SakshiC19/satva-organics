import React from 'react';
import './Admin.css';

const Dashboard = () => {
  const stats = [
    { label: 'Total Sales', value: '$12,450' },
    { label: 'Total Orders', value: '156' },
    { label: 'Total Products', value: '45' },
    { label: 'Total Users', value: '890' }
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', date: '2023-10-25', amount: '$120.00', status: 'Completed' },
    { id: '#ORD-002', customer: 'Jane Smith', date: '2023-10-24', amount: '$85.50', status: 'Processing' },
    { id: '#ORD-003', customer: 'Bob Johnson', date: '2023-10-24', amount: '$210.00', status: 'Pending' },
    { id: '#ORD-004', customer: 'Alice Brown', date: '2023-10-23', amount: '$45.00', status: 'Completed' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard Overview</h1>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="admin-table-container">
        <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: 0 }}>Recent Orders</h3>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.amount}</td>
                <td>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    backgroundColor: 
                      order.status === 'Completed' ? '#dcfce7' : 
                      order.status === 'Processing' ? '#dbeafe' : '#fef3c7',
                    color: 
                      order.status === 'Completed' ? '#166534' : 
                      order.status === 'Processing' ? '#1e40af' : '#92400e'
                  }}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
