const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const userService = require('./user.service');
const db = require("../models");
const Token = db.token;
const {tokenTypes} = require('../config/token');
const ApiError = require('../utils/ApiError');


const generateToken = (userId, expires, type, secret = process.env.JWT_SECRET) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    };
    return jwt.sign(payload, secret);
};


const saveToken = async (token, userId, expires, type, blacklisted = false) => {
    const tokenDoc = await Token.create({
        token,
        user_id     : userId,
        expire_at   : expires.toDate(),
        type,
        black_listed: blacklisted,
    });

    return tokenDoc;
};


const verifyToken = async (token, type) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const tokenDoc = await Token.findOne({
        where: {
            token,
            type,
            user_id     : payload.sub,
            black_listed: false
        }
    });
    if (!tokenDoc) return null;
    return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {

    const accessTokenExpires = moment().add(process.env.JWT_ACCESS_EXPIRATION_MINUTES, 'minutes');
    const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

    const refreshTokenExpires = moment().add(process.env.JWT_REFRESH_EXPIRATION_DAYS, 'days');
    const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
    await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

    return {
        access : {
            token  : accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token  : refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
};


const generateResetPasswordToken = async (email) => {
    const user = await userService.getUserByEmail(email);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
    }
    const expires = moment().add(process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES, 'minutes');
    const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
    await saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);
    return resetPasswordToken;
};


const generateVerifyEmailToken = async (user) => {
    const expires = moment().add(process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES, 'minutes');
    const verifyEmailToken = generateToken(user.id, expires, tokenTypes.VERIFY_EMAIL);
    await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
    return verifyEmailToken;
};

module.exports = {
    generateToken,
    saveToken,
    verifyToken,
    generateAuthTokens,
    generateResetPasswordToken,
    generateVerifyEmailToken,
};
