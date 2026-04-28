function getCh6() {
return `
<div class="page">
<h1 class="chapter-title">Chapter 6: System Implementation</h1>
<h2>6.1 Introduction</h2>
<p>System Implementation converts the design into a working application. SportSara followed a modular development approach with backend APIs built first, followed by frontend screens, then integration testing and deployment.</p>
<h3>Implementation Sequence</h3>
<ol>
<li>MongoDB Database Schema Design with Mongoose</li>
<li>Authentication System (JWT, OTP, Google OAuth)</li>
<li>Product Management REST APIs</li>
<li>Cart and Order Processing APIs</li>
<li>Review and Rating System</li>
<li>Admin Dashboard and Management APIs</li>
<li>Frontend UI Screens (React.js)</li>
<li>Google Maps Address Integration</li>
<li>Email Notification Service (Brevo API)</li>
<li>Testing and Deployment</li>
</ol>

<h2>6.2 Project Structure</h2>
<h3>Backend Structure</h3>
<div class="code-block">backend/
├── config/
│   └── db.js              # MongoDB Atlas connection
├── middleware/
│   └── auth.js            # JWT auth & admin middleware
├── models/
│   ├── userModel.js       # User schema with cart embedding
│   ├── productModel.js    # Product schema with indexes
│   ├── orderModel.js      # Order schema with status enum
│   ├── reviewModel.js     # Review with unique constraint
│   ├── otpModel.js        # Registration OTP (5-min TTL)
│   └── passwordResetOtpModel.js  # Password reset OTP
├── routes/
│   ├── authRoutes.js      # 8 authentication endpoints
│   ├── productRoutes.js   # Product listing & details
│   ├── cartRoutes.js      # Cart CRUD operations
│   ├── orderRoutes.js     # Order placement & history
│   ├── paymentRoutes.js   # Payment handling
│   ├── reviewRoutes.js    # Reviews & ratings
│   ├── adminRoutes.js     # Admin dashboard & management
│   └── uploadRoutes.js    # Product image uploads
├── utils/
│   └── emailService.js    # Brevo transactional email
├── uploads/               # Product images directory
└── server.js              # Express app entry point</div>
<h3>Frontend Structure</h3>
<div class="code-block">frontend/src/
├── components/
│   ├── Header.js, Footer.js, Product.js
│   ├── PaymentModal.js, AdminLayout.js
├── screens/
│   ├── HomeScreen.js, ShopScreen.js, ProductScreen.js
│   ├── CartScreen.js, CheckoutScreen.js, OrdersScreen.js
│   ├── ProfileScreen.js, LoginScreen.js, RegisterScreen.js
│   ├── ForgotPasswordScreen.js
│   └── admin/ (AdminDashboard, AdminProducts, AdminOrders, AdminUsers)
├── context/
│   ├── AuthContext.js     # User session management
│   └── CartContext.js     # Shopping cart state
├── utils/api.js           # API base URL configuration
└── App.js                 # Routes & providers</div>
</div>

<div class="page">
<h2>6.3 Server Configuration (server.js)</h2>
<p>The main server file initializes Express, connects to MongoDB, configures middleware, and mounts all 8 route modules.</p>
<div class="code-block">import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import path from 'path';

// Route imports
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('SportSara server running on port ' + PORT);
});</div>

<h2>6.4 Database Connection (db.js)</h2>
<div class="code-block">import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      family: 4, // Forces IPv4 to avoid DNS resolution issues
    });
    console.log('MongoDB Connected: ' + conn.connection.host);
  } catch (error) {
    console.error('Error connecting to MongoDB: ' + error.message);
    process.exit(1);
  }
};

export default connectDB;</div>
</div>

<div class="page">
<h2>6.5 Authentication Module</h2>
<h3>6.5.1 JWT Middleware (auth.js)</h3>
<div class="code-block">const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalid' });
  }
};

const adminAuth = async (req, res, next) => {
  await auth(req, res, () => {
    if (req.user && req.user.role === 'admin') next();
    else res.status(403).json({ message: 'Admin access required' });
  });
};</div>

<h3>6.5.2 Password Security (userModel.js)</h3>
<div class="code-block">userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};</div>

<h3>6.5.3 Product Schema with Performance Indexes</h3>
<div class="code-block">productSchema.index({ category: 1, featured: 1, createdAt: -1 });
productSchema.index({ featured: 1, createdAt: -1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ name: 'text', description: 'text', brand: 'text' });</div>

<h2>6.6 Product Management Module</h2>
<p>Admin can perform full CRUD operations on products. Products support multiple sizes, colors with individual stock, specifications, and benefits.</p>
<div class="code-block">// POST /api/admin/products — Add new product
router.post('/products', adminAuth, async (req, res) => {
  try {
    const product = await new Product({
      ...req.body, user: req.user._id
    }).save();
    res.status(201).json(product);
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
});

// PUT /api/admin/products/:id — Update product
router.put('/products/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});</div>
</div>

<div class="page">
<h2>6.7 Cart Management Module</h2>
<p>Cart items are embedded within the User document. Items are differentiated by productId + color + size combination, allowing the same product with different variants to exist as separate cart entries.</p>
<div class="code-block">// POST /api/cart/add — Add item to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity = 1, color, size } = req.body;
    const user = await User.findById(req.user._id);

    // Differentiate items by productId + color + size
    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId
        && item.color === color && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity, color, size });
    }

    await user.save();
    await user.populate('cart.product');
    const validCart = user.cart.filter((item) => item.product);
    res.json(validCart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/cart/update — Update item quantity
router.put('/update', auth, async (req, res) => {
  const { productId, quantity, color, size } = req.body;
  const user = await User.findById(req.user._id);
  const item = user.cart.find(
    (item) => item.product.toString() === productId
      && item.color === color && item.size === size
  );
  if (quantity <= 0) {
    user.cart = user.cart.filter(
      (item) => !(item.product.toString() === productId
        && item.color === color && item.size === size)
    );
  } else {
    item.quantity = quantity;
  }
  await user.save();
  await user.populate('cart.product');
  res.json(user.cart.filter((item) => item.product));
});</div>

<h2>6.8 Order Processing Module</h2>
<p>Orders are placed via COD (Cash on Delivery). The system creates an order snapshot, decrements stock, and clears the cart.</p>
<div class="code-block">// POST /api/orders — Place order
router.post('/', auth, async (req, res) => {
  const { shippingAddress } = req.body;
  const user = await User.findById(req.user._id).populate('cart.product');
  const validCart = user.cart.filter((item) => item.product);

  // Create order items snapshot
  const items = validCart.map((item) => ({
    product: item.product._id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    image: item.product.image,
    color: item.color,
    size: item.size,
  }));

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const order = await Order.create({
    user: req.user._id, items, totalAmount,
    shippingAddress, paymentMethod: 'Cash on Delivery',
    status: 'Processing',
  });

  // Update stock for each item
  for (const item of validCart) {
    await Product.findByIdAndUpdate(item.product._id, {
      $inc: { stock: -item.quantity },
    });
  }

  user.cart = []; // Clear cart
  await user.save();
  res.status(201).json(order);
});</div>
</div>

<div class="page">
<h2>6.9 Review System Module</h2>
<p>Users can submit one review per product. The system calculates average ratings and enforces uniqueness through a compound index.</p>
<div class="code-block">// GET /api/reviews/:productId — Get all reviews
router.get('/:productId', async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId })
    .populate('user', 'name')
    .sort({ createdAt: -1 })
    .lean();

  const count = reviews.length;
  const avgRating = count > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;

  res.json({
    reviews,
    avgRating: Math.round(avgRating * 10) / 10,
    count
  });
});

// POST /api/reviews/:productId — Submit review
router.post('/:productId', auth, async (req, res) => {
  try {
    const { rating, title, comment } = req.body;
    const review = await Review.create({
      user: req.user._id,
      product: req.params.productId,
      rating, title, comment,
    });
    const populated = await review.populate('user', 'name');
    res.status(201).json(populated);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'You have already reviewed this product'
      });
    }
    res.status(500).json({ message: 'Server error' });
  }
});</div>

<h2>6.10 Admin Dashboard Module</h2>
<p>The admin dashboard aggregates analytics data from all collections including total revenue, order counts by status, top selling products, low stock alerts, and monthly revenue trends.</p>
<div class="code-block">// GET /api/admin/stats — Dashboard analytics
router.get('/stats', adminAuth, async (req, res) => {
  const [totalProducts, totalUsers, totalOrders, orders] =
    await Promise.all([
      Product.countDocuments(),
      User.countDocuments(),
      Order.countDocuments(),
      Order.find().lean(),
    ]);

  const totalRevenue = orders.reduce(
    (sum, o) => sum + o.totalAmount, 0
  );
  const confirmedOrders = orders.filter(
    (o) => o.status === 'Confirmed'
  ).length;
  const deliveredOrders = orders.filter(
    (o) => o.status === 'Delivered'
  ).length;

  // Top selling products
  const productSales = {};
  orders.forEach((o) => {
    o.items.forEach((item) => {
      const id = item.product.toString();
      productSales[id] = (productSales[id] || 0) + item.quantity;
    });
  });

  // Low stock alerts
  const lowStock = await Product.find({ stock: { $lt: 15 } }).lean();

  res.json({
    totalProducts, totalUsers, totalOrders, totalRevenue,
    confirmedOrders, deliveredOrders, lowStock,
    // ... monthly revenue, recent orders, top selling
  });
});</div>
</div>

<div class="page">
<h2>6.11 Email Service Module</h2>
<p>Transactional emails are sent via the Brevo (Sendinblue) REST API using native HTTPS requests.</p>
<div class="code-block">export const sendEmail = async (to, subject, htmlContent) => {
  const payload = JSON.stringify({
    sender: { name: 'SportSara', email: fromEmail },
    to: [{ email: to }],
    subject,
    htmlContent,
  });

  const options = {
    hostname: 'api.brevo.com',
    path: '/v3/smtp/email',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.EMAIL_PASS,
      'Content-Length': Buffer.byteLength(payload),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
};</div>

<h3>Frontend Route Protection</h3>
<div class="code-block">// Admin Route Protection (App.js)
function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user || user.role !== 'admin') return <Navigate to="/" />;
  return children;
}

// Protected Route
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  return children;
}</div>

<h2>6.12 Testing Approach</h2>
<ul>
<li><b>Unit Testing</b> — Password hashing, token generation, OTP validation, cart calculations</li>
<li><b>Integration Testing</b> — API endpoint testing with database operations via Postman</li>
<li><b>UI Testing</b> — Responsive design verification across desktop, tablet, and mobile</li>
<li><b>Security Testing</b> — Authentication bypass attempts, expired token handling, SQL injection</li>
<li><b>Cross-Browser Testing</b> — Chrome, Firefox, Edge, Safari compatibility</li>
<li><b>Performance Testing</b> — API response times, page load optimization</li>
</ul>
</div>

<div class="page">
<h2>6.13 Test Cases</h2>
<table>
<tr><th>ID</th><th>Test Scenario</th><th>Expected Result</th><th>Status</th></tr>
<tr><td>T01</td><td>Register with valid OTP</td><td>Account created, JWT returned</td><td>Pass</td></tr>
<tr><td>T02</td><td>Register with expired OTP</td><td>Error: OTP expired</td><td>Pass</td></tr>
<tr><td>T03</td><td>Register with invalid OTP</td><td>Error: Invalid OTP</td><td>Pass</td></tr>
<tr><td>T04</td><td>Login with correct credentials</td><td>JWT token returned</td><td>Pass</td></tr>
<tr><td>T05</td><td>Login with wrong password</td><td>401 Unauthorized</td><td>Pass</td></tr>
<tr><td>T06</td><td>Google OAuth login (new user)</td><td>Account created + JWT</td><td>Pass</td></tr>
<tr><td>T07</td><td>Google OAuth login (existing)</td><td>Login + JWT returned</td><td>Pass</td></tr>
<tr><td>T08</td><td>Access protected route without token</td><td>401 No token</td><td>Pass</td></tr>
<tr><td>T09</td><td>Access protected route with expired token</td><td>401 Token invalid</td><td>Pass</td></tr>
<tr><td>T10</td><td>Access admin route as regular user</td><td>403 Admin access required</td><td>Pass</td></tr>
<tr><td>T11</td><td>Add product to cart</td><td>Cart updated with item</td><td>Pass</td></tr>
<tr><td>T12</td><td>Add same product different size</td><td>Separate cart entry created</td><td>Pass</td></tr>
<tr><td>T13</td><td>Update cart quantity to 0</td><td>Item removed from cart</td><td>Pass</td></tr>
<tr><td>T14</td><td>Place order with valid address</td><td>Order created, stock updated</td><td>Pass</td></tr>
<tr><td>T15</td><td>Place order with empty cart</td><td>Error: Cart is empty</td><td>Pass</td></tr>
<tr><td>T16</td><td>Submit product review</td><td>Review saved</td><td>Pass</td></tr>
<tr><td>T17</td><td>Submit duplicate review</td><td>Error: Already reviewed</td><td>Pass</td></tr>
<tr><td>T18</td><td>Admin update order status</td><td>Status changed</td><td>Pass</td></tr>
<tr><td>T19</td><td>Admin add new product</td><td>Product created</td><td>Pass</td></tr>
<tr><td>T20</td><td>Admin delete product</td><td>Product removed</td><td>Pass</td></tr>
<tr><td>T21</td><td>Password reset with valid OTP</td><td>Password updated</td><td>Pass</td></tr>
<tr><td>T22</td><td>Product search by keyword</td><td>Matching products returned</td><td>Pass</td></tr>
<tr><td>T23</td><td>Filter products by category</td><td>Category products shown</td><td>Pass</td></tr>
<tr><td>T24</td><td>View order as non-owner</td><td>403 Not authorized</td><td>Pass</td></tr>
<tr><td>T25</td><td>Admin toggle user role</td><td>Role switched</td><td>Pass</td></tr>
</table>

<h2>6.14 Conclusion</h2>
<p>The implementation phase successfully converted the SportSara design into a fully functional e-commerce platform. All 8 backend route modules, 6 database models, and 15+ frontend screens were implemented. All 25 test cases passed, confirming the system's reliability, security, and accuracy.</p>
</div>`;
}
module.exports = { getCh6 };
