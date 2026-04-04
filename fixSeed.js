// Run this once: node fixSeed.js
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('Connected');
  const Product = require('./src/models/Product');

  // Fix existing products with missing images
  const DEFAULT_IMG = 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80';
  const result = await Product.updateMany(
    { $or: [{ image: { $exists: false } }, { image: '' }, { image: null }] },
    { $set: { image: DEFAULT_IMG } }
  );
  console.log(`Fixed ${result.modifiedCount} products with missing images`);

  // Delete and reseed all products
  await Product.deleteMany({});
  console.log('Cleared products');

  mongoose.disconnect();
  console.log('Done. Now run: node server.js');
}).catch(err => console.error(err.message));
