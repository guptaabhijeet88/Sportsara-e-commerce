import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import User from './models/userModel.js';

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const addDefaults = (product) => {
  const categoryDefaults = {
    'Team Sports': {
      sizes: ['Standard'],
      colors: [{ name: 'Standard', hex: '#FFFFFF' }],
      warranty: '6 Months Brand Warranty',
      benefits: ['Official match quality', 'Durable construction', 'Superior grip & control'],
      specifications: [{ key: 'Country of Origin', value: 'India' }],
    },
    'Apparel': {
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: [{ name: 'Black', hex: '#1a1a1a' }, { name: 'Navy', hex: '#1B2A4A' }, { name: 'Grey', hex: '#808080' }, { name: 'White', hex: '#FFFFFF' }],
      warranty: '30 Days Return Policy',
      benefits: ['Moisture-wicking fabric', '4-way stretch comfort', 'Machine washable'],
      specifications: [{ key: 'Fit', value: 'Regular Fit' }, { key: 'Country of Origin', value: 'India' }],
    },
    'Footwear': {
      sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
      colors: [{ name: 'Black', hex: '#1a1a1a' }, { name: 'White', hex: '#FFFFFF' }, { name: 'Grey', hex: '#A0A0A0' }, { name: 'Blue', hex: '#2962FF' }],
      warranty: '6 Months Manufacturer Warranty',
      benefits: ['Cushioned midsole', 'Breathable mesh upper', 'Anti-slip rubber outsole'],
      specifications: [{ key: 'Closure', value: 'Lace-Up' }, { key: 'Country of Origin', value: 'Vietnam' }],
    },
    'Accessories': {
      sizes: ['Free Size'],
      colors: [{ name: 'Black', hex: '#1a1a1a' }, { name: 'Blue', hex: '#1565C0' }],
      warranty: '3 Months Warranty',
      benefits: ['Premium build quality', 'Lightweight & portable'],
      specifications: [{ key: 'Country of Origin', value: 'India' }],
    },
    'Fitness': {
      sizes: ['Standard'],
      colors: [{ name: 'Blue', hex: '#1565C0' }, { name: 'Black', hex: '#1a1a1a' }],
      warranty: '6 Months Warranty',
      benefits: ['Eco-friendly materials', 'Durable', 'Suitable for all levels'],
      specifications: [{ key: 'Country of Origin', value: 'India' }],
    },
  };

  const defaults = categoryDefaults[product.category] || categoryDefaults['Accessories'];
  return { ...defaults, ...product };
};

