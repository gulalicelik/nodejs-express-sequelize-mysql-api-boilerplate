const userRoute = require('./user.route');
const helloRoute = require('./hello.route');

const routeManager = (app) => {
    app.use('/', helloRoute);
    app.use('/user', userRoute);

}

module.exports = routeManager;