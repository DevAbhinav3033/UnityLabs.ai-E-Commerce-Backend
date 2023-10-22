const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config();

// const crypto = require('crypto');

// const secretKey = crypto.randomBytes(32).toString('base64');
// console.log(secretKey);


// MongoDB connection
const MONGODB_URI=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qpncytw.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected',() => {
  console.log('Database connected successfully');
})
mongoose.connection.on('disconnected',() =>{
  console.log('Database disconnected');
})
mongoose.connection.on('error', console.error);

// Middlewaresl.
app.use(bodyParser.json());
app.use(morgan('dev'));
// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/buyer', require('./routes/buyerRoutes'));
app.use('/api/seller', require('./routes/sellerRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
