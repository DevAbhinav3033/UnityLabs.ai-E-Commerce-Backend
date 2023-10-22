// routes/buyerRoutes.js
const {isAuthenticated, restrict} =require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { listSellers, sellerCatalog, createOrder } = require('../controllers/buyerController');



router.get('/list-of-sellers', listSellers);
router.get('/seller-catalog/:seller_id', sellerCatalog);
router.post('/create-order/:seller_id',isAuthenticated ,restrict('buyer'),createOrder);

module.exports = router;
