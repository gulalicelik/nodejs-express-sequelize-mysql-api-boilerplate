const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const routeManager = require('./route/route.manager.js')
const db = require("./models/index");
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

db.sequelize.sync()
    .then(() => {
        console.log("sync db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

routeManager(app)

// error handler
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).json({
        status: 'fail',
        code  : 500,
        error : `Can't find ${err.stack}`
    });
});

// 404 handler
app.use(function (req, res, next) {
    res.status(404).json({
        status: 'fail',
        code  : 404,
        error : `Can't find ${req.originalUrl}`
    });
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`);
});