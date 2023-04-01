const express = require('express');
const router = express.Router();
const userController = require('../../controller/user.controller.js');
const auth = require("../../middleware/auth");
const validator = require("../../middleware/validators");

router
    .route('/')
    .post(auth('manageUsers'),validator.validateSignUp, userController.signUp)
    .get(auth('getUsers'),userController.getAllUsers);


router
    .route('/:id')
    .get(auth('getUsers'), userController.getUserById)
    .patch(auth('manageUsers'), userController.updateUser)
    .delete(auth('manageUsers'), userController.deleteUser);




module.exports = router;