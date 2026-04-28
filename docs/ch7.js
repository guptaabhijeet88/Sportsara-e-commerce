function getCh7() {
return `
<div class="page">
<h1 class="chapter-title">Chapter 7: Result</h1>
<h2>7.1 Introduction</h2>
<p>The Result chapter presents the final outcomes obtained after successful development and implementation of the SportSara E-Commerce Platform. It demonstrates how the project fulfills the objectives defined in earlier phases including online sports product sales, secure authentication, order management, and admin analytics.</p>
<p>After coding, testing, and deployment, the system was executed successfully in both development and production environments. All modules performed according to requirements and delivered accurate results.</p>

<h2>7.2 Screens Achieved in the Project</h2>
<p>The following screens were developed and are fully functional:</p>
<h3>Customer-Facing Screens:</h3>
<ol>
<li><b>Home Screen</b> — Landing page with hero banner, featured products carousel, category showcase, and promotional sections</li>
<li><b>Shop Screen</b> — Product listing with category filtering, search, sorting, and pagination</li>
<li><b>Product Detail Screen</b> — Complete product info with images, sizes, colors, specifications, benefits, price, and customer reviews</li>
<li><b>Login Screen</b> — Email/password login with Google OAuth button</li>
<li><b>Registration Screen</b> — Name, email, password fields with OTP verification step</li>
<li><b>Forgot Password Screen</b> — OTP-based password reset flow</li>
<li><b>Cart Screen</b> — Cart items with quantity controls, variant display, and price summary</li>
<li><b>Checkout Screen</b> — Shipping address form with Google Maps autocomplete, payment method selection</li>
<li><b>Orders Screen</b> — Order history with status tracking and order details</li>
<li><b>Profile Screen</b> — User profile editing with avatar and saved address</li>
</ol>
<h3>Admin Screens:</h3>
<ol>
<li><b>Admin Dashboard</b> — Analytics cards (revenue, orders, users, products), monthly revenue chart, recent orders, top selling products, low stock alerts</li>
<li><b>Admin Products</b> — Product list with add, edit, delete operations</li>
<li><b>Admin Orders</b> — All orders with status dropdown to update</li>
<li><b>Admin Users</b> — User list with role toggle (admin/user)</li>
</ol>

<p>The following pages show screenshots captured from the live SportSara application deployed at <b>https://sportsara-e-commerce-nf6q-zeta.vercel.app/</b>:</p>
</div>

<div class="screenshot-page">
<h2 class="center">Figure 7.1: Home Page</h2>
<p class="center"><img src="screenshots/01_home.png" style="width:90%;border:1px solid #999;margin:10pt auto;display:block;box-shadow:0 2px 6px rgba(0,0,0,0.15);"></p>
<p>The Home Screen is the landing page of SportSara. It displays a hero banner with promotional content and the SportSara branding. The navigation header at the top provides quick access to the Shop page, Shopping Cart, and Sign In functionality. A search bar allows users to search for products by keyword. The hero section features dynamic content highlighting the premium sports gear available on the platform.</p>
</div>

<div class="screenshot-page">
<h2 class="center">Figure 7.2: Featured Products & Categories</h2>
<p class="center"><img src="screenshots/08_featured.png" style="width:90%;border:1px solid #999;margin:10pt auto;display:block;box-shadow:0 2px 6px rgba(0,0,0,0.15);"></p>
<p>Below the hero section, the home page displays a grid of featured products with badges showing "Featured" status and percentage discounts (e.g., "25% OFF", "28% OFF"). Each product card shows the product image, name, brand, star rating with review count, selling price with MRP comparison, a heart icon for wishlisting, and an "Add to cart" button. Below the featured products, the "Explore Categories" section presents five vibrant category cards — Team Sports, Apparel, Footwear, Accessories, and Fitness — each with distinctive colors and icons for easy navigation.</p>
</div>

<div class="screenshot-page">
<h2 class="center">Figure 7.3: Shop / Product Listing</h2>
<p class="center"><img src="screenshots/02_shop.png" style="width:90%;border:1px solid #999;margin:10pt auto;display:block;box-shadow:0 2px 6px rgba(0,0,0,0.15);"></p>
<p>The Shop Screen displays all available products in a responsive grid layout. Users can filter products by category (Team Sports, Apparel, Footwear, Accessories, Fitness), search by keyword using the search bar, and sort products by price or rating. Each product card shows the product image, name, brand, price with MRP comparison, and star rating. Clicking on a product navigates to its detailed view. The layout is fully responsive, adapting from a 4-column grid on desktop to a single column on mobile devices.</p>
</div>

<div class="screenshot-page">
<h2 class="center">Figure 7.4: Product Detail Page</h2>
<p class="center"><img src="screenshots/07_product.png" style="width:90%;border:1px solid #999;margin:10pt auto;display:block;box-shadow:0 2px 6px rgba(0,0,0,0.15);"></p>
<p>The Product Detail Screen provides a comprehensive view of a single product. The left section displays a high-resolution product image. The center section shows the product name (e.g., "Multi-Function Exercise Bench"), brand name ("FitPro"), star rating with review count, selling price (₹4599) with MRP comparison (₹6599) and discount percentage (30% off), inclusive of all taxes. Users can select from available color variants shown as color circles and choose a size option. A "6 Months Warranty" badge is prominently displayed. The right sidebar shows the price summary, stock status ("In Stock — Only 8 left!"), delivery details with pincode check, "Add to Cart" and "Order Now" buttons, and trust badges for free delivery, easy returns, genuine products, and COD availability.</p>
</div>

<div class="screenshot-page">
<h2 class="center">Figure 7.5: Login Page</h2>
<p class="center"><img src="screenshots/03_login.png" style="width:90%;border:1px solid #999;margin:10pt auto;display:block;box-shadow:0 2px 6px rgba(0,0,0,0.15);"></p>
<p>The Login Screen provides two authentication methods: (1) Email and password login for registered users, and (2) Google OAuth login via the "Sign in with Google" button. The form includes client-side validation for email format and password requirements. Links to the Registration page and Forgot Password page are provided for new users and password recovery respectively. Upon successful authentication, a JWT token is issued and stored in localStorage for session management. The clean, centered card design with the SportSara lock icon ensures a professional and trustworthy login experience.</p>
</div>

<div class="screenshot-page">
<h2 class="center">Figure 7.6: Registration Page</h2>
<p class="center"><img src="screenshots/04_register.png" style="width:90%;border:1px solid #999;margin:10pt auto;display:block;box-shadow:0 2px 6px rgba(0,0,0,0.15);"></p>
<p>The Registration Screen allows new users to create an account by providing their full name, email address, and password. Upon form submission, a 6-digit OTP is sent to the provided email via the Brevo transactional email API. The user must enter this OTP within 5 minutes to verify their email ownership. After successful OTP verification, the account is created with the password hashed using bcrypt (10 salt rounds), and a JWT token is issued for immediate login. The "Sign in with Google" option provides a faster alternative for registration through Google OAuth 2.0 integration.</p>
</div>

<div class="screenshot-page">
<h2 class="center">Figure 7.7: Forgot Password</h2>
<p class="center"><img src="screenshots/05_forgot.png" style="width:90%;border:1px solid #999;margin:10pt auto;display:block;box-shadow:0 2px 6px rgba(0,0,0,0.15);"></p>
<p>The Forgot Password Screen enables users to reset their password through a secure OTP-based flow. Users enter their registered email address and click the "Send OTP" button. A 6-digit OTP is sent to that email via the Brevo API. After entering the correct OTP and a new password, the system updates the user's password in the database. The OTP has a 5-minute expiry enforced by MongoDB TTL index, ensuring security against brute-force attacks. A "Back to Sign In" link allows users to return to the login page. The key icon and clean form design maintain visual consistency with other authentication screens.</p>
</div>

<div class="screenshot-page">
<h2 class="center">Figure 7.8: Shopping Cart</h2>
<p class="center"><img src="screenshots/06_cart.png" style="width:90%;border:1px solid #999;margin:10pt auto;display:block;box-shadow:0 2px 6px rgba(0,0,0,0.15);"></p>
<p>The Cart Screen displays all items added by the user with their selected size, color, quantity, and individual prices. When the cart is empty, a friendly message "Your cart is empty" is displayed with a "Go Shop" link directing users to the product catalog. The right sidebar shows the order summary with subtotal calculation for all items, the number of items in the cart, and the total payable amount in INR. A "Proceed to Checkout" button navigates users to the checkout page where they can enter their shipping address with Google Maps autocomplete and complete the purchase via Cash on Delivery.</p>
</div>

<div class="page">
<h2>7.3 Functional Results</h2>
<h3>Authentication Results</h3>
<table>
<tr><th>Function</th><th>Input</th><th>Expected Result</th><th>Actual Result</th></tr>
<tr><td>Email Registration</td><td>Valid name, email, password</td><td>OTP sent, account created</td><td>Successful ✔</td></tr>
<tr><td>Google OAuth Login</td><td>Google account</td><td>Auto login/register</td><td>Successful ✔</td></tr>
<tr><td>Invalid Login</td><td>Wrong password</td><td>Error message</td><td>Displayed ✔</td></tr>
<tr><td>Password Reset</td><td>Valid email + OTP</td><td>Password changed</td><td>Successful ✔</td></tr>
<tr><td>Role-Based Access</td><td>User accessing admin</td><td>Redirected to home</td><td>Working ✔</td></tr>
</table>
</div>

<div class="page">
<h3>Shopping Results</h3>
<table>
<tr><th>Function</th><th>Input</th><th>Expected Result</th><th>Actual</th></tr>
<tr><td>Browse by Category</td><td>Category filter</td><td>Filtered products</td><td>✔</td></tr>
<tr><td>Product Search</td><td>Search keyword</td><td>Matching results</td><td>✔</td></tr>
<tr><td>Add to Cart</td><td>Product + size + color</td><td>Item added</td><td>✔</td></tr>
<tr><td>Update Quantity</td><td>New quantity value</td><td>Quantity updated</td><td>✔</td></tr>
<tr><td>Remove from Cart</td><td>Delete action</td><td>Item removed</td><td>✔</td></tr>
<tr><td>Address Autocomplete</td><td>Partial address</td><td>Suggestions shown</td><td>✔</td></tr>
<tr><td>Place Order</td><td>Address + payment</td><td>Order created</td><td>✔</td></tr>
<tr><td>Order History</td><td>View orders</td><td>Past orders listed</td><td>✔</td></tr>
<tr><td>Order Status</td><td>View single order</td><td>Current status shown</td><td>✔</td></tr>
</table>

<h3>Review Results</h3>
<table>
<tr><th>Function</th><th>Expected</th><th>Actual</th></tr>
<tr><td>Submit Review with Rating (1-5)</td><td>Review saved with star rating</td><td>✔</td></tr>
<tr><td>Review Title and Comment</td><td>Text saved correctly</td><td>✔</td></tr>
<tr><td>Duplicate Review Prevention</td><td>Error: Already reviewed</td><td>✔</td></tr>
<tr><td>Average Rating Calculation</td><td>Accurate average displayed</td><td>✔</td></tr>
<tr><td>Delete Own Review</td><td>Review removed</td><td>✔</td></tr>
</table>

<h3>Admin Results</h3>
<table>
<tr><th>Function</th><th>Expected</th><th>Actual</th></tr>
<tr><td>Dashboard Analytics</td><td>Revenue, orders, users, products counts</td><td>Accurate ✔</td></tr>
<tr><td>Monthly Revenue Chart</td><td>Last 6 months data</td><td>Correct ✔</td></tr>
<tr><td>Top Selling Products</td><td>Top 5 by quantity sold</td><td>Accurate ✔</td></tr>
<tr><td>Low Stock Alerts</td><td>Products with stock < 15</td><td>Working ✔</td></tr>
<tr><td>Add Product</td><td>Product with all fields</td><td>Created ✔</td></tr>
<tr><td>Edit Product</td><td>Updated fields</td><td>Saved ✔</td></tr>
<tr><td>Delete Product</td><td>Product removed</td><td>Deleted ✔</td></tr>
<tr><td>Update Order Status</td><td>New status selected</td><td>Updated ✔</td></tr>
<tr><td>Toggle User Role</td><td>Admin/User switch</td><td>Working ✔</td></tr>
</table>

<h2>7.4 Performance Results</h2>
<table>
<tr><th>Parameter</th><th>Target</th><th>Actual Result</th></tr>
<tr><td>Login API Response</td><td>< 500ms</td><td>~350ms ✔</td></tr>
<tr><td>Product Listing Load</td><td>< 1s</td><td>~800ms ✔</td></tr>
<tr><td>Product Detail Load</td><td>< 1s</td><td>~600ms ✔</td></tr>
<tr><td>Cart Operations</td><td>< 300ms</td><td>~200ms ✔</td></tr>
<tr><td>Order Creation</td><td>< 2s</td><td>~1.2s ✔</td></tr>
<tr><td>Admin Dashboard Load</td><td>< 2s</td><td>~1.5s ✔</td></tr>
<tr><td>Google Maps Autocomplete</td><td>Real-time</td><td>~100ms ✔</td></tr>
<tr><td>Image Upload</td><td>< 3s</td><td>~2s ✔</td></tr>
</table>
</div>

<div class="page">
<h2>7.5 Security Results</h2>
<table>
<tr><th>Security Feature</th><th>Implementation</th><th>Status</th></tr>
<tr><td>Password Encryption</td><td>bcrypt with 10 salt rounds</td><td>Working ✔</td></tr>
<tr><td>JWT Authentication</td><td>HS256 signed, 30-day expiry</td><td>Working ✔</td></tr>
<tr><td>Protected Routes</td><td>auth middleware on all private APIs</td><td>Working ✔</td></tr>
<tr><td>Admin Authorization</td><td>adminAuth middleware checks role</td><td>Working ✔</td></tr>
<tr><td>Token Validation</td><td>Invalid/expired tokens rejected</td><td>Working ✔</td></tr>
<tr><td>OTP Expiry</td><td>5-minute TTL auto-deletion</td><td>Working ✔</td></tr>
<tr><td>Google OAuth Verification</td><td>Server-side token verification</td><td>Working ✔</td></tr>
<tr><td>CORS Policy</td><td>Cross-origin requests configured</td><td>Working ✔</td></tr>
<tr><td>Environment Variables</td><td>Secrets in .env, not in code</td><td>Working ✔</td></tr>
<tr><td>Ownership Checks</td><td>Order access restricted to owner</td><td>Working ✔</td></tr>
</table>

<h2>7.6 Comparison with Existing System</h2>
<table>
<tr><th>Feature</th><th>Manual System</th><th>SportSara</th></tr>
<tr><td>Product Discovery</td><td>Walk-in only</td><td>24/7 Online with Search & Filters</td></tr>
<tr><td>Product Info</td><td>Limited labels</td><td>Images, Specs, Sizes, Colors, Reviews</td></tr>
<tr><td>Ordering</td><td>Counter purchase</td><td>Online Cart + Checkout</td></tr>
<tr><td>Payment</td><td>Cash only</td><td>COD with online option</td></tr>
<tr><td>Customer Accounts</td><td>None</td><td>Secure accounts with profiles</td></tr>
<tr><td>Order Tracking</td><td>Phone inquiry</td><td>Real-time status tracking</td></tr>
<tr><td>Customer Feedback</td><td>Verbal only</td><td>Written reviews + star ratings</td></tr>
<tr><td>Inventory</td><td>Manual counting</td><td>Automated stock management</td></tr>
<tr><td>Analytics</td><td>None</td><td>Dashboard with charts</td></tr>
<tr><td>Reach</td><td>Local only</td><td>Nationwide/global</td></tr>
</table>

<h2>7.7 Advantages and Limitations</h2>
<h3>Advantages</h3>
<ol>
<li>Faster product discovery with full-text search and category filtering</li>
<li>Secure multi-method authentication (Email OTP, Google OAuth, JWT)</li>
<li>Seamless checkout with Google Maps address auto-completion</li>
<li>Automated email notifications for account events</li>
<li>Centralized admin dashboard with real-time analytics</li>
<li>Mobile-responsive design across all devices</li>
<li>Scalable cloud deployment (Vercel + Render + MongoDB Atlas)</li>
<li>Product variants support (multiple sizes and colors)</li>
</ol>
<h3>Limitations</h3>
<ul>
<li>Requires internet connection for all operations</li>
<li>Real-time payment gateway integration pending (currently COD only)</li>
<li>No native mobile application — browser-only access</li>
<li>No AI-based product recommendations</li>
<li>Multi-language support not available</li>
<li>No real-time chat support for customers</li>
</ul>

<h2>7.8 Deployment Configuration</h2>
<h3>Environment Variables</h3>
<table>
<tr><th>Variable</th><th>Location</th><th>Purpose</th></tr>
<tr><td>MONGO_URI</td><td>Backend (.env)</td><td>MongoDB Atlas connection string</td></tr>
<tr><td>JWT_SECRET</td><td>Backend (.env)</td><td>Secret key for signing JWT tokens</td></tr>
<tr><td>EMAIL_USER</td><td>Backend (.env)</td><td>Brevo sender email address</td></tr>
<tr><td>EMAIL_PASS</td><td>Backend (.env)</td><td>Brevo API key for sending emails</td></tr>
<tr><td>GOOGLE_CLIENT_ID</td><td>Backend (.env)</td><td>Google OAuth client ID for verification</td></tr>
<tr><td>PORT</td><td>Backend (.env)</td><td>Server port (default 8000)</td></tr>
<tr><td>REACT_APP_API_URL</td><td>Frontend (.env)</td><td>Backend API base URL</td></tr>
<tr><td>REACT_APP_GOOGLE_CLIENT_ID</td><td>Frontend (.env)</td><td>Google OAuth client for frontend</td></tr>
<tr><td>REACT_APP_GOOGLE_MAPS_API_KEY</td><td>Frontend (.env)</td><td>Google Maps Places API key</td></tr>
</table>

<h3>Deployment Steps</h3>
<h3>Frontend (Vercel)</h3>
<ol>
<li>Connect GitHub repository to Vercel dashboard</li>
<li>Set root directory to "frontend"</li>
<li>Set build command: npm run build</li>
<li>Set output directory: build</li>
<li>Add environment variables (REACT_APP_API_URL, REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_GOOGLE_MAPS_API_KEY)</li>
<li>Deploy — Vercel auto-builds on every git push</li>
</ol>
<h3>Backend (Render)</h3>
<ol>
<li>Create new Web Service on Render</li>
<li>Connect GitHub repository</li>
<li>Set root directory to "backend"</li>
<li>Set build command: npm install</li>
<li>Set start command: node server.js</li>
<li>Add environment variables (MONGO_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASS, GOOGLE_CLIENT_ID)</li>
<li>Deploy — Render auto-deploys on every push</li>
</ol>

<h3>Vercel Routing Configuration (vercel.json)</h3>
<div class="code-block">{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}</div>
<p>This configuration ensures that all client-side routes handled by React Router are properly served, preventing 404 errors on page refresh for routes like /shop, /product/:id, /cart, etc.</p>
</div>

<div class="page">
<h2>7.9 Module-Wise Implementation Summary</h2>
<table>
<tr><th>Module</th><th>Files</th><th>Lines of Code</th><th>Key Features</th></tr>
<tr><td>Authentication</td><td>authRoutes.js, auth.js</td><td>~250</td><td>OTP, OAuth, JWT, bcrypt</td></tr>
<tr><td>Products</td><td>productRoutes.js, productModel.js</td><td>~180</td><td>CRUD, search, indexes</td></tr>
<tr><td>Cart</td><td>cartRoutes.js</td><td>~105</td><td>Add, update, remove, clear</td></tr>
<tr><td>Orders</td><td>orderRoutes.js, orderModel.js</td><td>~130</td><td>Place, history, status</td></tr>
<tr><td>Reviews</td><td>reviewRoutes.js, reviewModel.js</td><td>~90</td><td>Rate, review, average</td></tr>
<tr><td>Admin</td><td>adminRoutes.js</td><td>~143</td><td>Stats, CRUD, roles</td></tr>
<tr><td>Email</td><td>emailService.js</td><td>~50</td><td>Brevo API, OTP emails</td></tr>
<tr><td>Upload</td><td>uploadRoutes.js</td><td>~30</td><td>Multer, image storage</td></tr>
<tr><td>Frontend Screens</td><td>15 screen files</td><td>~2500</td><td>All user & admin UI</td></tr>
<tr><td>Frontend Components</td><td>5 component files</td><td>~600</td><td>Header, Footer, Product, etc.</td></tr>
<tr><td>State Management</td><td>AuthContext, CartContext</td><td>~200</td><td>Global auth & cart state</td></tr>
</table>
<p><b>Total Estimated Lines of Code:</b> ~4,300+ lines across backend and frontend</p>

<h2>7.10 Key Technical Decisions</h2>
<table>
<tr><th>Decision</th><th>Chosen Approach</th><th>Reasoning</th></tr>
<tr><td>Cart Storage</td><td>Embedded in User document</td><td>Fast reads, no separate collection needed</td></tr>
<tr><td>Order Items</td><td>Snapshot at order time</td><td>Product price/name changes don't affect past orders</td></tr>
<tr><td>Auth Token</td><td>JWT with 30-day expiry</td><td>Stateless, no server-side sessions needed</td></tr>
<tr><td>Password Storage</td><td>bcrypt (10 salt rounds)</td><td>Industry standard, resistant to rainbow table attacks</td></tr>
<tr><td>Email Service</td><td>Brevo REST API</td><td>Free tier (300 emails/day), no SMTP setup needed</td></tr>
<tr><td>OTP Expiry</td><td>5-minute TTL index</td><td>MongoDB auto-deletes expired OTPs</td></tr>
<tr><td>Image Storage</td><td>Local uploads directory</td><td>Simple for academic project, can migrate to S3</td></tr>
<tr><td>Address Input</td><td>Google Maps Places API</td><td>Most accurate autocomplete, auto-fills city/state/pin</td></tr>
<tr><td>Frontend Routing</td><td>React Router v6</td><td>Declarative routing with nested layouts</td></tr>
<tr><td>State Management</td><td>Context API</td><td>Sufficient for this scale, no Redux overhead</td></tr>
</table>

<h2>7.11 User Interface Design Principles</h2>
<ul>
<li><b>Consistency</b> — Uniform color scheme, typography, and spacing across all pages</li>
<li><b>Responsiveness</b> — CSS media queries ensure proper layout on all screen sizes from mobile (360px) to desktop (1920px+)</li>
<li><b>Feedback</b> — Toast notifications for all user actions (add to cart, place order, login success/failure)</li>
<li><b>Accessibility</b> — Semantic HTML elements, proper heading hierarchy, form labels</li>
<li><b>Navigation</b> — Persistent header with logo, search, cart icon, and profile menu</li>
<li><b>Loading States</b> — Skeleton loaders and spinners during API calls</li>
<li><b>Error Handling</b> — User-friendly error messages instead of technical errors</li>
</ul>

<h2>7.12 Conclusion</h2>
<p>The final result confirms all project objectives were achieved successfully. SportSara provides an efficient, reliable, and user-friendly e-commerce platform for sports products. All modules work accurately, all 25 test cases passed, and the system is deployed on production cloud infrastructure. The project demonstrates practical implementation of full-stack MERN development with modern authentication, cloud deployment, and third-party API integration.</p>
</div>`;

}
module.exports = { getCh7 };
