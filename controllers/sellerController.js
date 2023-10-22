const Catalog = require('../models/catalog');
const Order = require('../models/order');

// Create a catalog for a seller
const createCatalog = async (req, res) => {
  const seller = req.user._id; // Assuming you have middleware to decode and verify the JWT token
  const { products } = req.body;

  try {
    const catalog = new Catalog({ seller, products });
    await catalog.save();
    res.status(201).json({ message: 'Catalog created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a catalog' });
  }
};

// Retrieve the list of orders received by a seller
const getOrders = async (req, res) => {
  const seller = req.user._id; // Assuming you have middleware to decode and verify the JWT token
  try {
    const orders = await Order.find({ seller });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

module.exports = { createCatalog, getOrders };

