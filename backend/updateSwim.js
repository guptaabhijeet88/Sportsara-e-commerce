import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const updateSwimwear = async () => {
  try {
    const products = await Product.find({ image: { $regex: 'swim' } });
    let count = 1;
    for (let p of products) {
      p.name = `Women's / Girls' Premium Swimsuit Style ${count}`;
      p.description = 'Beautifully designed swimwear for girls and women, featuring excellent comfort, stretch, and durability.';
      await p.save();
      count++;
    }
    console.log('Updated swim products');
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
};
updateSwimwear();
