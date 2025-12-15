import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Contact from './pages/Contact/Contact';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import AccountLayout from './pages/Account/AccountLayout';
import Profile from './pages/Account/Profile';
import Orders from './pages/Account/Orders';
import Wishlist from './pages/Account/Wishlist';
import Addresses from './pages/Account/Addresses';
import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import Products from './pages/Admin/Products';
import AddProduct from './pages/Admin/AddProduct';
import EditProduct from './pages/Admin/EditProduct';
import MakeAdmin from './components/admin/MakeAdmin';
import { CategoryProvider } from './contexts/CategoryContext';
import './styles/index.css';

// Layout component to wrap pages that need Header and Footer
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <Router>
        <div className="app">
          <Routes>
            {/* Public Routes with Layout */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/shop/*" element={<Layout><Shop /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            
            {/* Auth Routes (Standalone) */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/make-admin" element={<MakeAdmin />} />
            
            {/* Protected User Dashboard Routes */}
            <Route path="/account" element={
              <ProtectedRoute>
                <Layout>
                  <AccountLayout />
                </Layout>
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<Profile />} />
              <Route path="orders" element={<Orders />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="addresses" element={<Addresses />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="products/edit/:id" element={<EditProduct />} />
            </Route>

            {/* Fallback for other routes */}
            <Route path="*" element={<Layout><Home /></Layout>} />
          </Routes>
        </div>
      </Router>
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;
