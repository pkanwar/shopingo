const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const categoryController = require('../controller/categoryController');

router.post('/',auth.authenticate,categoryController.addCategory);
router.get('/',auth.authenticate,categoryController.getCategories);

module.exports = router;