function getCh4() {
return `
<div class="page">
<h1 class="chapter-title">Chapter 4: Survey of Technology</h1>
<h2>4.1 Introduction</h2>
<p>Technology selection is crucial for the performance, security, scalability, and maintainability of any software project. For SportSara, the MERN stack was chosen — a widely adopted JavaScript-based technology stack that enables full-stack development using a single programming language across both frontend and backend.</p>

<h2>4.2 Technology Stack Overview</h2>
<table>
<tr><th>Layer</th><th>Technology</th><th>Version</th></tr>
<tr><td>Frontend Framework</td><td>React.js</td><td>18.x</td></tr>
<tr><td>Styling</td><td>CSS3</td><td>—</td></tr>
<tr><td>Backend Runtime</td><td>Node.js</td><td>v24</td></tr>
<tr><td>Backend Framework</td><td>Express.js</td><td>v5.2</td></tr>
<tr><td>Database</td><td>MongoDB (Mongoose)</td><td>v8.x</td></tr>
<tr><td>Authentication</td><td>JWT + Google OAuth 2.0</td><td>—</td></tr>
<tr><td>Email Service</td><td>Brevo REST API</td><td>v3</td></tr>
<tr><td>File Uploads</td><td>Multer</td><td>—</td></tr>
<tr><td>Maps</td><td>Google Maps Places API</td><td>New</td></tr>
<tr><td>Frontend Hosting</td><td>Vercel</td><td>—</td></tr>
<tr><td>Backend Hosting</td><td>Render</td><td>—</td></tr>
</table>

<h2>4.3 Frontend Technologies</h2>
<h3>4.3.1 React.js</h3>
<p>React.js is a JavaScript library developed by Facebook for building dynamic, component-based user interfaces. It uses a virtual DOM (Document Object Model) to efficiently update only the changed parts of the page, resulting in fast rendering and a smooth user experience.</p>
<p><b>Key Features Used in SportSara:</b></p>
<ul>
<li><b>Components:</b> Reusable UI blocks — Header, Footer, Product Card, Payment Modal, Admin Layout</li>
<li><b>Hooks:</b> useState for local state, useEffect for side effects, useContext for global state, useNavigate for routing</li>
<li><b>Context API:</b> AuthContext manages user session globally, CartContext manages shopping cart state</li>
<li><b>React Router DOM:</b> Handles client-side routing with public routes, protected routes, and admin routes</li>
<li><b>Conditional Rendering:</b> Shows different UI based on login status and user role (admin/user)</li>
</ul>

<h3>4.3.2 CSS3</h3>
<p>Custom CSS3 provides complete control over the application's visual design without dependency on external UI frameworks.</p>
<p><b>Features Used:</b> Flexbox and Grid layouts, CSS animations and transitions, responsive media queries, custom scrollbars, form styling, glassmorphism effects, dark-themed admin panel.</p>

<h3>4.3.3 Google Maps Places API</h3>
<p>The Google Maps Places API (New) is integrated into the checkout page to provide real-time address autocomplete suggestions. As users type their address, the API returns matching locations. When a suggestion is selected, the system auto-fills city, state, and pincode fields.</p>
</div>

<div class="page">
<h2>4.4 Backend Technologies</h2>
<h3>4.4.1 Node.js</h3>
<p>Node.js is a server-side JavaScript runtime built on Chrome's V8 engine. It enables non-blocking, event-driven I/O operations, making it ideal for handling concurrent API requests in an e-commerce application.</p>
<p><b>Why Node.js for SportSara:</b></p>
<ul>
<li>Single language (JavaScript) across frontend and backend reduces context switching</li>
<li>Event-driven architecture handles multiple simultaneous API requests efficiently</li>
<li>NPM ecosystem provides ready-made packages for authentication, database, email, etc.</li>
<li>Fast execution speed for I/O-heavy operations like database queries and API calls</li>
<li>Easy horizontal scaling and deployment on cloud platforms</li>
</ul>

<h3>4.4.2 Express.js v5</h3>
<p>Express.js is a minimal and flexible web framework for Node.js that provides robust HTTP routing, middleware support, and error handling.</p>
<p><b>Middleware Used in SportSara:</b></p>
<ul>
<li><b>cors:</b> Allows cross-origin requests from the React frontend to the Express backend</li>
<li><b>express.json():</b> Parses incoming JSON request bodies</li>
<li><b>auth middleware:</b> Verifies JWT tokens on protected routes</li>
<li><b>adminAuth middleware:</b> Verifies admin role for admin-only routes</li>
<li><b>multer:</b> Handles multipart/form-data for product image uploads</li>
<li><b>express.static:</b> Serves uploaded product images from the /uploads directory</li>
</ul>
<p><b>Routes Configured:</b> 8 route modules — auth, products, cart, orders, payment, reviews, admin, upload</p>

<h2>4.5 Database Technology</h2>
<h3>4.5.1 MongoDB</h3>
<p>MongoDB is a NoSQL document database that stores data in flexible JSON-like BSON documents. Unlike relational databases, MongoDB does not require a fixed schema, allowing easy modification of data structures.</p>
<p><b>Advantages for SportSara:</b></p>
<ul>
<li>Flexible schema — product specifications and variants can vary between items</li>
<li>Embedded documents — cart items are embedded within the user document for fast access</li>
<li>Horizontal scaling through sharding</li>
<li>Rich query language with aggregation pipelines</li>
<li>MongoDB Atlas provides managed cloud hosting with automated backups</li>
</ul>

<h3>4.5.2 Mongoose ODM</h3>
<p>Mongoose provides schema-based data modeling for MongoDB, adding validation, type casting, query building, and middleware hooks. SportSara uses 6 Mongoose models: User, Product, Order, Review, OTP, and PasswordResetOTP.</p>
<p><b>Key Mongoose Features Used:</b></p>
<ul>
<li>Schema validation with required fields and enums</li>
<li>Pre-save hooks for password hashing</li>
<li>Instance methods for password comparison</li>
<li>Population for joining referenced documents</li>
<li>Compound indexes for performance optimization</li>
<li>Text indexes for full-text product search</li>
</ul>
</div>

<div class="page">
<h2>4.6 Authentication Technologies</h2>
<h3>4.6.1 JWT (JSON Web Token)</h3>
<p>JWT provides stateless, token-based authentication for secure API access. When a user logs in, the server generates a signed JWT containing the user ID, which is sent back to the client. The client includes this token in the Authorization header of every subsequent API request.</p>
<p><b>JWT Configuration in SportSara:</b></p>
<ul>
<li>Token payload: { id: user._id }</li>
<li>Signing algorithm: HS256 (HMAC with SHA-256)</li>
<li>Token expiry: 30 days</li>
<li>Secret key: Stored in environment variable JWT_SECRET</li>
<li>Verification: auth middleware decodes and validates token on every protected route</li>
</ul>

<h3>4.6.2 Google OAuth 2.0</h3>
<p>Google OAuth allows users to authenticate using their Google account. SportSara uses the google-auth-library package to verify Google ID tokens on the backend.</p>
<p><b>Flow:</b> 1) User clicks "Sign in with Google" 2) Google returns ID token 3) Backend verifies token with google-auth-library 4) If email exists, login; if not, create account 5) JWT token issued</p>

<h3>4.6.3 OTP Email Verification</h3>
<p>A 6-digit random OTP is generated during registration and password reset. The OTP is stored in MongoDB with a 5-minute TTL (Time To Live) expiry using createdAt index. The OTP is sent to the user's email via the Brevo transactional email API.</p>

<h3>4.6.4 bcryptjs Password Hashing</h3>
<p>All passwords are hashed using bcrypt with 10 salt rounds before storage. The pre-save hook automatically hashes passwords when modified. A comparePassword instance method verifies login credentials.</p>

<h2>4.7 API and Integration Technologies</h2>
<h3>4.7.1 RESTful API</h3>
<p>RESTful APIs connect the React frontend with the Express.js backend using JSON data format over HTTP.</p>
<table>
<tr><th>Method</th><th>Use</th><th>Example</th></tr>
<tr><td>GET</td><td>Read/Fetch data</td><td>GET /api/products</td></tr>
<tr><td>POST</td><td>Create new records</td><td>POST /api/auth/login</td></tr>
<tr><td>PUT</td><td>Update existing records</td><td>PUT /api/admin/orders/:id</td></tr>
<tr><td>DELETE</td><td>Remove records</td><td>DELETE /api/cart/remove/:id</td></tr>
</table>

<h3>4.7.2 Brevo Transactional Email API</h3>
<p>SportSara uses the Brevo (formerly Sendinblue) REST API for sending OTP verification emails and password reset emails. Emails are sent via HTTPS POST requests to api.brevo.com/v3/smtp/email with the API key stored in environment variables.</p>

<h2>4.8 Deployment Technologies</h2>
<ul>
<li><b>Vercel</b> — Frontend hosting with automatic CI/CD from GitHub, edge network for fast delivery</li>
<li><b>Render</b> — Backend hosting with Node.js support, environment variables, and auto-deploy</li>
<li><b>MongoDB Atlas</b> — Cloud database with M0 free tier, automated backups, global clusters</li>
</ul>

<h2>4.9 Technology Comparison</h2>
<h3>4.9.1 Why MERN over MEAN Stack</h3>
<table>
<tr><th>Feature</th><th>MERN (React)</th><th>MEAN (Angular)</th></tr>
<tr><td>Learning Curve</td><td>Easier — library-based</td><td>Steeper — full framework</td></tr>
<tr><td>Performance</td><td>Virtual DOM — faster rendering</td><td>Real DOM — slower updates</td></tr>
<tr><td>Flexibility</td><td>Choose own tools</td><td>Opinionated structure</td></tr>
<tr><td>Bundle Size</td><td>Smaller — tree-shakeable</td><td>Larger default bundle</td></tr>
<tr><td>Community</td><td>Larger npm ecosystem</td><td>Enterprise-focused</td></tr>
<tr><td>Mobile</td><td>React Native available</td><td>Ionic/NativeScript</td></tr>
</table>
<p>React.js was chosen for SportSara because of its simpler learning curve, faster rendering via virtual DOM, larger community support, and the ability to extend to mobile apps via React Native in the future.</p>

<h3>4.9.2 Why MongoDB over MySQL</h3>
<table>
<tr><th>Feature</th><th>MongoDB (NoSQL)</th><th>MySQL (SQL)</th></tr>
<tr><td>Schema</td><td>Flexible — no fixed schema</td><td>Rigid — predefined tables</td></tr>
<tr><td>Data Format</td><td>JSON-like BSON documents</td><td>Rows and columns</td></tr>
<tr><td>Scaling</td><td>Horizontal (sharding)</td><td>Vertical (bigger server)</td></tr>
<tr><td>Relationships</td><td>Embedding + referencing</td><td>Foreign keys + JOINs</td></tr>
<tr><td>Product Variants</td><td>Easy — nested arrays</td><td>Complex — multiple tables</td></tr>
<tr><td>Cloud Hosting</td><td>Atlas free tier</td><td>Paid services mostly</td></tr>
</table>
<p>MongoDB was ideal for SportSara because product data varies significantly — some products have sizes, some have colors, some have both. MongoDB's flexible schema handles this naturally without requiring multiple join tables. The embedded cart pattern within the user document also eliminates the need for a separate cart table, improving read performance.</p>
</div>

<div class="page">
<h3>4.9.3 Why Express.js v5 over Fastify</h3>
<table>
<tr><th>Feature</th><th>Express.js v5</th><th>Fastify</th></tr>
<tr><td>Maturity</td><td>Most popular Node.js framework</td><td>Newer, less adoption</td></tr>
<tr><td>Middleware</td><td>Vast ecosystem</td><td>Limited plugin system</td></tr>
<tr><td>Documentation</td><td>Extensive</td><td>Growing</td></tr>
<tr><td>Async Support</td><td>v5 has native async error handling</td><td>Built-in</td></tr>
<tr><td>Community</td><td>Largest in Node.js</td><td>Smaller</td></tr>
</table>
<p>Express.js v5 was chosen because of its industry dominance, extensive middleware ecosystem, and the new async error handling feature that eliminates the need for try-catch wrappers in route handlers.</p>

<h3>4.9.4 Why Vercel + Render over AWS</h3>
<table>
<tr><th>Feature</th><th>Vercel + Render</th><th>AWS (EC2 + S3)</th></tr>
<tr><td>Setup Time</td><td>Minutes (GitHub connect)</td><td>Hours (manual config)</td></tr>
<tr><td>Cost</td><td>Free tier available</td><td>Pay-as-you-go</td></tr>
<tr><td>CI/CD</td><td>Automatic on push</td><td>Manual pipeline setup</td></tr>
<tr><td>Complexity</td><td>Simple dashboard</td><td>Complex console</td></tr>
<tr><td>SSL</td><td>Auto HTTPS</td><td>Manual certificate</td></tr>
<tr><td>Scaling</td><td>Auto-managed</td><td>Manual configuration</td></tr>
</table>
<p>Vercel and Render were chosen for their simplicity, zero-configuration deployment, and generous free tiers — perfect for an academic project that needs professional-grade hosting without cost.</p>

<h2>4.10 Working Principles</h2>
<h3>4.10.1 How React Virtual DOM Works</h3>
<p>When state changes in a React component, React creates a new virtual DOM tree. It then compares the new tree with the previous one using a "diffing" algorithm. Only the nodes that actually changed are updated in the real DOM. This process, called "reconciliation," makes React significantly faster than traditional DOM manipulation.</p>
<p>In SportSara, when a user adds a product to the cart, only the cart icon count and cart sidebar update — the entire page does not re-render. This provides a smooth, app-like experience.</p>

<h3>4.10.2 How JWT Authentication Works</h3>
<p>JWT (JSON Web Token) is a compact, URL-safe token format used for stateless authentication:</p>
<ol>
<li><b>Header</b> — Contains algorithm (HS256) and token type (JWT)</li>
<li><b>Payload</b> — Contains user ID and issued/expiry timestamps</li>
<li><b>Signature</b> — HMAC-SHA256 hash of header + payload using a secret key</li>
</ol>
<p>The three parts are Base64-encoded and joined with dots: xxxxx.yyyyy.zzzzz. The server verifies the token by recalculating the signature with its secret key. If the signatures match, the token is valid and the user ID is extracted from the payload.</p>

<h3>4.10.3 How MongoDB Indexing Improves Performance</h3>
<p>SportSara uses multiple indexes to speed up frequent queries:</p>
<ul>
<li><b>Category + Featured + CreatedAt</b> — Speeds up home page featured product queries</li>
<li><b>Price index</b> — Enables fast price-range filtering on the shop page</li>
<li><b>Rating index</b> — Sorts products by rating efficiently</li>
<li><b>Text index (name, description, brand)</b> — Powers full-text product search</li>
</ul>
<p>Without indexes, MongoDB would perform a "collection scan" checking every document. With indexes, queries use B-tree structures to find matching documents in O(log n) time instead of O(n), resulting in sub-100ms query times even with thousands of products.</p>

<h3>4.10.4 How Google OAuth 2.0 Works in SportSara</h3>
<ol>
<li>User clicks "Sign in with Google" button on the frontend</li>
<li>Google's OAuth popup appears and user selects their Google account</li>
<li>Google returns an ID token (a signed JWT from Google) to the frontend</li>
<li>Frontend sends this ID token to the SportSara backend: POST /api/auth/google</li>
<li>Backend uses google-auth-library to verify the token's signature with Google's public keys</li>
<li>Backend extracts email and name from the verified token payload</li>
<li>If email exists in database → login; if not → create new account</li>
<li>Backend generates its own JWT and returns it to the frontend</li>
<li>Frontend stores JWT in localStorage for subsequent API requests</li>
</ol>

<h2>4.11 Conclusion</h2>
<p>The MERN stack technologies selected for SportSara are modern, well-supported, and industry-standard. Technology comparisons confirm that React.js, Node.js, MongoDB, and Express.js are optimal choices for this project. The cloud deployment strategy using Vercel, Render, and MongoDB Atlas ensures high availability, easy maintenance, and zero-cost hosting for an academic project.</p>
</div>`;

}
module.exports = { getCh4 };
