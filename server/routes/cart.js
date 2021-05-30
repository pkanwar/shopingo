const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cartController = require('../controller/cartController');

router.post('/',cartController.addToCart);
router.post('/updateCart',auth.authenticate,cartController.updateToCart);
router.get('/items',cartController.getCart);
router.get('/items/:sessionId',cartController.getCartById);
router.get('/itemPresent/:itemId',cartController.isItemPresent);
router.delete('/',cartController.deleteFromCart);

module.exports = router;