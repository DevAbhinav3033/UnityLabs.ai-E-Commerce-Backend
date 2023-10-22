const mongoose = require('mongoose');
const productSchema = require('./product');

const catalogSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the seller user
  products: [productSchema], // List of products in the catalog
});

module.exports = mongoose.model('Catalog', catalogSchema);
