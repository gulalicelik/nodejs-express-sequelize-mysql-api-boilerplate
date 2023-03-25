const winston = require('winston');

const logConfiguration = {

    format: winston.format.combine(
        winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'logs/error/error.log', level: 'error'}),
        new winston.transports.File({filename: 'logs/activity/activity.log', level:'info'})
    ],
};

const logger = winston.createLogger(logConfiguration);



module.exports = logger;