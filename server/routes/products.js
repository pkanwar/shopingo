const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const productController = require('../controller/productController');


router.post('/add',productController.addProduct);

// router.get('/:id',auth.authenticate,productController.getProduct);

router.get('/',productController.getProducts);

router.get('/getFilterMap',productController.getFilterMap);

router.post('/filter',productController.getProductsByFilter);

router.get('/:id',productController.getProduct);




module.exports = router;