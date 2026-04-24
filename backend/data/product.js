// Helper function to add default fields based on category
const addDefaults = (product) => {
  const categoryDefaults = {
    'Team Sports': {
      sizes: ['Standard'],
      colors: [{ name: 'Yellow', hex: '#FFD700' }, { name: 'White', hex: '#FFFFFF' }, { name: 'Orange', hex: '#FF6B35' }],
      warranty: '6 Months Brand Warranty',
      benefits: ['Official match quality', 'Durable construction', 'Superior grip & control', 'Air retention technology', 'Free air pump included'],
      specifications: [
        { key: 'Material', value: 'PU Leather / Synthetic' }, { key: 'Weight', value: '410-450g' },
        { key: 'Suitable For', value: 'Training & Match' }, { key: 'Age Group', value: '14+ Years' },
        { key: 'Country of Origin', value: 'India' },
      ],
    },
    'Apparel': {
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: [{ name: 'Black', hex: '#1a1a1a' }, { name: 'Navy', hex: '#1B2A4A' }, { name: 'Grey', hex: '#808080' }, { name: 'White', hex: '#FFFFFF' }],
      warranty: '30 Days Return Policy',
      benefits: ['Moisture-wicking fabric', 'Anti-odor technology', '4-way stretch comfort', 'Flatlock stitching', 'Machine washable'],
      specifications: [
        { key: 'Material', value: '92% Polyester, 8% Spandex' }, { key: 'Fit', value: 'Regular Fit' },
        { key: 'Sleeve', value: 'Short Sleeve / Full' }, { key: 'Pattern', value: 'Solid' },
        { key: 'Care', value: 'Machine Wash Cold' }, { key: 'Country of Origin', value: 'India' },
      ],
    },
    'Footwear': {
      sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
      colors: [{ name: 'Black', hex: '#1a1a1a' }, { name: 'White', hex: '#FFFFFF' }, { name: 'Grey', hex: '#A0A0A0' }, { name: 'Blue', hex: '#2962FF' }],
      warranty: '6 Months Manufacturer Warranty',
      benefits: ['Cushioned midsole', 'Breathable mesh upper', 'Anti-slip rubber outsole', 'Arch support technology', 'Lightweight design'],
      specifications: [
        { key: 'Outer Material', value: 'Mesh & Synthetic' }, { key: 'Sole Material', value: 'Rubber' },
        { key: 'Closure', value: 'Lace-Up' }, { key: 'Ideal For', value: 'Running, Walking, Gym' },
        { key: 'Weight', value: '250-300g per shoe' }, { key: 'Country of Origin', value: 'Vietnam' },
      ],
    },
    'Accessories': {
      sizes: ['Free Size'],
      colors: [{ name: 'Black', hex: '#1a1a1a' }, { name: 'Blue', hex: '#1565C0' }, { name: 'Red', hex: '#D32F2F' }],
      warranty: '3 Months Warranty',
      benefits: ['Premium build quality', 'Lightweight & portable', 'Water-resistant material', 'Ergonomic design', 'Multi-purpose use'],
      specifications: [
        { key: 'Material', value: 'Polyester / Nylon' }, { key: 'Water Resistant', value: 'Yes' },
        { key: 'Suitable For', value: 'Gym, Travel, Sports' }, { key: 'Country of Origin', value: 'India' },
      ],
    },
    'Fitness': {
      sizes: ['Standard'],
      colors: [{ name: 'Blue', hex: '#1565C0' }, { name: 'Purple', hex: '#7B1FA2' }, { name: 'Black', hex: '#1a1a1a' }],
      warranty: '6 Months Warranty',
      benefits: ['Anti-slip surface', 'Eco-friendly materials', 'Easy to clean', 'Compact & portable', 'Suitable for all levels'],
      specifications: [
        { key: 'Material', value: 'TPE / EVA Foam' }, { key: 'Thickness', value: '6-8mm' },
        { key: 'Ideal For', value: 'Yoga, Pilates, Home Workout' }, { key: 'Country of Origin', value: 'India' },
      ],
    },
  };

  const defaults = categoryDefaults[product.category] || categoryDefaults['Accessories'];
  return { ...defaults, ...product };
};

