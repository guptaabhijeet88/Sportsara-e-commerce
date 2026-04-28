import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { startKeepAlive } from './utils/keepAlive';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';

// Public Pages
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import PriceScreen from './screens/PriceScreen';
import ShopScreen from './screens/ShopScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrdersScreen from './screens/OrdersScreen';
import ProfileScreen from './screens/ProfileScreen';

// Admin Pages
import AdminDashboard from './screens/admin/AdminDashboard';
import AdminProducts from './screens/admin/AdminProducts';
import AdminOrders from './screens/admin/AdminOrders';
import AdminUsers from './screens/admin/AdminUsers';

// Admin Route Protection
function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user || user.role !== 'admin') return <Navigate to="/" />;
  return children;
}

function AppContent() {
  return (
    <Router>
      <Toaster position="bottom-right" reverseOrder={false} toastOptions={{
        style: { borderRadius: '10px', background: '#333', color: '#fff' },
      }} />

      <Routes>
        {/* Admin Routes (no header/footer) */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        {/* Public Routes (with header/footer) */}
        <Route path="*" element={
          <>
            <Header />
            <main className="py-3" style={{ minHeight: 'calc(100vh - 200px)' }}>
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/shop" element={<ShopScreen />} />
                <Route path="/product/:id" element={<ProductScreen />} />
                <Route path="/price/:maxPrice" element={<PriceScreen />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/checkout" element={<CheckoutScreen />} />
                <Route path="/orders" element={<OrdersScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

function App() {
  useEffect(() => {
    startKeepAlive();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;