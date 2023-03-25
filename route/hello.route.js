const express = require('express');
const router = express.Router();

const helloController = require('../controller/hello.controller.js');


router.post('/',  helloController.hello);

module.exports = router;