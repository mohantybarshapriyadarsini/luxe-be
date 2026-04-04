// const app = require('./src/app');
// require('dotenv').config();

// const PORT = process.env.PORT || 5001;

// app.listen(PORT, () => {
//   console.log(`LUXE Saler server running on port ${PORT}`);
// });





// require("dotenv").config();
// const express = require("express");
// const app = express();

// app.use(express.json());

// const paymentRoutes = require("./routes/paymentRoutes");
// app.use("/api/payment", paymentRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



const app = require("./src/app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`LUXE server running on port ${PORT}`);
});