const products = [
  // 7 NEW CYCLES
  { name: 'Sportsara Mountain Trail Blazer 21-Speed', image: '/images/cycle1.jpg', description: 'Rugged mountain bike with 21-speed gears, front suspension, and thick knobby tires for off-road adventures.', brand: 'Sportsara', category: 'Fitness', price: 12999, mrp: 18999, rating: 4.6, stock: 15, featured: true,
    colors: [{ name: 'Matte Black', hex: '#1a1a1a' }, { name: 'Red', hex: '#D32F2F' }],
    specifications: [{ key: 'Gears', value: '21-Speed Shimano' }, { key: 'Frame', value: 'Alloy Steel' }, { key: 'Brakes', value: 'Dual Disc Brakes' }, { key: 'Tire Size', value: '27.5 inch' }] },
  { name: 'Urban Commuter Hybrid Bike', image: '/images/cycle2.jpg', description: 'Sleek and lightweight hybrid cycle designed for fast city commuting and smooth paved roads.', brand: 'Sportsara', category: 'Fitness', price: 14500, mrp: 21000, rating: 4.8, stock: 10, featured: false,
    colors: [{ name: 'Space Grey', hex: '#4A4A4A' }, { name: 'Neon Green', hex: '#39FF14' }],
    specifications: [{ key: 'Gears', value: '7-Speed Shimano' }, { key: 'Frame', value: 'Lightweight Aluminum' }, { key: 'Brakes', value: 'V-Brakes' }, { key: 'Tire Size', value: '700C' }] },
  { name: 'Velocity Pro Road Racing Cycle', image: '/images/cycle3.jpg', description: 'Aerodynamic road bike featuring drop handlebars and skinny tires for maximum speed and efficiency.', brand: 'Sportsara', category: 'Fitness', price: 22999, mrp: 30000, rating: 4.9, stock: 5, featured: true,
    colors: [{ name: 'Racing Red', hex: '#E53935' }, { name: 'White', hex: '#FFFFFF' }],
    specifications: [{ key: 'Gears', value: '14-Speed' }, { key: 'Frame', value: 'Carbon Fiber Blend' }, { key: 'Brakes', value: 'Caliper Brakes' }, { key: 'Tire Size', value: '700x25C' }] },
  { name: 'All-Terrain Fat Tire Cruiser', image: '/images/cycle4.jpg', description: 'Beast of a cycle featuring 4-inch ultra-wide fat tires for effortless riding on sand, snow, and mud.', brand: 'Sportsara', category: 'Fitness', price: 18999, mrp: 25999, rating: 4.7, stock: 8, featured: true,
    colors: [{ name: 'Army Green', hex: '#4B5320' }, { name: 'Black', hex: '#1a1a1a' }],
    specifications: [{ key: 'Gears', value: '21-Speed' }, { key: 'Frame', value: 'High Carbon Steel' }, { key: 'Brakes', value: 'Mechanical Disc' }, { key: 'Tire Size', value: '26x4.0 inch Fat Tire' }] },
  { name: 'City Glide Folding Bicycle', image: '/images/cycle5.jpg', description: 'Compact and convenient folding bicycle. Perfect for storage in apartments or carrying on public transit.', brand: 'Sportsara', category: 'Fitness', price: 11500, mrp: 16000, rating: 4.5, stock: 12, featured: false,
    colors: [{ name: 'Silver', hex: '#C0C0C0' }, { name: 'Blue', hex: '#1565C0' }],
    specifications: [{ key: 'Gears', value: 'Single Speed' }, { key: 'Frame', value: 'Foldable Steel' }, { key: 'Brakes', value: 'V-Brakes' }, { key: 'Tire Size', value: '20 inch' }] },
  { name: 'AeroSprint Carbon Frame Road Bike', image: '/images/cycle6.jpg', description: 'Premium carbon-frame road bike built for professional racers demanding extreme lightweight agility.', brand: 'Sportsara', category: 'Fitness', price: 45000, mrp: 60000, rating: 4.9, stock: 3, featured: true,
    colors: [{ name: 'Matte Black', hex: '#1a1a1a' }, { name: 'Gold', hex: '#FFD700' }],
    specifications: [{ key: 'Gears', value: '22-Speed Shimano 105' }, { key: 'Frame', value: 'Full Carbon Fiber' }, { key: 'Brakes', value: 'Hydraulic Disc' }, { key: 'Weight', value: '8.5 kg' }] },
  { name: 'Freestyle BMX Stunt Bike', image: '/images/cycle7.jpg', description: 'Durable BMX cycle with a 360-degree rotor and 4 pegs for extreme park and street freestyle stunts.', brand: 'Sportsara', category: 'Fitness', price: 8999, mrp: 12999, rating: 4.4, stock: 20, featured: false,
    colors: [{ name: 'Neon Yellow', hex: '#FFFF00' }, { name: 'Cyan Blue', hex: '#00BCD4' }],
    specifications: [{ key: 'Gears', value: 'Single Speed' }, { key: 'Frame', value: 'Reinforced Steel' }, { key: 'Brakes', value: 'U-Brakes' }, { key: 'Tire Size', value: '20 inch BMX' }] },
  { name: 'Nivia Hard Ground Football', image: '/images/nivia.jpg', description: 'Highly durable football specifically designed for heavy training on hard ground and rough surfaces.', brand: 'Nivia', category: 'Team Sports', price: 899, mrp: 1299, rating: 4.3, stock: 15, featured: true,
    specifications: [{ key: 'Material', value: 'PU Leather' }, { key: 'Weight', value: '420g' }, { key: 'Size', value: '5 (Official)' }, { key: 'Surface', value: 'Hard Ground' }, { key: 'Country of Origin', value: 'India' }] },
  { name: 'Adidas Training Football', image: '/images/adidas.jpg', description: 'Excellent touch and durability for daily training sessions. Machine-stitched construction.', brand: 'Adidas', category: 'Team Sports', price: 1299, mrp: 1799, rating: 4.5, stock: 10, featured: true },
  { name: 'Kipsta Hard Ground Football', image: '/images/kipsta.jpg', description: 'Built to withstand toughest hard ground conditions with superior shape retention.', brand: 'Kipsta', category: 'Team Sports', price: 799, mrp: 1199, rating: 4.1, stock: 25, featured: false },
  { name: 'Nike Strike Football', image: '/images/nike.jpg', description: 'Aerow Trac grooves for stabilized flight. Great for drills and competitive matches.', brand: 'Nike', category: 'Team Sports', price: 1599, mrp: 2199, rating: 4.7, stock: 8, featured: true },
].map(addDefaults);

