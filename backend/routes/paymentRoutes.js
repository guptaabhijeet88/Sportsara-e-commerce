import express from 'express';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// POST /api/payment/create-order
router.post('/create-order', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    const validCart = user.cart.filter((item) => item.product);
    if (validCart.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    const totalAmount = validCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const orderId = 'SPORT_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    res.json({ orderId, amount: totalAmount, currency: 'INR', status: 'created' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/payment/verify
router.post('/verify', auth, async (req, res) => {
  try {
    const { orderId, shippingAddress } = req.body;
    if (!shippingAddress) return res.status(400).json({ message: 'Shipping address required' });

    const user = await User.findById(req.user._id).populate('cart.product');
    const validCart = user.cart.filter((item) => item.product);
    if (validCart.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    const items = validCart.map((item) => ({
      product: item.product._id, name: item.product.name,
      price: item.product.price, quantity: item.quantity, image: item.product.image,
      color: item.color, size: item.size,
    }));
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({
      user: req.user._id, items, totalAmount, shippingAddress,
      paymentMethod: 'Online Payment', paymentId: orderId, status: 'Confirmed',
    });

    for (const item of validCart) {
      await Product.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.quantity } });
    }
    user.cart = [];
    await user.save();

    res.json({ message: 'Payment successful', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
