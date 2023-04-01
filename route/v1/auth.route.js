const express = require('express');
const router = express.Router();
const authController = require('../../controller/auth.controller.js');
const validate = require('../../middleware/validate');
const authValidation = require('../../validations/auth.validation');


router.post('/login', validate(authValidation.login), authController.login);
router.post('/register', validate(authValidation.register), authController.register);
router.post('/logout', validate(authValidation.logout), authController.logout);


module.exports = router;