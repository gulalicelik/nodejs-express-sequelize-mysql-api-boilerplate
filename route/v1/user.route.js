const express = require('express');
const router = express.Router();
const userController = require('../../controller/user.controller.js');
const auth = require("../../middleware/auth");
const validator = require("../../middleware/validators");

// TODO : Add validation

router
    .route('/')
    .post(validator.validateSignUp, userController.signUp)
    .get(auth.checkAuth, userController.getAllUsers);


router
    .route('/:userId')
    .get(auth.checkAuth, userController.getUserById)
    .patch(auth.checkAuth, userController.updateUserById)
    .delete(auth.checkAuth, userController.deleteUserById);




module.exports = router;