const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const tokenService = require('./token.service');
const userService = require('./user.service');
const db = require("../models");
const Token = db.token;
const ApiError = require('../utils/ApiError');
const {tokenTypes} = require('../config/token');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return null;
    }
    return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
    const refreshTokenDoc = await Token.findOne({
        where: {
            token      : refreshToken,
            type       : tokenTypes.REFRESH,
            black_listed: false
        }
    });
    if (!refreshTokenDoc) {
        return null;
    }
    await refreshTokenDoc.destroy();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
    try {
        const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
        const user = await userService.getUserById(refreshTokenDoc.user_id);
        if (!user) {
            throw new Error();
        }
        await refreshTokenDoc.destroy();
        return tokenService.generateAuthTokens(user);
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
    try {
        const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
        const user = await userService.getUserById(resetPasswordTokenDoc.user_id);
        if (!user) {
            throw new Error();
        }
        await userService.updateUserById(user.id, {password: newPassword});
        await Token.destroy({where: {user_id: user.id, type: tokenTypes.RESET_PASSWORD}});
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
    }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
    try {
        const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
        const user = await userService.getUserById(verifyEmailTokenDoc.user_id);

        if (!user) {
            throw new Error();
        }
        await Token.destroy({where: {user_id: user.id, type: tokenTypes.VERIFY_EMAIL}});
        await userService.updateUserById(user.id, {active: 1});
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
    }
};

module.exports = {
    loginUserWithEmailAndPassword,
    logout,
    refreshAuth,
    resetPassword,
    verifyEmail,
};
