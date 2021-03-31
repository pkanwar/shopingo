const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cartController = require('../controller/cartController');

router.post('/',cartController.addToCart);
router.delete('/',cartController.deleteFromCart);

module.exports = router;