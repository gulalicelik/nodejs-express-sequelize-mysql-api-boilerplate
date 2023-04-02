module.exports = {
    apps: [{
        script  : 'app.js',
        watch   : '.',
        env_dev : {
            name                                 : 'api-boilerplate-development',
            NODE_ENV                             : 'development',
            PORT                                 : 4444,
            JWT_SECRET                           : "Malatya44",
            JWT_ACCESS_EXPIRATION_MINUTES        : 44,
            JWT_REFRESH_EXPIRATION_DAYS          : 1,
            JWT_RESET_PASSWORD_EXPIRATION_MINUTES: 44,
            JWT_VERIFY_EMAIL_EXPIRATION_MINUTES  : 44,
            SMTP_HOST                            : '',
            SMTP_PORT                            : 587,
            SMTP_USERNAME                        : '',
            SMTP_PASSWORD                        : '',
            EMAIL_FROM                           : '',
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