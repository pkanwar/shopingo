const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');

router.post('/',cartController.addToCart);
router.get('/items',cartController.getCart);
router.get('/items/:sessionId',cartController.getCartById);
//router.delete('/',cartController.deleteFromCart);

module.exports = router;