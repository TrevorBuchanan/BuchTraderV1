const express = require('express');
const router = express.Router();
const exchangeReqsController = require('./controllers/exchangeReqsController');
const engineController = require('./controllers/engineController')

// Coinbase API routes
router.get('/coinbase/products-list', exchangeReqsController.getProductsList);
router.get('/coinbase/product-history', exchangeReqsController.getProductHistory);
router.get('/coinbase/product-info', exchangeReqsController.getProductInfo);

// Engine API roues
router.post('/engine/step', engineController.makeStep);
router.get('/engine/status', engineController.getStatus);

module.exports = router;