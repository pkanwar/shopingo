const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const sessionController = require('../controller/sessionController');

router.post('/',sessionController.loginUser);

router.delete('/me',auth.authenticate,sessionController.logoutUser);

module.exports = router;