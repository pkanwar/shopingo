const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const orderController = require('../controller/orderController');

router.post('/',auth.authenticate,orderController.createOrder);

module.exports = router;