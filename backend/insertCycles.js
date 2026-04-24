import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import User from './models/userModel.js';

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const addDefaults = (product) => {
  const categoryDefaults = {
    'Fitness': {
      sizes: ['Standard'],
      warranty: '6 Months Warranty',
      benefits: ['Durable frame', 'Smooth riding experience', 'High quality brakes', 'Comfortable saddle'],
      specifications: [
        { key: 'Material', value: 'Alloy/Steel' }, { key: 'Country of Origin', value: 'India' },
      ],
    },
  };
  const defaults = categoryDefaults[product.category] || {};
  return { ...defaults, ...product };
};

const cycles = [
  { name: 'Sportsara Mountain Trail Blazer 21-Speed', image: '/images/cycle1.jpg', description: 'Rugged mountain bike with 21-speed gears, front suspension, and thick knobby tires for off-road adventures.', brand: 'Sportsara', category: 'Fitness', price: 12999, mrp: 18999, rating: 4.6, stock: 15, featured: true, colors: [{ name: 'Matte Black', hex: '#1a1a1a' }, { name: 'Red', hex: '#D32F2F' }], specifications: [{ key: 'Gears', value: '21-Speed Shimano' }, { key: 'Frame', value: 'Alloy Steel' }, { key: 'Brakes', value: 'Dual Disc Brakes' }, { key: 'Tire Size', value: '27.5 inch' }] },
  { name: 'Urban Commuter Hybrid Bike', image: '/images/cycle2.jpg', description: 'Sleek and lightweight hybrid cycle designed for fast city commuting and smooth paved roads.', brand: 'Sportsara', category: 'Fitness', price: 14500, mrp: 21000, rating: 4.8, stock: 10, featured: false, colors: [{ name: 'Space Grey', hex: '#4A4A4A' }, { name: 'Neon Green', hex: '#39FF14' }], specifications: [{ key: 'Gears', value: '7-Speed Shimano' }, { key: 'Frame', value: 'Lightweight Aluminum' }, { key: 'Brakes', value: 'V-Brakes' }, { key: 'Tire Size', value: '700C' }] },
  { name: 'Velocity Pro Road Racing Cycle', image: '/images/cycle3.jpg', description: 'Aerodynamic road bike featuring drop handlebars and skinny tires for maximum speed and efficiency.', brand: 'Sportsara', category: 'Fitness', price: 22999, mrp: 30000, rating: 4.9, stock: 5, featured: true, colors: [{ name: 'Racing Red', hex: '#E53935' }, { name: 'White', hex: '#FFFFFF' }], specifications: [{ key: 'Gears', value: '14-Speed' }, { key: 'Frame', value: 'Carbon Fiber Blend' }, { key: 'Brakes', value: 'Caliper Brakes' }, { key: 'Tire Size', value: '700x25C' }] },
  { name: 'All-Terrain Fat Tire Cruiser', image: '/images/cycle4.jpg', description: 'Beast of a cycle featuring 4-inch ultra-wide fat tires for effortless riding on sand, snow, and mud.', brand: 'Sportsara', category: 'Fitness', price: 18999, mrp: 25999, rating: 4.7, stock: 8, featured: true, colors: [{ name: 'Army Green', hex: '#4B5320' }, { name: 'Black', hex: '#1a1a1a' }], specifications: [{ key: 'Gears', value: '21-Speed' }, { key: 'Frame', value: 'High Carbon Steel' }, { key: 'Brakes', value: 'Mechanical Disc' }, { key: 'Tire Size', value: '26x4.0 inch Fat Tire' }] },
  { name: 'City Glide Folding Bicycle', image: '/images/cycle5.jpg', description: 'Compact and convenient folding bicycle. Perfect for storage in apartments or carrying on public transit.', brand: 'Sportsara', category: 'Fitness', price: 11500, mrp: 16000, rating: 4.5, stock: 12, featured: false, colors: [{ name: 'Silver', hex: '#C0C0C0' }, { name: 'Blue', hex: '#1565C0' }], specifications: [{ key: 'Gears', value: 'Single Speed' }, { key: 'Frame', value: 'Foldable Steel' }, { key: 'Brakes', value: 'V-Brakes' }, { key: 'Tire Size', value: '20 inch' }] },
  { name: 'AeroSprint Carbon Frame Road Bike', image: '/images/cycle6.jpg', description: 'Premium carbon-frame road bike built for professional racers demanding extreme lightweight agility.', brand: 'Sportsara', category: 'Fitness', price: 45000, mrp: 60000, rating: 4.9, stock: 3, featured: true, colors: [{ name: 'Matte Black', hex: '#1a1a1a' }, { name: 'Gold', hex: '#FFD700' }], specifications: [{ key: 'Gears', value: '22-Speed Shimano 105' }, { key: 'Frame', value: 'Full Carbon Fiber' }, { key: 'Brakes', value: 'Hydraulic Disc' }, { key: 'Weight', value: '8.5 kg' }] },
  { name: 'Freestyle BMX Stunt Bike', image: '/images/cycle7.jpg', description: 'Durable BMX cycle with a 360-degree rotor and 4 pegs for extreme park and street freestyle stunts.', brand: 'Sportsara', category: 'Fitness', price: 8999, mrp: 12999, rating: 4.4, stock: 20, featured: false, colors: [{ name: 'Neon Yellow', hex: '#FFFF00' }, { name: 'Cyan Blue', hex: '#00BCD4' }], specifications: [{ key: 'Gears', value: 'Single Speed' }, { key: 'Frame', value: 'Reinforced Steel' }, { key: 'Brakes', value: 'U-Brakes' }, { key: 'Tire Size', value: '20 inch BMX' }] },
].map(addDefaults);

const insertCycles = async () => {
  try {
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) throw new Error('No admin found');
    
    const cyclesWithUser = cycles.map(c => ({ ...c, user: admin._id }));
    await Product.insertMany(cyclesWithUser);
    console.log('Successfully added 7 cycles to the live database!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit();
  }
};

insertCycles();
