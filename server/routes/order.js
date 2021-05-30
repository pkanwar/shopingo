const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const orderController = require('../controller/orderController');
const cartController = require('../controller/cartController');


router.get('/',auth.authenticate,cartController.getCart);

router.post('/',auth.authenticate,orderController.createOrder);

router.put('/:id',auth.authenticate,orderController.updateOrder);

module.exports = router;