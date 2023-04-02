const authService = require("../service/auth.service");
const tokenService = require("../service/token.service");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const userServices = require("../service/user.service");
const emailService = require("../service/email.service");


const login = catchAsync(async (req, res) => {
    const {email, password} = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({user, tokens});
});

const register = catchAsync(async (req, res) => {
    const user = await userServices.createUser(req.body);
    if (user) {
        const tokens = await tokenService.generateAuthTokens(user);
        res.send({user, tokens});
        return;
    }
    res.status(httpStatus.CONFLICT).send({
        "message": "User already exists",
    })

});

const logout = catchAsync(async (req, res) => {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({...tokens});
});


const forgotPassword = catchAsync(async (req, res) => {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
    await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
    res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
    login,
    register,
    logout,
    refreshTokens,
    forgotPassword,
}