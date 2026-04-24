import express from 'express';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/admin/stats
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const [totalProducts, totalUsers, totalOrders, orders] = await Promise.all([
      Product.countDocuments(),
      User.countDocuments(),
      Order.countDocuments(),
      Order.find().lean(),
    ]);

    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const confirmedOrders = orders.filter((o) => o.status === 'Confirmed').length;
    const shippedOrders = orders.filter((o) => o.status === 'Shipped').length;
    const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;

    // Recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 }).limit(10)
      .populate('user', 'name email').lean();

    // Top selling products
    const productSales = {};
    orders.forEach((o) => {
      o.items.forEach((item) => {
        const id = item.product.toString();
        productSales[id] = (productSales[id] || 0) + item.quantity;
      });
    });
    const topSellingIds = Object.entries(productSales)
      .sort((a, b) => b[1] - a[1]).slice(0, 5);
    const topSelling = await Promise.all(
      topSellingIds.map(async ([id, qty]) => {
        const p = await Product.findById(id).lean();
        return p ? { ...p, totalSold: qty } : null;
      })
    );

    // Low stock
    const lowStock = await Product.find({ stock: { $lt: 15 } }).lean();

    // Monthly revenue (last 6 months)
    const monthlyRevenue = [];
    for (let i = 5; i >= 0; i--) {
      const start = new Date();
      start.setMonth(start.getMonth() - i, 1);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      const monthOrders = orders.filter((o) => {
        const d = new Date(o.createdAt);
        return d >= start && d < end;
      });
      monthlyRevenue.push({
        month: start.toLocaleString('default', { month: 'short', year: 'numeric' }),
        revenue: monthOrders.reduce((s, o) => s + o.totalAmount, 0),
        orders: monthOrders.length,
      });
    }

    res.json({
      totalProducts, totalUsers, totalOrders, totalRevenue,
      confirmedOrders, shippedOrders, deliveredOrders,
      recentOrders, topSelling: topSelling.filter(Boolean), lowStock, monthlyRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/admin/products
router.get('/products', adminAuth, async (req, res) => {
  try { res.json(await Product.find().sort({ createdAt: -1 }).lean()); }
  catch (e) { res.status(500).json({ message: 'Server error' }); }
});

// POST /api/admin/products
router.post('/products', adminAuth, async (req, res) => {
  try {
    const product = await new Product({ ...req.body, user: req.user._id }).save();
    res.status(201).json(product);
  } catch (e) { res.status(500).json({ message: 'Server error', error: e.message }); }
});

// PUT /api/admin/products/:id
router.put('/products/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (e) { res.status(500).json({ message: 'Server error' }); }
});

// DELETE /api/admin/products/:id
router.delete('/products/:id', adminAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (e) { res.status(500).json({ message: 'Server error' }); }
});

// GET /api/admin/orders
router.get('/orders', adminAuth, async (req, res) => {
  try {
    res.json(await Order.find().sort({ createdAt: -1 }).populate('user', 'name email').lean());
  } catch (e) { res.status(500).json({ message: 'Server error' }); }
});

// PUT /api/admin/orders/:id
router.put('/orders/:id', adminAuth, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Not found' });
    res.json(order);
  } catch (e) { res.status(500).json({ message: 'Server error' }); }
});

// GET /api/admin/users
router.get('/users', adminAuth, async (req, res) => {
  try { res.json(await User.find().select('-password -cart').sort({ createdAt: -1 }).lean()); }
  catch (e) { res.status(500).json({ message: 'Server error' }); }
});

// PUT /api/admin/users/:id/role
router.put('/users/:id/role', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Not found' });
    user.role = user.role === 'admin' ? 'user' : 'admin';
    await user.save();
    res.json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (e) { res.status(500).json({ message: 'Server error' }); }
});

export default router;
