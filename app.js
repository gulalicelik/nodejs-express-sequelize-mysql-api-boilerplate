const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const routeManager = require('./route/route.manager.js')
const db = require("./models/index");
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerDocs = require('./swagger.js')
const passport = require('passport');
const { jwtStrategy } = require('./config/passport');
const helmet = require('helmet');
const xss = require('xss-clean');

// set security HTTP headers
app.use(helmet());
app.use(xss());

app.use(express.json())
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

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

routeManager(app)
swaggerDocs(app, process.env.PORT)

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
    console.log(`:::::::::::::::: SERVER RUNNING ON ${process.env.PORT}.`);
});