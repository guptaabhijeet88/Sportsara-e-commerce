import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Team Sports', 'Apparel', 'Footwear', 'Accessories', 'Fitness'],
    },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    mrp: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 4, min: 0, max: 5 },
    stock: { type: Number, required: true, default: 50, min: 0 },
    featured: { type: Boolean, default: false },
    // New fields
    sizes: [{ type: String }],
    colors: [
      {
        name: { type: String },
        hex: { type: String },
        stock: { type: Number, default: 10 },
      },
    ],
    warranty: { type: String, default: '' },
    benefits: [{ type: String }],
    specifications: [
      {
        key: { type: String },
        value: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Performance indexes
productSchema.index({ category: 1, featured: 1, createdAt: -1 });
productSchema.index({ featured: 1, createdAt: -1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ name: 'text', description: 'text', brand: 'text' });

const Product = mongoose.model('Product', productSchema);
export default Product;