const Hit_Arrival = [
  { name: 'SS Ton Premium English Willow Cricket Bat', image: '/images/cricket-bat.jpg', description: 'Professional grade English Willow cricket bat with massive edges and light pickup.', brand: 'SS', category: 'Team Sports', price: 4500, mrp: 5999, rating: 4.8, stock: 10, featured: true, sizes: ['Short Handle', 'Long Handle'],
    specifications: [{ key: 'Material', value: 'English Willow' }, { key: 'Weight', value: '1.1-1.3 kg' }, { key: 'Grade', value: 'Grade 1' }, { key: 'Handle', value: 'Cane Handle with Rubber Grip' }, { key: 'Country of Origin', value: 'India' }] },
  { name: 'Yonex Astrox 99 Play Badminton Racket', image: '/images/badminton.jpg', description: 'Head-heavy racket for aggressive smashers. Maximum power and steep attacks.', brand: 'Yonex', category: 'Team Sports', price: 2499, mrp: 3499, rating: 4.5, stock: 15, featured: true, sizes: ['G4 (3.25")', 'G5 (3.5")'],
    specifications: [{ key: 'Frame', value: 'Graphite' }, { key: 'Weight', value: '83g (4U)' }, { key: 'Balance', value: 'Head Heavy' }, { key: 'Max Tension', value: '28 lbs' }, { key: 'Includes', value: 'Full Cover' }] },
  { name: 'Spalding NBA Official Basketball', image: '/images/basketball.jpg', description: 'Official size. Premium composite leather for excellent grip on indoor and outdoor courts.', brand: 'Spalding', category: 'Team Sports', price: 1899, mrp: 2499, rating: 4.7, stock: 20, featured: false,
    specifications: [{ key: 'Material', value: 'Composite Leather' }, { key: 'Size', value: '7 (Official)' }, { key: 'Surface', value: 'Indoor / Outdoor' }, { key: 'Weight', value: '600g' }] },
  { name: 'Mikasa V200W Official FIVB Volleyball', image: '/images/volleyball.jpg', description: '18-panel aerodynamic design for control, flight stability, and visibility.', brand: 'Mikasa', category: 'Team Sports', price: 2100, mrp: 2999, rating: 4.9, stock: 5, featured: true },
  { name: 'SG Cricket Batting Pads - Club', image: '/images/cricket-bat.jpg', description: 'Lightweight yet protective cricket pads with high-density foam.', brand: 'SG', category: 'Team Sports', price: 1299, mrp: 1799, rating: 4.3, stock: 20, featured: false, sizes: ['Boys', 'Youth', 'Men'] },
].map(addDefaults);

