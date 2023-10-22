const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Catalog = require('../models/catalog');
const Order = require('../models/order');

// Get a list of all sellers
const listSellers = async (req, res) => {
  try {
    const sellers = await User.find({ userType: 'seller' });
    res.status(200).json(sellers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sellers' });
  }
};

// Get a specific seller's catalog
const sellerCatalog = async (req, res) => {
  const sellerId = req.params.seller_id;
  try {
    const catalog = await Catalog.findOne({ seller: sellerId });
    res.status(200).json(catalog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seller catalog' });
  }
};

// Create an order for a seller
const createOrder = async (req, res) => {
  const buyer = req.user._id; // Assuming you have middleware to decode and verify the JWT token
  const sellerId = req.params.seller_id;
  const { details,products } = req.body;

  try {
    const order = new Order({ buyer, seller: sellerId, details,products });
    await order.save();
    res.status(201).json({ message: 'Order created successfully',order});
  } catch (error) {
    res.status(500).json({ error: 'Failed to create an order' });
  }
};

module.exports = { listSellers, sellerCatalog, createOrder };

