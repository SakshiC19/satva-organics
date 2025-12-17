import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FiSearch, FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';
import Badge from '../../components/common/Badge';
import '../Admin/Admin.css';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const ordersRef = collection(db, 'orders');
      const q = query(ordersRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // If orders collection doesn't exist, set empty array
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <FiClock />;
      case 'processing':
        return <FiPackage />;
      case 'shipped':
        return <FiTruck />;
      case 'delivered':
        return <FiCheckCircle />;
      case 'cancelled':
        return <FiXCircle />;
      default:
        return <FiPackage />;
    }
  };

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'info';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      order.status?.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="admin-orders">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Orders Management</h1>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search by order ID, customer name, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="orders-list">
          {filteredOrders.map(order => (
            <div key={order.id} className="order-card">
              {/* Order Header */}
              <div className="order-header">
                <div className="order-id-section">
                  <h3 className="order-id">#{order.id}</h3>
                  <span className="order-date">{formatDate(order.createdAt)}</span>
                </div>
                <Badge 
                  variant={getStatusVariant(order.status)} 
                  icon={getStatusIcon(order.status)}
                >
                  {order.status || 'Pending'}
                </Badge>
              </div>

              {/* Order Body */}
              <div className="order-body">
                {/* Product Details */}
                <div className="order-section">
                  <h4 className="section-title">Product Details</h4>
                  {order.items && order.items.length > 0 ? (
                    <div className="order-items">
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item">
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="item-image" 
                            />
                          )}
                          <div className="item-details">
                            <p className="item-name">{item.name || 'Product'}</p>
                            <p className="item-quantity">Qty: {item.quantity || 1}</p>
                            <p className="item-price">₹{item.price || 0}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-data">No product details available</p>
                  )}
                </div>

                {/* Customer & Shipping Details */}
                <div className="order-section">
                  <h4 className="section-title">Customer & Shipping</h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Name:</span>
                      <span className="info-value">{order.customerName || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email:</span>
                      <span className="info-value">{order.customerEmail || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Phone:</span>
                      <span className="info-value">{order.customerPhone || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Address:</span>
                      <span className="info-value">
                        {order.shippingAddress ? 
                          `${order.shippingAddress.street || ''}, ${order.shippingAddress.city || ''}, ${order.shippingAddress.state || ''} - ${order.shippingAddress.pincode || ''}` 
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="order-section">
                  <h4 className="section-title">Payment Details</h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Method:</span>
                      <span className="info-value">{order.paymentMethod || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Status:</span>
                      <span className="info-value">{order.paymentStatus || 'Pending'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Total Amount:</span>
                      <span className="info-value total-amount">₹{order.totalAmount || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <FiPackage size={64} />
          <h3>No Orders Found</h3>
          <p>
            {searchTerm || statusFilter !== 'all' 
              ? 'No orders match your search criteria.' 
              : 'No orders have been placed yet.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;
