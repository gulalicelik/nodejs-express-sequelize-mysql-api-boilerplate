const  swaggerJsdoc  = require('swagger-jsdoc');
const  swaggerUi  = require('swagger-ui-express');

const optionsV1 = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My Boilerplate API',
            description: 'nodejs-express-mysql-api-boilerplate API ',
            version: '1.0.0',
        },
    },
    // looks for configuration in specified directories
    apis: ['./route/v1/*.js', './controller/*.js', './middleware/*.js'],
}

const swaggerSpecV1 = swaggerJsdoc(optionsV1)

function swaggerDocs(app, port) {
    console.log(`:::::::::::::::: SWAGGER RUNNING ON ${port}.`)

    // Swagger Page For API V1
    app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecV1))
    // Documentation in JSON format
    app.get('/v1/docs-json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpecV1)
    })

}

module.exports = swaggerDocs