const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const authRoutes = require('../routes/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB().catch(err => {
  console.error('Database connection failed:', err);
  process.exit(1);
});

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://brute-force-protected-login-1.onrender.com',
  'https://brute-force-protected-login.vercel.app',
  'https://brute-force-protected-git-86c9be-venkatthondamalla98s-projects.vercel.app',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.get('/healthz', (req, res) => {
  res.json({ status: 'OK' });
});

app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS: Origin not allowed' });
  }
  res.status(500).json({ error: 'Internal server error' });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});