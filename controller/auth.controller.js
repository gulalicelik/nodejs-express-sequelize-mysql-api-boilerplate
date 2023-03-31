const db = require("../models");
const User = db.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');



const signIn = async (req, res) => {
    // user signin using email and password bcrypt
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});
    if (user) {
        const validPassword = bcrypt.compareSync(password, user.password);
        if (validPassword) {
            // generate jwt token for user
            const token = jwt.sign({
                id      : user.id,
                username: user.username,
                email   : user.email,
            }, process.env.TOKEN_SECRET, {
                expiresIn: '1h'
            });
            logger.info(`User ${user.username} logged in successfully`);
            res.send({
                "status" : "success",
                "message": "User logged in successfully",
                "token"  : token,
                "data"   : user
            })
            return;
        }
    }
    res.send({
        "status" : "error",
        "message": "Invalid email or password",
    })
}


const getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.send({
        "status" : "success",
        "message": "Users fetched successfully",
        "data"   : users
    });
}


module.exports = {
    signIn,
    getAllUsers
}