const Hot_Picks = [
  { name: 'Sportsara Official Black Jacket', image: '/images/jacket.jpg', description: 'Breathable, sweat-wicking fabric for peak performance.', brand: 'Sportsara', category: 'Apparel', price: 699, mrp: 999, rating: 4.2, stock: 30, featured: false,
    colors: [{ name: 'Black', hex: '#1a1a1a' }, { name: 'Navy', hex: '#1B2A4A' }, { name: 'Olive', hex: '#556B2F' }] },
  { name: 'Elite Training Track Pants', image: '/images/trackpants.jpg', description: 'Lightweight, stretchable track pants perfect for warm-ups and gym sessions.', brand: 'Sportsara', category: 'Apparel', price: 1199, mrp: 1699, rating: 4.4, stock: 25, featured: true },
  { name: 'Kalenji Run Active Shoes', image: '/images/runningshoes.jpg', description: 'Perfect for daily 5K road runs. Advanced cushioning and heel support.', brand: 'Kalenji', category: 'Footwear', price: 2499, mrp: 3499, rating: 4.6, stock: 15, featured: true },
  { name: 'Pro-Grip Yoga Mat', image: '/images/yogamat.jpg', description: 'Anti-slip, 8mm thick yoga mat for ultimate comfort during exercises.', brand: 'Nivia', category: 'Fitness', price: 699, mrp: 999, rating: 4.3, stock: 40, featured: false,
    specifications: [{ key: 'Material', value: 'TPE Foam' }, { key: 'Thickness', value: '8mm' }, { key: 'Length', value: '183cm x 61cm' }, { key: 'Weight', value: '850g' }, { key: 'Includes', value: 'Carry Strap' }] },
  { name: 'Gym Performance T-Shirt', image: '/images/gymtshirt.jpg', description: 'Ultra-light fabric that actively wicks away perspiration. Everyday style meets gym performance.', brand: 'Sportsara', category: 'Apparel', price: 499, mrp: 799, rating: 4.1, stock: 50, featured: false,
    colors: [{ name: 'Blue', hex: '#6C8EBF' }, { name: 'Black', hex: '#1a1a1a' }, { name: 'White', hex: '#FFFFFF' }, { name: 'Red', hex: '#D32F2F' }] },
  { name: 'Sportsara Duffel Gym Bag', image: '/images/gymbag.jpg', description: 'Spacious gym bag with dedicated shoe compartment and water-resistant base.', brand: 'Sportsara', category: 'Accessories', price: 899, mrp: 1299, rating: 4.5, stock: 20, featured: true,
    colors: [{ name: 'Camo Green', hex: '#4A5D23' }, { name: 'Black', hex: '#1a1a1a' }, { name: 'Grey', hex: '#808080' }],
    specifications: [{ key: 'Material', value: 'Polyester Canvas' }, { key: 'Capacity', value: '35 Litres' }, { key: 'Compartments', value: 'Main + Shoe + Side Pockets' }, { key: 'Water Resistant', value: 'Yes (Base)' }, { key: 'Dimensions', value: '50 x 28 x 25 cm' }] },
  { name: 'Men Gym Shorts, Quick Dry', image: '/images/gymshorts.jpg', description: 'Quick-dry, lightweight gym shorts with stretchable fabric.', brand: 'Nivia', category: 'Apparel', price: 399, mrp: 699, rating: 4.0, stock: 10, featured: false },
  { name: 'Premium Resistance Band Set', image: '/images/bands.jpg', description: 'Set of 3 color-coded resistance bands for strength training.', brand: 'FitPro', category: 'Fitness', price: 1499, mrp: 1999, rating: 4.4, stock: 15, featured: false,
    sizes: ['Light', 'Medium', 'Heavy'],
    colors: [{ name: 'Teal', hex: '#009688' }, { name: 'Orange', hex: '#FF9800' }, { name: 'Yellow', hex: '#FFEB3B' }],
    specifications: [{ key: 'Material', value: 'Natural Latex' }, { key: 'Resistance Levels', value: '3 (15/25/35 lbs)' }, { key: 'Length', value: '208cm loop' }, { key: 'Includes', value: 'Carry Bag + Guide' }] },
  { name: 'Kids Cycle 4-6 years (16inch) - Robot 100', image: '/images/kidscycle.jpg', description: 'Colorful and sturdy kids bicycle with training wheels.', brand: 'Sportsara', category: 'Accessories', price: 5999, mrp: 7999, rating: 4.6, stock: 60, featured: true,
    sizes: ['14 inch', '16 inch'],
    colors: [{ name: 'Red', hex: '#D32F2F' }, { name: 'Blue', hex: '#1976D2' }, { name: 'Green', hex: '#388E3C' }],
    warranty: '1 Year Manufacturer Warranty',
    specifications: [{ key: 'Frame', value: 'Steel' }, { key: 'Wheel Size', value: '16 inch' }, { key: 'Brakes', value: 'Caliper Front + Rear' }, { key: 'Training Wheels', value: 'Included' }, { key: 'Max Weight', value: '30 kg' }] },
  { name: 'Badminton Racket Set of 2 with Shuttlecocks', image: '/images/racketset.jpg', description: 'Head heavy racket set with 2 shuttlecocks and cover.', brand: 'Sportsara', category: 'Team Sports', price: 799, mrp: 1199, rating: 4.2, stock: 30, featured: false },
  { name: 'Sportsara Dry-Fit Sports T-Shirt - Navy', image: '/images/gymtshirt.jpg', description: 'Ultra-lightweight dry-fit T-shirt with moisture-wicking technology.', brand: 'Sportsara', category: 'Apparel', price: 599, mrp: 899, rating: 4.3, stock: 40, featured: false,
    colors: [{ name: 'Navy', hex: '#1B2A4A' }, { name: 'Black', hex: '#1a1a1a' }, { name: 'Maroon', hex: '#800000' }] },
  { name: 'Nike Dri-FIT Running T-Shirt', image: '/images/gymtshirt.jpg', description: 'Sweat-wicking Dri-FIT technology with slim, athletic fit.', brand: 'Nike', category: 'Apparel', price: 1299, mrp: 1799, rating: 4.6, stock: 20, featured: true },
  { name: 'Nike Revolution 6 Running Shoes', image: '/images/runningshoes.jpg', description: 'Soft foam midsole with lightweight breathable upper.', brand: 'Nike', category: 'Footwear', price: 3499, mrp: 4495, rating: 4.5, stock: 12, featured: true },
  { name: 'Adidas Runfalcon 3.0 Training Shoes', image: '/images/runningshoes.jpg', description: 'Versatile running shoes with Cloudfoam cushioning.', brand: 'Adidas', category: 'Footwear', price: 2999, mrp: 3999, rating: 4.4, stock: 18, featured: false },
  { name: 'Sportsara Men Slim Fit Jogger Pants', image: '/images/trackpants.jpg', description: 'Tapered slim-fit joggers with elastic cuffs and zippered pockets.', brand: 'Sportsara', category: 'Apparel', price: 999, mrp: 1499, rating: 4.3, stock: 35, featured: false },
  { name: 'Sportsara Windbreaker Sports Jacket', image: '/images/jacket.jpg', description: 'Lightweight windbreaker with water-repellent finish.', brand: 'Sportsara', category: 'Apparel', price: 1499, mrp: 1999, rating: 4.5, stock: 15, featured: true,
    colors: [{ name: 'Black', hex: '#1a1a1a' }, { name: 'Navy', hex: '#1B2A4A' }, { name: 'Red', hex: '#C62828' }],
    warranty: '6 Months Brand Warranty' },
  { name: 'Sportsara Premium Yoga Block Set', image: '/images/yogamat.jpg', description: 'High-density EVA foam yoga block set of 2.', brand: 'Sportsara', category: 'Fitness', price: 499, mrp: 799, rating: 4.2, stock: 50, featured: false },
  { name: 'Speedo Swim Goggles - Anti-Fog', image: '/images/swim.png', description: 'Crystal clear anti-fog swim goggles with UV protection.', brand: 'Speedo', category: 'Accessories', price: 799, mrp: 1199, rating: 4.4, stock: 25, featured: false,
    colors: [{ name: 'Blue', hex: '#0D47A1' }, { name: 'Black', hex: '#1a1a1a' }, { name: 'Clear', hex: '#E0E0E0' }],
    specifications: [{ key: 'Lens', value: 'Anti-Fog, UV Protection' }, { key: 'Strap', value: 'Adjustable Silicone' }, { key: 'Seal', value: 'Soft Silicone Gasket' }, { key: 'Ideal For', value: 'Pool & Open Water' }] },
  { name: 'Arena Swim Cap & Goggles Combo', image: '/images/swim.png', description: 'Complete swim essentials combo for competitive swimmers.', brand: 'Arena', category: 'Accessories', price: 599, mrp: 999, rating: 4.1, stock: 30, featured: false },
].map(addDefaults);

export { products, Hit_Arrival, Hot_Picks };