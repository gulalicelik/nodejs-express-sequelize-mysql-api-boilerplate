const express = require('express');
const router = express.Router();
const userController = require('../../controller/user.controller.js');
const auth = require("../../middleware/auth");
const validate = require('../../middleware/validate');
const userValidation = require('../../validations/user.validation');

router
    .route('/')
    .post(auth('manageUsers'),validate(userValidation.createUser) ,userController.signUp)
    .get(auth('getUsers'),validate(userValidation.getUsers) ,userController.getAllUsers);


router
    .route('/:id')
    .get(auth('getUsers'),validate(userValidation.getUser) , userController.getUserById)
    .patch(auth('manageUsers'),validate(userValidation.updateUser) , userController.updateUser)
    .delete(auth('manageUsers'), validate(userValidation.deleteUser) ,userController.deleteUser);




module.exports = router;