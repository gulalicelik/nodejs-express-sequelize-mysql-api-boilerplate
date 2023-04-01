const express = require('express');
const router = express.Router();
const authController = require('../../controller/auth.controller.js');
const validator = require('../../middleware/validators.js');

router.post('/login', validator.validateSignIn, authController.login);
router.post('/logout', authController.logout);


module.exports = router;