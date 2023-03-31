const express = require('express');
const router = express.Router();
const authController = require('../../controller/auth.controller.js');
const validator = require('../../middleware/validators.js');

router.post('/signin', validator.validateSignIn, authController.signIn);


module.exports = router;