import React from 'react';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import './Account.css';

const Addresses = () => {
  const addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      street: '123 Organic St',
      city: 'Green City',
      state: 'NY',
      zip: '10001',
      phone: '123-456-7890',
      isDefault: true
    }
  ];

  return (
    <div className="account-section">
      <div className="account-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="account-title">My Addresses</h2>
        <button className="save-btn" style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FiPlus /> Add New
        </button>
      </div>

      <div className="addresses-list">
        {addresses.map(addr => (
          <div key={addr.id} className="address-card" style={{ 
            border: '1px solid #e5e7eb', 
            borderRadius: '8px', 
            padding: '20px', 
            marginBottom: '16px',
            position: 'relative'
          }}>
            {addr.isDefault && (
              <span style={{ 
                position: 'absolute', 
                top: '12px', 
                right: '12px', 
                background: '#dcfce7', 
                color: '#166534', 
                padding: '2px 8px', 
                borderRadius: '4px', 
                fontSize: '0.75rem', 
                fontWeight: 'bold' 
              }}>
                DEFAULT
              </span>
            )}
            
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>{addr.type}</h3>
            <p style={{ margin: '0 0 4px 0', fontWeight: '500' }}>{addr.name}</p>
            <p style={{ margin: '0 0 4px 0', color: '#4b5563' }}>{addr.street}</p>
            <p style={{ margin: '0 0 4px 0', color: '#4b5563' }}>{addr.city}, {addr.state} {addr.zip}</p>
            <p style={{ margin: '0 0 16px 0', color: '#4b5563' }}>Phone: {addr.phone}</p>

            <div className="address-actions" style={{ display: 'flex', gap: '12px' }}>
              <button style={{ 
                background: 'none', 
                border: 'none', 
                color: '#2563eb', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                fontWeight: '500'
              }}>
                <FiEdit /> Edit
              </button>
              <button style={{ 
                background: 'none', 
                border: 'none', 
                color: '#dc2626', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                fontWeight: '500'
              }}>
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addresses;
