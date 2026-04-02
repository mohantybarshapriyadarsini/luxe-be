const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://luxe-aecf.onrender.com',
    'https://luxe-pi-henna.vercel.app',
    'https://luxe-1.onrender.com',
    'https://luxe-be.onrender.com',
    'https://luxecartify.co.in',
    'https://www.luxecartify.co.in',
  ],
  credentials: true,
}));

app.use(express.json());

app.use('/api/buyers',   require('./routes/buyerRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders',   require('./routes/orderRoutes'));
app.use('/api/admin',    require('./routes/adminRoutes'));
app.use('/api/salers',   require('../Saler/src/routes/salerRoutes'));

app.get('/api/config/razorpay', (req, res) => {
  res.json({ keyId: process.env.RAZORPAY_KEY_ID });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'LUXE backend is running' });
});

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

module.exports = app;
