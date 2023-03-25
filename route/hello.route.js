const express = require('express');
const router = express.Router();

const helloController = require('../controller/hello.controller.js');


router.get('/',  helloController.hello);

module.exports = router;