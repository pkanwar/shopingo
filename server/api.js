const express = require('express');
const router = express.Router();
const users = require('./routes/users');
const sessions = require('./routes/sessions');
const products = require('./routes/products');
const category = require('./routes/category');
const cart = require('./routes/cart');

// Add json and urlencoded middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/users', users);
router.use('/sessions', sessions);
router.use('/products', products);
router.use('/category', category);
router.use('/cart', cart);

module.exports = router;