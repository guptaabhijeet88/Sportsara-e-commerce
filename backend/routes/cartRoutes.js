import express from 'express';
import User from '../models/userModel.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/cart — Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    const validCart = user.cart.filter((item) => item.product); // Filter out deleted products
    res.json(validCart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/cart/add — Add item to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity = 1, color, size } = req.body;
    const user = await User.findById(req.user._id);

    // Differentiate items by productId + color + size
    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId && item.color === color && item.size === size
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
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/cart/update — Update item quantity
router.put('/update', auth, async (req, res) => {
  try {
    const { productId, quantity, color, size } = req.body;
    const user = await User.findById(req.user._id);

    const item = user.cart.find(
      (item) => item.product.toString() === productId && item.color === color && item.size === size
    );

    if (!item) {
      return res.status(404).json({ message: 'Item not in cart' });
    }

    if (quantity <= 0) {
      user.cart = user.cart.filter(
        (item) => !(item.product.toString() === productId && item.color === color && item.size === size)
      );
    } else {
      item.quantity = quantity;
    }

    await user.save();
    await user.populate('cart.product');
    const validCart = user.cart.filter((item) => item.product);
    res.json(validCart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /api/cart/remove/:productId — Remove item from cart
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const { color, size } = req.body; // Needs to use req.body since it's a specific variant
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter(
      (item) => !(item.product.toString() === req.params.productId && item.color === color && item.size === size)
    );
    await user.save();
    await user.populate('cart.product');
    const validCart = user.cart.filter((item) => item.product);
    res.json(validCart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /api/cart/clear — Clear entire cart
router.delete('/clear', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