const newProducts = [
  // T-shirts
  { name: 'Elite Performance Dry-Fit T-Shirt', image: '/images/tshirt1.jpg', description: 'Ultra-breathable dry-fit material for intense workouts.', brand: 'Sportsara', category: 'Apparel', price: 599, mrp: 999, rating: 4.5, stock: 40, featured: true },
  { name: 'Classic Cotton Crew Neck Tee', image: '/images/tshirt2.jpg', description: 'Soft, premium cotton for everyday comfort and casual wear.', brand: 'Sportsara', category: 'Apparel', price: 499, mrp: 799, rating: 4.2, stock: 50, featured: false },
  { name: 'Pro-Active V-Neck Training Shirt', image: '/images/tshirt3.jpg', description: 'Athletic V-neck fit that moves with your body during training.', brand: 'Sportsara', category: 'Apparel', price: 699, mrp: 1099, rating: 4.4, stock: 30, featured: false },
  { name: 'Sportsara Graphic Print Gym Tee', image: '/images/tshirt4.jpg', description: 'Stand out in the gym with this bold graphic print tee.', brand: 'Sportsara', category: 'Apparel', price: 549, mrp: 899, rating: 4.3, stock: 25, featured: true },
  { name: 'AeroCool Mesh Running T-Shirt', image: '/images/tshirt5.jpg', description: 'Full mesh back panel for maximum ventilation on long runs.', brand: 'Sportsara', category: 'Apparel', price: 799, mrp: 1299, rating: 4.7, stock: 20, featured: false },
  { name: 'Compression Base Layer Long Sleeve', image: '/images/tshirt6.jpg', description: 'Tight compression fit to support muscles and retain body heat.', brand: 'Sportsara', category: 'Apparel', price: 899, mrp: 1499, rating: 4.8, stock: 15, featured: true },

  // Shoes
  { name: 'ZoomX Pro Running Shoes', image: '/images/shoes3.jpg', description: 'Lightweight foam cushioning for record-breaking marathon speeds.', brand: 'Nike', category: 'Footwear', price: 4599, mrp: 5999, rating: 4.8, stock: 12, featured: true },
  { name: 'AirMax Court Tennis Shoes', image: '/images/shoes4.jpg', description: 'Lateral support and durable outsole for hard court play.', brand: 'Nike', category: 'Footwear', price: 3999, mrp: 4999, rating: 4.5, stock: 18, featured: false },
  { name: 'HyperGrip Basketball Sneakers', image: '/images/shoes5.jpg', description: 'High-top design with maximum ankle support and court grip.', brand: 'Adidas', category: 'Footwear', price: 4299, mrp: 5599, rating: 4.7, stock: 10, featured: true },
  { name: 'TrailBlazer Off-Road Running Shoes', image: '/images/shoes6.jpg', description: 'Aggressive lugs and waterproof upper for rugged terrain.', brand: 'Salomon', category: 'Footwear', price: 3499, mrp: 4599, rating: 4.6, stock: 15, featured: false },
  { name: 'UltraLite Daily Walking Shoes', image: '/images/shoes7.jpg', description: 'Slip-on comfort with memory foam insoles for all-day wear.', brand: 'Sportsara', category: 'Footwear', price: 1999, mrp: 2999, rating: 4.3, stock: 30, featured: true },

  // Cricket
  { name: 'Pro English Willow Cricket Bat', image: '/images/cricket1.jpg', description: 'Grade 1 English willow with massive edges and perfect balance.', brand: 'SS', category: 'Team Sports', price: 8500, mrp: 12000, rating: 4.9, stock: 5, featured: true },
  { name: 'Kashmir Willow Practice Bat', image: '/images/cricket2.jpg', description: 'Durable Kashmir willow perfect for net sessions and club matches.', brand: 'SG', category: 'Team Sports', price: 1899, mrp: 2599, rating: 4.2, stock: 20, featured: false },
  { name: 'Premium Cricket Batting Gloves', image: '/images/cricket3.jpg', description: 'Sheep leather palm with high-density foam protection.', brand: 'SG', category: 'Team Sports', price: 999, mrp: 1499, rating: 4.5, stock: 25, featured: false },
  { name: 'High-Density Foam Batting Pads', image: '/images/cricket4.jpg', description: 'Lightweight ambidextrous batting leg guards for maximum mobility.', brand: 'SS', category: 'Team Sports', price: 1499, mrp: 2199, rating: 4.6, stock: 15, featured: true },
  { name: 'Professional Cricket Helmet', image: '/images/cricket5.jpg', description: 'Titanium grille with shock-absorbing EPS liner for superior safety.', brand: 'Shrey', category: 'Team Sports', price: 2999, mrp: 3999, rating: 4.8, stock: 10, featured: true },

  // Pants
  { name: 'Elite Slim Fit Track Pants', image: '/images/pant1.jpg', description: 'Tapered athletic fit track pants with zippered pockets.', brand: 'Sportsara', category: 'Apparel', price: 999, mrp: 1499, rating: 4.4, stock: 40, featured: true },
  { name: 'Pro-Tech Running Tights', image: '/images/pant2.jpg', description: 'Compression running tights with reflective details for night visibility.', brand: 'Sportsara', category: 'Apparel', price: 899, mrp: 1299, rating: 4.6, stock: 30, featured: false },
  { name: 'Sportsara Cotton Joggers', image: '/images/pant3.jpg', description: 'Premium brushed cotton joggers for ultimate lounge comfort.', brand: 'Sportsara', category: 'Apparel', price: 1099, mrp: 1599, rating: 4.5, stock: 35, featured: true },
  { name: 'Ultra-Stretch Gym Trousers', image: '/images/pant4.jpg', description: '4-way stretch fabric that allows deep squats without restriction.', brand: 'Sportsara', category: 'Apparel', price: 1199, mrp: 1799, rating: 4.7, stock: 25, featured: false },
  { name: 'Woven Warm-Up Training Pants', image: '/images/pant5.jpg', description: 'Wind-resistant woven fabric perfect for outdoor warm-ups.', brand: 'Sportsara', category: 'Apparel', price: 1299, mrp: 1899, rating: 4.3, stock: 20, featured: false },
  { name: 'Fleece Lined Winter Sweatpants', image: '/images/pant6.jpg', description: 'Thick fleece lining to keep you warm during cold winter workouts.', brand: 'Sportsara', category: 'Apparel', price: 1499, mrp: 2199, rating: 4.8, stock: 15, featured: true },
  { name: 'Quick-Dry Activewear Pants', image: '/images/pant7.jpg', description: 'Extremely lightweight pants that dry in minutes after intense sweating.', brand: 'Sportsara', category: 'Apparel', price: 899, mrp: 1399, rating: 4.2, stock: 40, featured: false },
  { name: 'Classic Striped Tracksuit Bottoms', image: '/images/pant8.jpg', description: 'Retro 3-stripe design for a timeless sporty look.', brand: 'Adidas', category: 'Apparel', price: 1999, mrp: 2999, rating: 4.6, stock: 18, featured: true },

  // Jackets
  { name: 'All-Weather Windbreaker Jacket', image: '/images/jacket1.jpg', description: 'Water-repellent and windproof jacket for unpredictable weather.', brand: 'Sportsara', category: 'Apparel', price: 1599, mrp: 2499, rating: 4.5, stock: 25, featured: true },
  { name: 'Sportsara Premium Track Jacket', image: '/images/jacket2.jpg', description: 'Full-zip track jacket with a sleek, athletic silhouette.', brand: 'Sportsara', category: 'Apparel', price: 1499, mrp: 2299, rating: 4.4, stock: 30, featured: false },
  { name: 'Water-Resistant Running Jacket', image: '/images/jacket3.jpg', description: 'Ultra-light shell jacket that packs into its own pocket.', brand: 'Sportsara', category: 'Apparel', price: 1799, mrp: 2799, rating: 4.7, stock: 20, featured: true },
  { name: 'Fleece Zip-Up Hoodie', image: '/images/jacket4.jpg', description: 'Soft cotton-blend fleece hoodie for pre and post workout comfort.', brand: 'Sportsara', category: 'Apparel', price: 1299, mrp: 1999, rating: 4.6, stock: 35, featured: false },
  { name: 'Lightweight Cycling Jacket', image: '/images/jacket5.jpg', description: 'Aerodynamic fit with extended drop tail for cycling posture.', brand: 'Sportsara', category: 'Apparel', price: 1899, mrp: 2899, rating: 4.5, stock: 15, featured: false },
  { name: 'Puffer Winter Sports Jacket', image: '/images/jacket6.jpg', description: 'Insulated puffer jacket designed to lock in heat without heavy bulk.', brand: 'Sportsara', category: 'Apparel', price: 2999, mrp: 4599, rating: 4.8, stock: 10, featured: true },
  { name: 'Reflective Night-Run Jacket', image: '/images/jacket7.jpg', description: '360-degree reflective detailing for maximum visibility at night.', brand: 'Sportsara', category: 'Apparel', price: 2199, mrp: 3299, rating: 4.9, stock: 12, featured: true },
  { name: 'Classic College Varsity Jacket', image: '/images/jacket8.jpg', description: 'Stylish wool-blend varsity jacket with leather-feel sleeves.', brand: 'Sportsara', category: 'Apparel', price: 2499, mrp: 3999, rating: 4.3, stock: 20, featured: false },

  // Swim
  { name: 'AquaPro Silicone Swim Cap', image: '/images/swim1.jpg', description: 'Tear-resistant silicone cap that reduces drag and protects hair.', brand: 'Speedo', category: 'Accessories', price: 299, mrp: 499, rating: 4.6, stock: 50, featured: false },
  { name: 'Elite Anti-Fog Swim Goggles', image: '/images/swim2.jpg', description: 'Wide-vision goggles with mirrored lenses and UV protection.', brand: 'Arena', category: 'Accessories', price: 899, mrp: 1299, rating: 4.7, stock: 40, featured: true },
  { name: 'Men\'s Jammer Swim Trunks', image: '/images/swim3.jpg', description: 'Chlorine-resistant fabric that retains shape swim after swim.', brand: 'Speedo', category: 'Apparel', price: 1299, mrp: 1899, rating: 4.5, stock: 30, featured: false },
  { name: 'Women\'s One-Piece Swimsuit', image: '/images/swim4.jpg', description: 'Athletic open-back design for unrestricted shoulder movement.', brand: 'Speedo', category: 'Apparel', price: 1599, mrp: 2299, rating: 4.6, stock: 25, featured: true },
  { name: 'Microfiber Quick-Dry Towel', image: '/images/swim5.jpg', description: 'Ultra-absorbent and compact towel that dries 3x faster than cotton.', brand: 'Sportsara', category: 'Accessories', price: 499, mrp: 799, rating: 4.8, stock: 60, featured: true },
  { name: 'Professional Swimming Fins', image: '/images/swim6.jpg', description: 'Short blade fins for rigorous cardiovascular and leg training.', brand: 'Arena', category: 'Accessories', price: 1499, mrp: 2199, rating: 4.4, stock: 20, featured: false },
  { name: 'Buoyancy Training Kickboard', image: '/images/swim7.jpg', description: 'Ergonomic EVA foam kickboard to isolate and strengthen leg muscles.', brand: 'Sportsara', category: 'Accessories', price: 399, mrp: 699, rating: 4.3, stock: 35, featured: false },
  { name: 'Waterproof Gear Pouch', image: '/images/swim8.jpg', description: 'Keep your phone and valuables completely dry poolside.', brand: 'Sportsara', category: 'Accessories', price: 249, mrp: 499, rating: 4.2, stock: 45, featured: false },

  // Yoga Mats
  { name: 'Eco-Friendly Cork Yoga Mat', image: '/images/yogamat1.jpg', description: 'Natural antimicrobial cork surface that provides excellent wet grip.', brand: 'Sportsara', category: 'Fitness', price: 1299, mrp: 1999, rating: 4.7, stock: 25, featured: true },
  { name: 'Anti-Slip TPE Yoga Mat (6mm)', image: '/images/yogamat2.jpg', description: 'Standard 6mm thickness providing the perfect balance of support and stability.', brand: 'Sportsara', category: 'Fitness', price: 799, mrp: 1299, rating: 4.5, stock: 40, featured: false },
  { name: 'Pro Extra Thick Fitness Mat (10mm)', image: '/images/yogamat3.jpg', description: 'High-density 10mm foam to protect knees and joints during intense poses.', brand: 'Sportsara', category: 'Fitness', price: 999, mrp: 1599, rating: 4.8, stock: 30, featured: true },
  { name: 'Alignment Line Yoga Mat', image: '/images/yogamat4.jpg', description: 'Features laser-etched alignment lines to perfect your poses and posture.', brand: 'Sportsara', category: 'Fitness', price: 1099, mrp: 1699, rating: 4.6, stock: 20, featured: false },
  { name: 'Travel Foldable Thin Yoga Mat', image: '/images/yogamat5.jpg', description: 'Ultra-thin 2mm mat that easily folds into a square for your travel bag.', brand: 'Sportsara', category: 'Fitness', price: 699, mrp: 1199, rating: 4.4, stock: 35, featured: false },
  { name: 'Premium Suede Yoga Mat', image: '/images/yogamat6.jpg', description: 'Soft microfiber suede top that gets grippier as you sweat.', brand: 'Sportsara', category: 'Fitness', price: 1499, mrp: 2299, rating: 4.9, stock: 15, featured: true },
  { name: 'Dual-Color Reversible Mat', image: '/images/yogamat7.jpg', description: 'Textured surfaces on both sides with two vibrant colors.', brand: 'Sportsara', category: 'Fitness', price: 899, mrp: 1399, rating: 4.3, stock: 25, featured: false },

  // Dumbbells & Equipment
  { name: 'Neoprene Coated Dumbbell Pair (5kg)', image: '/images/dumbell1.jpg', description: 'Hexagonal anti-roll design with comfortable neoprene grip. Includes 2x 5kg.', brand: 'Sportsara', category: 'Fitness', price: 1899, mrp: 2599, rating: 4.7, stock: 20, featured: true },
  { name: 'Adjustable Cast Iron Dumbbell Set (15kg)', image: '/images/dumbell2.jpg', description: 'Heavy-duty adjustable dumbbells with spinlock collars. Total weight 15kg.', brand: 'FitPro', category: 'Fitness', price: 3499, mrp: 4999, rating: 4.8, stock: 10, featured: true },
  { name: 'Sportsara Foldable Home Treadmill', image: '/images/trademil.jpg', description: 'Motorized space-saving treadmill with LCD display and 12 preset programs.', brand: 'Sportsara', category: 'Fitness', price: 25999, mrp: 35000, rating: 4.6, stock: 5, featured: true },
  { name: 'Ab Core Wheel Roller', image: '/images/wheelroller.jpg', description: 'Ultra-wide ab roller wheel with ergonomic handles and free knee pad.', brand: 'Sportsara', category: 'Fitness', price: 499, mrp: 899, rating: 4.5, stock: 40, featured: false },
  { name: 'Multi-Function Exercise Bench', image: '/images/exercise.jpg', description: 'Adjustable weight bench for full-body workouts. Incline, flat, and decline positions.', brand: 'FitPro', category: 'Fitness', price: 4599, mrp: 6599, rating: 4.7, stock: 8, featured: true }
].map(addDefaults);

const insertMassiveProducts = async () => {
  try {
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) throw new Error('No admin found');
    
    const readyProducts = newProducts.map(p => ({ ...p, user: admin._id }));
    await Product.insertMany(readyProducts);
    console.log(`Successfully added ${readyProducts.length} products to the live database!`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit();
  }
};

insertMassiveProducts();
