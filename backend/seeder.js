import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/user.js';
import { products, Hit_Arrival, Hot_Picks } from './data/product.js';
import reviewData from './data/reviews.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Review from './models/reviewModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // 1. Wipe existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    await Order.deleteMany();

    // 2. Insert users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // 3. Create reviewer accounts (Indian names from review data)
    const reviewerUsers = [];
    for (const reviewer of reviewData) {
      const email = reviewer.name.toLowerCase().replace(/\s+/g, '.') + '@gmail.com';
      const user = await User.create({
        name: reviewer.name,
        email,
        password: 'password123',  // pre-save hook will hash this
        role: 'user',
      });
      reviewerUsers.push({ user, reviews: reviewer.reviews });
    }

    // 4. Insert all products
    const allGear = [...products, ...Hit_Arrival, ...Hot_Picks];
    const sampleProducts = allGear.map((item) => ({ ...item, user: adminUser }));
    const createdProducts = await Product.insertMany(sampleProducts);

    // 5. Seed reviews — distribute across products
    let reviewIndex = 0;
    for (const product of createdProducts) {
      // Each product gets 2-3 random reviews from different reviewers
      const numReviews = 2 + Math.floor(Math.random() * 2); // 2 or 3
      const shuffled = [...reviewerUsers].sort(() => Math.random() - 0.5);

      for (let i = 0; i < Math.min(numReviews, shuffled.length); i++) {
        const reviewer = shuffled[i];
        const reviewTemplate = reviewer.reviews[reviewIndex % reviewer.reviews.length];

        try {
          await Review.create({
            user: reviewer.user._id,
            product: product._id,
            rating: reviewTemplate.rating,
            title: reviewTemplate.title,
            comment: reviewTemplate.comment,
          });
        } catch (e) {
          // Skip duplicate reviews (same user + product)
        }
        reviewIndex++;
      }
    }

    const totalReviews = await Review.countDocuments();
    console.log(`Data Imported Successfully! 🚀`);
    console.log(`  📦 ${createdProducts.length} products`);
    console.log(`  👤 ${createdUsers.length + reviewerUsers.length} users`);
    console.log(`  ⭐ ${totalReviews} reviews`);
    process.exit();

  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

importData();