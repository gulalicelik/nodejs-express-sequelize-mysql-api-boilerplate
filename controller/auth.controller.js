
const authService = require("../service/auth.service");
const tokenService = require("../service/token.service");


const signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
}


module.exports = {
    signIn,
}