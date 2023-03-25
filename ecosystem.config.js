module.exports = {
    apps: [{
        script  : 'app.js',
        watch   : '.',
        env_dev : {
            name        : 'api-boilerplate-development',
            NODE_ENV    : 'development',
            PORT        : 4444,
            TOKEN_SECRET: "Malatya44",

        },
        env_test: {
            name        : "api-boilerplate-test",
            PORT        : 4445,
            NODE_ENV    : "test",
            TOKEN_SECRET: "Malatya44"
        },
        env_prod: {
            name        : "api-boilerplate-prod",
            PORT        : 4446,
            NODE_ENV    : "production",
            TOKEN_SECRET: "Malatya44"
        },
    }],
};