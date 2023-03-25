const userRoute = require('./user.route');
const helloRoute = require('./hello.route');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.js');


const routeManager = (app) => {
    app.use('/', helloRoute);
    app.use('/user', userRoute);

}

module.exports = routeManager;