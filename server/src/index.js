const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const authRoutes = require('../routes/auth');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

const allowedOrigins = [
  'http://localhost:5173',
  'https://brute-force-protected-login-1.onrender.com',
];

app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 204,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});