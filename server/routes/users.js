const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controller/userController');

router.post('/',userController.addUser);

router.put('/me',auth.authenticate,userController.updateUser);

router.get('/me',auth.authenticate,userController.getUserInfo);

router.delete('/me',auth.authenticate,userController.deleteUser);

module.exports = router;