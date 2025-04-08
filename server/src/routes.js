const express = require('express');
const router = express.Router();
const exchangeReqsController = require('./controllers/exchangeReqsController');

// Coinbase API routes
router.get('/coinbase/assets-list', exchangeReqsController.getAssetsList);

module.exports = router;