const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(
    {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        from: process.env.EMAIL_FROM,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },

    },
);

// if (process.env.NODE_ENV !== 'test' || process.env.NODE_ENV !== 'development') {
if (process.env.NODE_ENV !== 'test' ) {
    transport
        .verify()
        .then(() => logger.info('Connected to email server'))
        .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}


const sendEmail = async (to, subject, text) => {
    const msg = {from: process.env.EMAIL_FROM, to, subject, text};
    await transport.sendMail(msg);
};

const sendResetPasswordEmail = async (to, token) => {
    const subject = 'Reset password';
    // replace this url with the link to the reset password page of your front-end app
    const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
    const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
    await sendEmail(to, subject, text);
};


const sendVerificationEmail = async (to, token) => {
    const subject = 'Email Verification';
    // replace this url with the link to the email verification page of your front-end app
    const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
    const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
    await sendEmail(to, subject, text);
};

module.exports = {
    transport,
    sendEmail,
    sendResetPasswordEmail,
    sendVerificationEmail,
};
