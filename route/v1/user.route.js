const express = require('express');
const router = express.Router();
const userController = require('../../controller/user.controller.js');
const auth = require("../../middleware/auth");
const validator = require("../../middleware/validators");

// TODO : Add validation

router
    .route('/')
    .post(validator.validateSignUp, userController.signUp)
    .get(userController.getAllUsers);


router
    .route('/:id')
    .get(auth('getUsers'), userController.getUserById)
    .patch( userController.updateUser)
    .delete(userController.deleteUser);




module.exports = router;