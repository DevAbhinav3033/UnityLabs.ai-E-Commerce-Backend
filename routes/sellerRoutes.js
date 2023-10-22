
const express = require('express');
const router = express.Router();
const { createCatalog, getOrders } = require('../controllers/sellerController');
const { isAuthenticated, restrict } = require('../middleware/auth');




router.use(isAuthenticated,restrict('seller'));



router.post('/create-catalog', createCatalog);
router.get('/orders', getOrders);

module.exports = router;
