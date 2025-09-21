const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const authRoutes = require('../routes/auth');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();

app.set('trust proxy', 1);

const allowedOrigins = new Set([
  'http://localhost:5173',
  'https://brute-force-protected-login-1.onrender.com',
]);

app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    if (allowedOrigins.has(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.options('*', cors(), (_req, res) => res.sendStatus(204));

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/healthz', (_req, res) => res.send('ok'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
