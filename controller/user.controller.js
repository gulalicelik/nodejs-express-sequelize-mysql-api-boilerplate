const db = require("../models");
const bcrypt = require("bcrypt");
const User = db.user;


const signUp = async (req, res) => {
    // user signup using email and password bcrypt
    const {firstname, lastname, username, email, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = {
        firstname,
        lastname,
        username,
        email,
        password: hash
    }

    const [row, created] = await User.findOrCreate({
        where   : {email: user.email},
        defaults: user,
    });
    if (created) {
        res.send({
            "status" : "success",
            "message": "User created successfully",
            data     : row
        })
        return;
    }
    res.send({
        "status" : "error",
        "message": "User already exists",
        "email"  : row.email,
    })
}

const getUserById = async (req, res) => {
    const {userId} = req.params;
    const user = await User.findOne({where: {userId}});
    if (user) {
        res.send({
            "status" : "success",
            "message": "User fetched successfully",
            "data"   : user
        })
        return;
    }
    res.send({
        "status" : "error",
        "message": "User not found",
    })
}
const updateUserById = async (req, res) => {
    const {userId} = req.params;
    const {firstname, lastname, username, email, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = {
        firstname,
        lastname,
        username,
        email,
        password: hash
    }
    const [row, created] = await User.update(user, {
        where: {userId},
    });
    if (row) {
        res.send({
            "status" : "success",
            "message": "User updated successfully",
            "data"   : row
        })
        return;
    }
    res.send({
        "status" : "error",
        "message": "User not found",
    })
}
const deleteUserById = async (req, res) => {
    const {userId} = req.params;
    const user = await User.destroy({where: {userId}});
    if (user) {
        res.send({
            "status" : "success",
            "message": "User deleted successfully",
            "data"   : user
        })
        return;
    }
    res.send({
        "status" : "error",
        "message": "User not found",
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
    signUp,
    getUserById,
    updateUserById,
    deleteUserById,
    getAllUsers

}