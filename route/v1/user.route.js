const express = require('express');
const router = express.Router();
const userController = require('../../controller/user.controller.js');
const validator = require('../../middleware/validators.js');
const auth = require("../../middleware/auth");

router.post('/signin', validator.validateSignIn, userController.signIn);
router.post('/signup', validator.validateSignUp, userController.signUp);


router.get('/get-all',auth.checkAuth, userController.getAllUsers);



module.exports = router;