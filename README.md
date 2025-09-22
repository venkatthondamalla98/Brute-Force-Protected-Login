# Brute-Force-Protected-Login System

This project implements a secure login system with brute-force protection, including user and IP-based attempt limiting, account suspension, and IP blocking. The frontend is built with React and Material-UI, while the backend uses Node.js/Express with MongoDB for user data.

# Setup Instructions

   1. Clone the Repository
      
     • git clone https://github.com/venkatthondamalla98/brute-force-protected-login.git  
     • cd brute-force-protected-login  

   2. Backend Setup (/server):
      
      • Install dependencies: npm install
      
      • Create a .env file with:
      
                PORT=3000  
                MONGO_URI=your_mongodb_connection_string  
                JWT_SECRET=your_jwt_secret
      
      • Run the server: npm start

    3. Frontend Setup (/client):
  
      • Install dependencies: npm install
      • Run the app: npm run dev (uses Vite for development)
      • Build for production: npm run build

    4. Database:
  
       • Uses MongoDB. Ensure MongoDB is running and update MONGO_URI in .env.
       • User model includes fields for email, password (hashed), failedAttempts, isSuspendedUntil, etc.
       
    5. Testing:
  
       • Backend tests: Run npm test in /server (uses Jest for auth.test.js).
       • Test login with invalid credentials to trigger brute-force protections.

# Architecture and Design Decisions
   The app follows a client-server architecture:

     • Frontend (/client):

         • Built with React (using Vite for fast builds) and React Router for navigation.
         • UI components use Material-UI for responsive design.
         • Key files: LoginForm.jsx handles form logic, IP fetching, and error UI; Dashboard.jsx displays post-login content.
         • Design decisions: Progressive feedback (e.g., progress bar for remaining attempts, snackbars/alerts) to enhance UX. IP fetched via external API for brute-force tracking. Relative paths for API calls in production to avoid hardcoding.
         • Folder structure:
               → /src/components: Reusable UI like LoginForm and Dashboard.
               → /src/assets: Static assets.
               → Vite config for optimized bundling.

     • Backend (/server):

        • Express.js with MongoDB (Mongoose for models).
        • Security: Bcrypt for password hashing, JWT for auth tokens, memory-cache for IP tracking.
        • Brute-force protection: Limits 5 failed attempts per user (suspends for 15 mins) and 100 per IP (blocks for 15 mins).
        • Routes: /api/auth/login (POST) handles validation, attempt tracking, and responses.
        • Error handling: Custom sendSuccess/sendError functions for consistent API responses.
        • Design decisions: In-memory cache for quick IP checks (no DB overhead); Time-based suspensions using Date.now(). CORS configured for specific origins. Logging for debugging.
        • Folder structure (refer to screenshot):
                → /config: DB connection.
                → /models: User schema.
                → /routes: Auth routes.
                → /tests: Jest tests for login scenarios.

# Hosting Platform Details

        • Frontend: Deployed on Vercel. Handles static assets and client-side routing seamlessly. URL: https://brute-force-protected-login.vercel.app
        • Backend: Deployed on Render (Web Service). Uses Node runtime, with build command npm install and start node server.js. Environment variables set via dashboard. URL: https://brute-force-protected-login-e7jv.onrender.com
        • Integration: Frontend makes API calls to backend URL. CORS resolved by whitelisting frontend origins in backend.

# Screenshots
    
    • Login Page:
              <img width="1804" height="967" alt="image" src="https://github.com/user-attachments/assets/185c4e5a-98c9-496c-b51d-dac7b7f76586" />

    • Dashboard: 
             <img width="1843" height="957" alt="image" src="https://github.com/user-attachments/assets/d5f771a4-2bf2-43ad-b96d-440dd58df64b" />

    • Error Alert (Suspended): 
             <img width="1396" height="948" alt="image" src="https://github.com/user-attachments/assets/07b19cb7-7478-46b6-9328-efe175e60727" />
             <img width="1421" height="959" alt="image" src="https://github.com/user-attachments/assets/15e24308-99c9-4420-9e97-5ef9a3d06158" />






 
