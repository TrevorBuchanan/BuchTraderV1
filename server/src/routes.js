const express = require('express');
const router = express.Router();
const exchangeReqsController = require('./controllers/exchangeReqsController');

// Coinbase API routes
router.get('/coinbase/products-list', exchangeReqsController.getProductsList);
router.get('/coinbase/product-history', exchangeReqsController.getProductHistory);
router.get('/coinbase/product-info', exchangeReqsController.getProductInfo);

module.exports = router;