function getCh5() {
return `
<div class="page">
<h1 class="chapter-title">Chapter 5: System Design</h1>
<h2>5.1 Introduction</h2>
<p>System Design is the phase where project requirements are converted into a technical blueprint. It defines the software modules, database structure, API endpoints, security model, and communication flow between components. For SportSara, the design focuses on a modular client-server architecture with clear separation between the React frontend, Express.js backend, and MongoDB database.</p>

<h2>5.2 System Architecture</h2>
<p>SportSara follows a <b>Three-Tier Architecture</b>:</p>
<h3>Presentation Layer (Frontend)</h3>
<ul>
<li>React.js for component-based UI with virtual DOM</li>
<li>CSS3 for styling and responsive design</li>
<li>React Router DOM for client-side navigation (BrowserRouter)</li>
<li>Context API for global state management (AuthContext, CartContext)</li>
<li>Google Maps Places API for address autocomplete</li>
</ul>
<h3>Application Layer (Backend)</h3>
<ul>
<li>Node.js runtime environment with ES modules</li>
<li>Express.js v5 web framework with 8 route modules</li>
<li>JWT middleware for user authentication</li>
<li>AdminAuth middleware for role-based access control</li>
<li>Multer middleware for file upload processing</li>
<li>CORS middleware for cross-origin requests</li>
</ul>
<h3>Data Layer (Database)</h3>
<ul>
<li>MongoDB Atlas cloud database (M0 Free Tier)</li>
<li>Mongoose ODM for schema enforcement and validation</li>
<li>6 collections: Users, Products, Orders, Reviews, OTPs, PasswordResetOTPs</li>
<li>Performance indexes on frequently queried fields</li>
</ul>
<p><b>Data Flow:</b> React UI → HTTP/REST → Express API → Mongoose ODM → MongoDB Atlas</p>

<h2>5.3 Data Flow Diagram</h2>
<h3>Level 0 — Context Diagram</h3>
<p>Customer → SportSara Web App → Express API Server → MongoDB Atlas</p>
<p>Admin → Admin Dashboard → AdminAuth Middleware → Express API → MongoDB Atlas</p>
<h3>Level 1 — Main Processes</h3>
<ol>
<li><b>Authentication Process:</b> User submits credentials → Server validates → JWT token issued → Token stored in localStorage → Sent with every API request</li>
<li><b>Product Browsing:</b> User requests products → Server queries MongoDB with category/search filters → Products returned as JSON → React renders product cards</li>
<li><b>Cart Management:</b> User adds item with size+color → Cart updated in user document (embedded) → Cart state synced with backend on every change</li>
<li><b>Order Processing:</b> User submits order → Server validates cart items and address → Order document created with item snapshot → Product stock decremented → Cart cleared</li>
<li><b>Review System:</b> User submits review → Server checks unique constraint (one per user per product) → Review stored with user reference → Average rating calculated</li>
<li><b>Admin Management:</b> Admin accesses dashboard → AdminAuth middleware validates role → Dashboard stats aggregated from Orders, Products, Users collections</li>
</ol>
</div>

<div class="page">
<h2>5.4 Database Schema</h2>
<h3>Users Collection</h3>
<table>
<tr><th>Field</th><th>Type</th><th>Description</th></tr>
<tr><td>name</td><td>String (required)</td><td>User's full name</td></tr>
<tr><td>email</td><td>String (unique, required)</td><td>Login email address</td></tr>
<tr><td>password</td><td>String (hashed)</td><td>Bcrypt-encrypted password (10 salt rounds)</td></tr>
<tr><td>role</td><td>String (enum: user, admin)</td><td>User role for access control</td></tr>
<tr><td>avatar</td><td>String</td><td>Profile picture URL</td></tr>
<tr><td>cart</td><td>Array (embedded)</td><td>Cart items: {product: ObjectId, quantity, color, size}</td></tr>
<tr><td>address</td><td>Object (embedded)</td><td>Saved address: {street, city, state, pincode, phone}</td></tr>
<tr><td>createdAt</td><td>Date (auto)</td><td>Account creation timestamp</td></tr>
</table>
<h3>Products Collection</h3>
<table>
<tr><th>Field</th><th>Type</th><th>Description</th></tr>
<tr><td>name</td><td>String</td><td>Product title</td></tr>
<tr><td>image</td><td>String</td><td>Product image URL</td></tr>
<tr><td>brand</td><td>String</td><td>Brand name</td></tr>
<tr><td>category</td><td>String (enum)</td><td>Team Sports / Apparel / Footwear / Accessories / Fitness</td></tr>
<tr><td>description</td><td>String</td><td>Product description</td></tr>
<tr><td>price</td><td>Number</td><td>Selling price (INR)</td></tr>
<tr><td>mrp</td><td>Number</td><td>Maximum retail price</td></tr>
<tr><td>rating</td><td>Number (0-5)</td><td>Average star rating</td></tr>
<tr><td>stock</td><td>Number</td><td>Available quantity</td></tr>
<tr><td>featured</td><td>Boolean</td><td>Featured product flag for homepage</td></tr>
<tr><td>sizes</td><td>Array of Strings</td><td>Available sizes (S, M, L, XL, etc.)</td></tr>
<tr><td>colors</td><td>Array of Objects</td><td>{name, hex, stock} for each color variant</td></tr>
<tr><td>specifications</td><td>Array of Objects</td><td>{key, value} pairs for product specs</td></tr>
<tr><td>benefits</td><td>Array of Strings</td><td>Product benefits list</td></tr>
<tr><td>gender</td><td>String</td><td>Target gender (Men, Women, Unisex)</td></tr>
</table>
</div>

<div class="page">
<h3>Orders Collection</h3>
<table>
<tr><th>Field</th><th>Type</th><th>Description</th></tr>
<tr><td>user</td><td>ObjectId (ref: User)</td><td>Reference to the buyer</td></tr>
<tr><td>items</td><td>Array of Objects</td><td>{product, name, price, quantity, image, color, size}</td></tr>
<tr><td>totalAmount</td><td>Number</td><td>Total order value in INR</td></tr>
<tr><td>shippingAddress</td><td>Object</td><td>{fullName, street, city, state, pincode, phone}</td></tr>
<tr><td>paymentMethod</td><td>String</td><td>Cash on Delivery / Online</td></tr>
<tr><td>status</td><td>String (enum)</td><td>Processing / Confirmed / Shipped / Delivered / Cancelled</td></tr>
<tr><td>createdAt</td><td>Date (auto)</td><td>Order placement timestamp</td></tr>
</table>
<h3>Reviews Collection</h3>
<table>
<tr><th>Field</th><th>Type</th><th>Description</th></tr>
<tr><td>user</td><td>ObjectId (ref: User)</td><td>Reviewer reference</td></tr>
<tr><td>product</td><td>ObjectId (ref: Product)</td><td>Reviewed product reference</td></tr>
<tr><td>rating</td><td>Number (1-5)</td><td>Star rating</td></tr>
<tr><td>title</td><td>String</td><td>Review headline</td></tr>
<tr><td>comment</td><td>String</td><td>Review body text</td></tr>
<tr><td>createdAt</td><td>Date (auto)</td><td>Review timestamp</td></tr>
</table>
<p><b>Unique Constraint:</b> Compound unique index on {user, product} ensures one review per user per product.</p>

<h3>OTP Collections</h3>
<table>
<tr><th>Collection</th><th>Fields</th><th>Purpose</th></tr>
<tr><td>otps</td><td>email, otp, name, password, createdAt (TTL: 5min)</td><td>Registration OTP verification with pending user data</td></tr>
<tr><td>passwordresetotps</td><td>email, otp, createdAt (TTL: 5min)</td><td>Password reset OTP verification</td></tr>
</table>

<h2>5.5 REST API Design</h2>
<h3>Authentication APIs (8 endpoints)</h3>
<table>
<tr><th>Method</th><th>Endpoint</th><th>Auth</th><th>Purpose</th></tr>
<tr><td>POST</td><td>/api/auth/send-otp</td><td>No</td><td>Send registration OTP</td></tr>
<tr><td>POST</td><td>/api/auth/verify-otp</td><td>No</td><td>Verify OTP and create account</td></tr>
<tr><td>POST</td><td>/api/auth/login</td><td>No</td><td>Email/password login</td></tr>
<tr><td>POST</td><td>/api/auth/google</td><td>No</td><td>Google OAuth login</td></tr>
<tr><td>GET</td><td>/api/auth/me</td><td>JWT</td><td>Get current user profile</td></tr>
<tr><td>PUT</td><td>/api/auth/profile</td><td>JWT</td><td>Update profile</td></tr>
<tr><td>POST</td><td>/api/auth/forgot-password</td><td>No</td><td>Send password reset OTP</td></tr>
<tr><td>POST</td><td>/api/auth/reset-password</td><td>No</td><td>Reset password with OTP</td></tr>
</table>
</div>

<div class="page">
<h3>Product APIs (3 endpoints)</h3>
<table>
<tr><th>Method</th><th>Endpoint</th><th>Auth</th><th>Purpose</th></tr>
<tr><td>GET</td><td>/api/products</td><td>No</td><td>List products with filters</td></tr>
<tr><td>GET</td><td>/api/products/:id</td><td>No</td><td>Get product details</td></tr>
<tr><td>GET</td><td>/api/products/:id/reviews</td><td>No</td><td>Get product reviews</td></tr>
</table>
<h3>Cart APIs (4 endpoints)</h3>
<table>
<tr><th>Method</th><th>Endpoint</th><th>Auth</th><th>Purpose</th></tr>
<tr><td>GET</td><td>/api/cart</td><td>JWT</td><td>Get user cart</td></tr>
<tr><td>POST</td><td>/api/cart/add</td><td>JWT</td><td>Add item to cart</td></tr>
<tr><td>PUT</td><td>/api/cart/update</td><td>JWT</td><td>Update item quantity</td></tr>
<tr><td>DELETE</td><td>/api/cart/remove/:id</td><td>JWT</td><td>Remove cart item</td></tr>
</table>
<h3>Order APIs (3 endpoints)</h3>
<table>
<tr><th>Method</th><th>Endpoint</th><th>Auth</th><th>Purpose</th></tr>
<tr><td>POST</td><td>/api/orders</td><td>JWT</td><td>Place new order (COD)</td></tr>
<tr><td>GET</td><td>/api/orders</td><td>JWT</td><td>Get user orders</td></tr>
<tr><td>GET</td><td>/api/orders/:id</td><td>JWT</td><td>Get single order details</td></tr>
</table>
<h3>Admin APIs (7 endpoints)</h3>
<table>
<tr><th>Method</th><th>Endpoint</th><th>Auth</th><th>Purpose</th></tr>
<tr><td>GET</td><td>/api/admin/stats</td><td>Admin</td><td>Dashboard analytics</td></tr>
<tr><td>GET</td><td>/api/admin/products</td><td>Admin</td><td>List all products</td></tr>
<tr><td>POST</td><td>/api/admin/products</td><td>Admin</td><td>Add new product</td></tr>
<tr><td>PUT</td><td>/api/admin/products/:id</td><td>Admin</td><td>Update product</td></tr>
<tr><td>DELETE</td><td>/api/admin/products/:id</td><td>Admin</td><td>Delete product</td></tr>
<tr><td>GET</td><td>/api/admin/orders</td><td>Admin</td><td>List all orders</td></tr>
<tr><td>PUT</td><td>/api/admin/orders/:id</td><td>Admin</td><td>Update order status</td></tr>
</table>

<h2>5.6 E-R Diagram</h2>
<p>Entity relationships in SportSara:</p>
<ul>
<li><b>User (1) → (M) Orders</b> — One user places many orders</li>
<li><b>User (1) → (M) Reviews</b> — One user writes many reviews</li>
<li><b>User (1) → (M) Cart Items</b> — Embedded subdocuments</li>
<li><b>Product (1) → (M) Reviews</b> — One product has many reviews</li>
<li><b>Product (1) → (M) Order Items</b> — One product in many orders</li>
<li><b>User-Product Review:</b> Unique compound index</li>
</ul>

<h2>5.7 Sequence Diagrams</h2>
<h3>User Registration Sequence</h3>
<p>User → Frontend: Enter name, email, password → Frontend → Backend: POST /api/auth/send-otp → Backend: Generate 6-digit OTP → Backend → Brevo API: Send OTP email → Backend → MongoDB: Store OTP with 5-min TTL → User → Frontend: Enter OTP → Frontend → Backend: POST /api/auth/verify-otp → Backend: Verify OTP, hash password → Backend → MongoDB: Create User → Backend → Frontend: Return JWT token → Frontend: Store token, redirect to home</p>

<h3>Order Placement Sequence</h3>
<p>User → Frontend: Click "Place Order" → Frontend → Backend: POST /api/orders (with JWT) → Backend: auth middleware validates token → Backend → MongoDB: Populate user cart items → Backend: Create order document with item snapshots → Backend: Calculate totalAmount → Backend → MongoDB: Decrement product stock for each item → Backend → MongoDB: Clear user cart → Backend → Frontend: Return order object → Frontend: Show order confirmation</p>

<h2>5.8 Conclusion</h2>
<p>The system design provides a modular three-tier architecture with clear separation of concerns. The MongoDB schema uses document embedding for cart data and referencing for orders and reviews. The REST API design with 25+ endpoints enables seamless frontend-backend communication.</p>
</div>`;
}
module.exports = { getCh5 };
