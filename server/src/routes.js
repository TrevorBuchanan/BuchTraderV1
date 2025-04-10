const express = require('express');
const router = express.Router();
const exchangeReqsController = require('./controllers/exchangeReqsController');
const engineController = require('./controllers/engineController');
const v3ReqsController = require('./controllers/v3ReqsController');

// Coinbase Exchange API routes
router.get('/coinbase/products-list', exchangeReqsController.getProductsList);
router.get('/coinbase/product-history', exchangeReqsController.getProductHistory);
router.get('/coinbase/product-stats', exchangeReqsController.getProductStats);

// Coinbase V3 API routes
router.get('/coinbase/product-info', v3ReqsController.getProductInfo);

// Engine API roues
router.post('/engine/step', engineController.makeStep);
router.get('/engine/status', engineController.getStatus);

module.exports = router;