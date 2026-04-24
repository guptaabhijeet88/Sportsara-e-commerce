import express from 'express';
import Product from '../models/productModel.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/products — Get all products with filters
router.get('/', async (req, res) => {
  try {
    const { category, search, sort, minPrice, maxPrice, featured } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      // Powerful multi-word search engine
      const searchTerms = search.trim().split(/\s+/).map(term => new RegExp(term, 'i'));
      filter.$and = searchTerms.map(term => ({
        $or: [
          { name: term },
          { description: term },
          { brand: term },
          { category: term }
        ]
      }));
    }

    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === 'price_low') sortOption = { price: 1 };
    if (sort === 'price_high') sortOption = { price: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };
    if (sort === 'name') sortOption = { name: 1 };

    const products = await Product.find(filter).sort(sortOption).lean();

    res.set('Cache-Control', 'public, max-age=120, stale-while-revalidate=300');
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/products/:id — Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/products — Create product (Admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const product = new Product({ ...req.body, user: req.user._id });
    const created = await product.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/products/:id — Update product (Admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /api/products/:id — Delete product (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
