function getCh1to3() {
return `
<div class="page">
<h1 class="chapter-title">Chapter 1: Introduction</h1>
<h2>1.1 Introduction to the System</h2>
<p>The sports and fitness industry is experiencing a major shift toward online retail. Consumers increasingly prefer browsing, comparing, and purchasing sports gear and apparel through digital platforms rather than visiting physical stores. Traditional retail methods such as manual billing, paper-based inventory tracking, and walk-in-only shopping create significant limitations in convenience, reach, and efficiency.</p>
<p><b>SportSara</b> is a full-stack e-commerce web application designed specifically for sports enthusiasts. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), it provides a seamless online shopping experience for sports equipment, apparel, footwear, fitness accessories, and team sports gear.</p>
<p>The platform enables customers to browse a curated catalog of sports products, filter by categories, view detailed product information including sizes and colors, add items to their cart, and complete purchases through a secure checkout process with address auto-completion powered by Google Maps API. An integrated admin dashboard allows administrators to manage products, orders, and users from a centralized interface.</p>
<p>SportSara incorporates modern security practices including OTP-based email verification during registration, Google OAuth social login, JWT-based session management, and bcrypt password hashing. The system also features automated email notifications via the Brevo transactional email API, product reviews and ratings, and real-time order status tracking.</p>
<p>The application follows a client-server architecture where the React.js frontend communicates with the Express.js backend through RESTful APIs, and the backend interacts with MongoDB Atlas cloud database for persistent data storage. This separation of concerns ensures maintainability, scalability, and ease of deployment.</p>

<h2>1.2 Problem Definition</h2>
<p>Traditional sports retail businesses face several challenges that limit their growth and customer satisfaction:</p>
<ul>
<li>Limited geographical reach — customers must visit physical stores</li>
<li>No online product catalog or search functionality</li>
<li>Manual inventory tracking leads to stock discrepancies</li>
<li>Lack of customer accounts and order history tracking</li>
<li>No product review or rating system for customer feedback</li>
<li>Inefficient order processing and status communication</li>
<li>Inability to offer secure online payments</li>
<li>Poor customer engagement due to absence of digital tools</li>
<li>Difficulty managing multiple product categories and variants (sizes, colors)</li>
<li>No centralized dashboard for business analytics and reporting</li>
<li>High dependency on manual labor for every transaction</li>
<li>No automated notifications for order updates or promotions</li>
</ul>
<p>These limitations reduce sales opportunities, customer satisfaction, and operational efficiency, creating a strong need for an automated e-commerce solution like SportSara.</p>
</div>

<div class="page">
<h2>1.3 Aim</h2>
<p>The aim of SportSara is to develop a modern, user-friendly, full-stack e-commerce platform tailored for the sports and fitness industry. It enables customers to browse, select, and purchase sports products online while providing administrators with powerful tools to manage the entire business digitally.</p>

<h2>1.4 Objectives</h2>
<h3>Primary Objectives:</h3>
<ul>
<li>Provide a responsive online store for sports products across five categories: Team Sports, Apparel, Footwear, Accessories, and Fitness</li>
<li>Implement secure user authentication with email OTP verification and Google OAuth</li>
<li>Enable shopping cart functionality with size and color selection</li>
<li>Build a complete checkout flow with address auto-fill via Google Maps</li>
<li>Develop an admin dashboard for product, order, and user management</li>
<li>Integrate product reviews and ratings system</li>
</ul>
<h3>Secondary Objectives:</h3>
<ul>
<li>Create a visually appealing and mobile-responsive user interface</li>
<li>Implement automated email notifications for account events</li>
<li>Ensure data security through encryption and token-based authentication</li>
<li>Support product search and category filtering</li>
<li>Enable order tracking with real-time status updates</li>
<li>Design a scalable architecture for future enhancements</li>
<li>Deploy the application on cloud platforms for high availability</li>
</ul>

<h2>1.5 Goal</h2>
<p>The goal of SportSara is to digitize the sports retail experience through a reliable and scalable web platform, offering:</p>
<ul>
<li>Convenient 24/7 shopping access for customers from any device</li>
<li>Rich product information with images, specifications, sizes, and colors</li>
<li>Secure account management with multiple authentication options</li>
<li>Streamlined order processing from cart to delivery tracking</li>
<li>Data-driven business insights through the admin dashboard</li>
<li>Enhanced customer engagement through reviews and ratings</li>
<li>Reduced operational overhead through automation</li>
<li>Competitive advantage through professional online presence</li>
</ul>

<h2>1.6 Need of the System</h2>
<p>SportSara is needed due to the growing demand for online sports shopping and the limitations of traditional retail methods.</p>
<h3>Key Needs:</h3>
<ul>
<li>Digital product catalog with search and filtering capabilities</li>
<li>Secure online shopping with verified user accounts</li>
<li>Automated order management replacing manual processes</li>
<li>Centralized admin panel for efficient business operations</li>
<li>Customer feedback mechanism through reviews and ratings</li>
<li>Mobile-responsive design for shopping on any device</li>
<li>Address validation and auto-completion for accurate deliveries</li>
<li>Competitive advantage through a professional online presence</li>
</ul>
</div>

<div class="page">
<h2>1.7 Scope of the Project</h2>
<p>The scope of SportSara encompasses the following functional areas:</p>
<h3>User Module:</h3>
<ul>
<li>User registration with email OTP verification</li>
<li>Google OAuth social login integration</li>
<li>Email/password login with JWT session management</li>
<li>Password reset via OTP email</li>
<li>Profile management (name, avatar, address)</li>
</ul>
<h3>Product Module:</h3>
<ul>
<li>Product catalog with five categories</li>
<li>Product details with images, descriptions, sizes, colors, specifications, and benefits</li>
<li>Product search and category filtering</li>
<li>Featured products showcase on home page</li>
</ul>
<h3>Shopping Module:</h3>
<ul>
<li>Shopping cart with variant selection (size + color)</li>
<li>Cart quantity management</li>
<li>Checkout with Google Maps address autocomplete</li>
<li>Cash on Delivery order placement</li>
<li>Order history and status tracking</li>
</ul>
<h3>Review Module:</h3>
<ul>
<li>Product reviews and star ratings (1-5)</li>
<li>One review per user per product constraint</li>
<li>Average rating calculation</li>
</ul>
<h3>Admin Module:</h3>
<ul>
<li>Dashboard with analytics (revenue, orders, users, products)</li>
<li>Product CRUD operations</li>
<li>Order status management</li>
<li>User management with role toggle</li>
<li>Top selling products and low stock alerts</li>
<li>Monthly revenue chart data</li>
</ul>
</div>

<div class="page">
<h1 class="chapter-title">Chapter 2: Requirement Specification</h1>
<h2>2.1 Introduction</h2>
<p>Requirement Specification is a critical phase of software development that defines the functional and technical needs of the project. It ensures that the software is developed according to user expectations and business requirements.</p>
<p>For the SportSara E-Commerce Platform, requirement specification identifies the software tools, hardware resources, system environment, and development methodology needed to build a reliable and scalable online store.</p>
</div>

<div class="page">
<h2>2.2 System Environment</h2>
<h3>Development Environment</h3>
<table>
<tr><th>Component</th><th>Specification</th></tr>
<tr><td>Operating System</td><td>Windows 11</td></tr>
<tr><td>Code Editor</td><td>Visual Studio Code</td></tr>
<tr><td>Frontend Runtime</td><td>Web Browser (Chrome)</td></tr>
<tr><td>Backend Runtime</td><td>Node.js v24</td></tr>
<tr><td>Database</td><td>MongoDB Atlas (Cloud)</td></tr>
<tr><td>Version Control</td><td>Git / GitHub</td></tr>
<tr><td>API Testing</td><td>Postman / Browser DevTools</td></tr>
</table>
<h3>Deployment Environment</h3>
<table>
<tr><th>Component</th><th>Specification</th></tr>
<tr><td>Frontend Hosting</td><td>Vercel</td></tr>
<tr><td>Backend Hosting</td><td>Render</td></tr>
<tr><td>Database Hosting</td><td>MongoDB Atlas</td></tr>
<tr><td>User Access</td><td>Internet Browser</td></tr>
<tr><td>Devices Supported</td><td>Mobile / Tablet / Laptop / Desktop</td></tr>
</table>
<h3>Browser Compatibility</h3>
<ul><li>Google Chrome</li><li>Mozilla Firefox</li><li>Microsoft Edge</li><li>Safari</li><li>Opera</li></ul>
<h3>User Roles</h3>
<ul>
<li><b>Customer</b> — Browses products, manages cart, places orders, writes reviews</li>
<li><b>Admin</b> — Manages products, orders, users, and views analytics dashboard</li>
</ul>

<h2>2.3 Software Requirements</h2>
<h3>Frontend Technologies</h3>
<table>
<tr><th>Software</th><th>Purpose</th></tr>
<tr><td>HTML5</td><td>Page structure and semantic content</td></tr>
<tr><td>CSS3</td><td>Styling, animations, and responsive design</td></tr>
<tr><td>JavaScript (ES6+)</td><td>Client-side logic and interactivity</td></tr>
<tr><td>React.js</td><td>Component-based UI framework</td></tr>
<tr><td>React Router DOM</td><td>Client-side routing and navigation</td></tr>
<tr><td>React Hot Toast</td><td>Toast notification system</td></tr>
<tr><td>Google Maps Places API</td><td>Address autocomplete in checkout</td></tr>
</table>
<h3>Backend Technologies</h3>
<table>
<tr><th>Software</th><th>Purpose</th></tr>
<tr><td>Node.js</td><td>Server-side JavaScript runtime</td></tr>
<tr><td>Express.js v5</td><td>Backend web framework and API routing</td></tr>
<tr><td>Mongoose</td><td>MongoDB ODM for data modeling</td></tr>
<tr><td>jsonwebtoken</td><td>JWT-based authentication</td></tr>
<tr><td>bcryptjs</td><td>Password hashing and security</td></tr>
<tr><td>google-auth-library</td><td>Google OAuth verification</td></tr>
<tr><td>multer</td><td>File upload handling</td></tr>
<tr><td>cors</td><td>Cross-origin request handling</td></tr>
<tr><td>dotenv</td><td>Environment variable management</td></tr>
</table>
</div>

<div class="page">
<h2>2.4 Hardware Requirements</h2>
<h3>Minimum Requirements</h3>
<table>
<tr><th>Component</th><th>Requirement</th></tr>
<tr><td>Processor</td><td>Intel Core i3 or equivalent</td></tr>
<tr><td>RAM</td><td>4 GB</td></tr>
<tr><td>Storage</td><td>20 GB Free Space</td></tr>
<tr><td>Display</td><td>1366 × 768</td></tr>
<tr><td>Internet</td><td>Broadband connection</td></tr>
</table>
<h3>Recommended Requirements</h3>
<table>
<tr><th>Component</th><th>Requirement</th></tr>
<tr><td>Processor</td><td>Intel Core i5 / i7 or equivalent</td></tr>
<tr><td>RAM</td><td>8 GB or above</td></tr>
<tr><td>Storage</td><td>SSD 256 GB+</td></tr>
<tr><td>Display</td><td>Full HD (1920 × 1080)</td></tr>
<tr><td>Internet</td><td>High-speed broadband</td></tr>
</table>

<h2>2.5 Methodology</h2>
<p>For the SportSara project, <b>Agile Methodology</b> was used because it supports continuous development, iterative testing, and incremental improvement.</p>
<h3>Why Agile?</h3>
<ul>
<li>Flexible to requirement changes during development</li>
<li>Faster feature delivery through sprints</li>
<li>Easy identification and fixing of bugs</li>
<li>Continuous feedback integration</li>
<li>Better quality control through iterative testing</li>
</ul>
<h3>Development Phases</h3>
<ol>
<li><b>Requirement Gathering</b> — E-commerce needs analyzed: product catalog, cart, checkout, authentication, admin panel</li>
<li><b>System Design</b> — Database schema, UI wireframes, API architecture, and workflow designed</li>
<li><b>Development</b> — Modules built: Authentication, Products, Cart, Orders, Admin, Reviews, Payments</li>
<li><b>Testing</b> — Functional, UI, API, Security, and Cross-browser testing performed</li>
<li><b>Deployment</b> — Frontend deployed on Vercel, Backend on Render, Database on MongoDB Atlas</li>
<li><b>Maintenance</b> — Ongoing bug fixes, feature additions, and performance optimization</li>
</ol>
<p><b>Agile Cycle:</b> Requirement → Design → Develop → Test → Deploy → Improve</p>
<p>Agile methodology enabled rapid development of SportSara with high-quality output and the flexibility to add features like Google OAuth, address autocomplete, and email verification during the development cycle.</p>
</div>

<div class="page">
<h1 class="chapter-title">Chapter 3: System Analysis</h1>
<h2>3.1 Introduction</h2>
<p>System Analysis involves studying the existing system and defining requirements for the new system. It helps identify problems, understand user needs, and design effective solutions. For SportSara, analysis focused on the online sports retail process — product discovery, ordering, payments, and fulfillment.</p>

<h2>3.2 Existing System Analysis</h2>
<p>Traditional sports retail stores rely on manual processes such as walk-in purchases, handwritten bills, phone-based order inquiries, and physical inventory registers.</p>
<h3>Limitations of Existing System</h3>
<ol>
<li>No online presence — customers must visit physical stores</li>
<li>Manual inventory counting leads to stock errors</li>
<li>No product search or filtering capability</li>
<li>Limited product information — no specifications, reviews, or variant details</li>
<li>Paper-based billing and manual order tracking</li>
<li>No customer account or purchase history</li>
<li>Poor scalability for growing product catalogs</li>
<li>No analytics or business reporting tools</li>
<li>Difficulty handling returns and order status updates</li>
<li>High dependency on human effort for every transaction</li>
</ol>

<h2>3.3 Proposed System</h2>
<p>SportSara automates the entire sports retail experience through a digital platform:</p>
<ol>
<li>Online product catalog with five categories: Team Sports, Apparel, Footwear, Accessories, Fitness</li>
<li>Product pages with images, descriptions, sizes, colors, specifications, and benefits</li>
<li>Shopping cart with quantity management and variant selection</li>
<li>Secure user registration with OTP email verification</li>
<li>Google OAuth social login for convenience</li>
<li>Checkout with Google Maps address autocomplete</li>
<li>Order placement with status tracking (Processing → Confirmed → Shipped → Delivered)</li>
<li>Product review and rating system</li>
<li>Admin dashboard with product, order, and user management</li>
<li>Automated transactional emails via Brevo API</li>
</ol>

<h2>3.4 Feasibility Analysis</h2>
<ul>
<li><b>Technical:</b> Uses proven MERN stack technologies with large community support</li>
<li><b>Economic:</b> Low-cost development using open-source tools and free-tier cloud hosting</li>
<li><b>Operational:</b> Intuitive UI for customers and straightforward admin panel for management</li>
<li><b>Schedule:</b> Deliverable within the academic project timeline using Agile sprints</li>
</ul>
</div>

<div class="page">
<h2>3.5 Functional Requirements</h2>
<table>
<tr><th>Module</th><th>Functional Requirement</th></tr>
<tr><td>Authentication</td><td>User registration with email OTP verification</td></tr>
<tr><td>Authentication</td><td>Google OAuth social login</td></tr>
<tr><td>Authentication</td><td>Email/password login with JWT tokens</td></tr>
<tr><td>Authentication</td><td>Password reset via OTP email</td></tr>
<tr><td>Products</td><td>Browse products by category</td></tr>
<tr><td>Products</td><td>View product details with variants</td></tr>
<tr><td>Products</td><td>Search products by keyword</td></tr>
<tr><td>Cart</td><td>Add/remove items with size and color</td></tr>
<tr><td>Cart</td><td>Update item quantity</td></tr>
<tr><td>Orders</td><td>Place order with shipping address</td></tr>
<tr><td>Orders</td><td>View order history and status</td></tr>
<tr><td>Reviews</td><td>Submit product review and rating</td></tr>
<tr><td>Admin</td><td>CRUD operations for products</td></tr>
<tr><td>Admin</td><td>Manage order statuses</td></tr>
<tr><td>Admin</td><td>View dashboard analytics</td></tr>
<tr><td>Admin</td><td>Manage user roles</td></tr>
</table>

<h2>3.6 Non-Functional Requirements</h2>
<table>
<tr><th>Requirement</th><th>Description</th></tr>
<tr><td>Performance</td><td>API response times under 500ms, page load under 2 seconds</td></tr>
<tr><td>Security</td><td>Password encryption, JWT authentication, role-based access</td></tr>
<tr><td>Responsiveness</td><td>Mobile-first design across all screen sizes</td></tr>
<tr><td>Reliability</td><td>99.9% uptime via cloud hosting</td></tr>
<tr><td>Scalability</td><td>Horizontal scaling with MongoDB Atlas and cloud deployment</td></tr>
<tr><td>Maintainability</td><td>Modular code with separation of concerns</td></tr>
<tr><td>Usability</td><td>Intuitive navigation and clear error messages</td></tr>
</table>

<h2>3.7 Use Case Analysis</h2>
<h3>Use Case 1: User Registration</h3>
<table>
<tr><th style="width:25%;text-align:left;">Field</th><th style="text-align:left;">Description</th></tr>
<tr><td><b>Actor</b></td><td>New Customer</td></tr>
<tr><td><b>Precondition</b></td><td>User is not registered</td></tr>
<tr><td><b>Steps</b></td><td>1) User enters name, email, password<br>2) System sends 6-digit OTP to email via Brevo API<br>3) User enters OTP<br>4) System verifies OTP (5-minute expiry)<br>5) Account created with hashed password<br>6) JWT token issued</td></tr>
<tr><td><b>Postcondition</b></td><td>User is logged in with new account</td></tr>
</table>

<h3>Use Case 2: Product Purchase</h3>
<table>
<tr><th style="width:25%;text-align:left;">Field</th><th style="text-align:left;">Description</th></tr>
<tr><td><b>Actor</b></td><td>Registered Customer</td></tr>
<tr><td><b>Precondition</b></td><td>User is logged in</td></tr>
<tr><td><b>Steps</b></td><td>1) User browses products<br>2) Selects size and color<br>3) Adds to cart<br>4) Proceeds to checkout<br>5) Enters shipping address with Google Maps autocomplete<br>6) Selects payment method<br>7) Confirms order</td></tr>
<tr><td><b>Postcondition</b></td><td>Order created, stock updated, cart cleared</td></tr>
</table>

<h3>Use Case 3: Admin Order Management</h3>
<table>
<tr><th style="width:25%;text-align:left;">Field</th><th style="text-align:left;">Description</th></tr>
<tr><td><b>Actor</b></td><td>Admin</td></tr>
<tr><td><b>Precondition</b></td><td>Admin is logged in</td></tr>
<tr><td><b>Steps</b></td><td>1) Admin views all orders<br>2) Selects an order<br>3) Updates status (Processing → Confirmed → Shipped → Delivered)<br>4) System saves status</td></tr>
<tr><td><b>Postcondition</b></td><td>Order status updated</td></tr>
</table>
</div>

<div class="page">
<h2>3.8 Gantt Chart</h2>
<p>A Gantt Chart represents tasks and schedules over a timeline for project planning.</p>
<table>
<tr><th>Task</th><th>W1</th><th>W2</th><th>W3</th><th>W4</th><th>W5</th><th>W6</th><th>W7</th><th>W8</th></tr>
<tr><td>Requirement Gathering</td><td>✔</td><td>✔</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>System Analysis</td><td></td><td>✔</td><td>✔</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>UI Design</td><td></td><td></td><td>✔</td><td>✔</td><td></td><td></td><td></td><td></td></tr>
<tr><td>Database Design</td><td></td><td></td><td>✔</td><td>✔</td><td></td><td></td><td></td><td></td></tr>
<tr><td>Frontend Development</td><td></td><td></td><td></td><td>✔</td><td>✔</td><td>✔</td><td></td><td></td></tr>
<tr><td>Backend Development</td><td></td><td></td><td></td><td>✔</td><td>✔</td><td>✔</td><td></td><td></td></tr>
<tr><td>API Integration</td><td></td><td></td><td></td><td></td><td>✔</td><td>✔</td><td></td><td></td></tr>
<tr><td>Testing</td><td></td><td></td><td></td><td></td><td></td><td>✔</td><td>✔</td><td></td></tr>
<tr><td>Deployment</td><td></td><td></td><td></td><td></td><td></td><td></td><td>✔</td><td>✔</td></tr>
<tr><td>Documentation</td><td>✔</td><td>✔</td><td>✔</td><td>✔</td><td></td><td></td><td>✔</td><td>✔</td></tr>
</table>

<h2>3.9 Conclusion</h2>
<p>System analysis identified the inefficiencies of manual sports retail systems and confirmed the need for a digital solution. SportSara provides a complete e-commerce platform for managing product sales efficiently. Feasibility analysis confirmed the project is practical and cost-effective. The use case analysis defined clear user interactions for all major system functions. The Gantt chart ensured proper planning and timely execution of all development phases.</p>
</div>`;
}
module.exports = { getCh1to3 };
