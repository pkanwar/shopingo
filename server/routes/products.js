const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const productController = require('../controller/productController');


router.post('/add',auth.authenticate,productController.addProduct);

router.get('/:id',auth.authenticate,productController.getProduct);

router.get('/',productController.getProducts);

module.exports = router;