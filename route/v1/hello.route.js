const express = require('express');
const router = express.Router();

const helloController = require('../../controller/hello.controller.js');

/**
 * @openapi
 * /:
 *  get:
 *     tags:
 *     - hello
 *     description: API is running
 *     responses:
 *       200:
 *         description: API is running
 */
router.get('/',  helloController.hello);

module.exports = router;