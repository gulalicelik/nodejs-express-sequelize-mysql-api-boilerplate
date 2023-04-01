const db = require("../models");
const User = db.user;
const userServices = require("../service/user.service");
const httpStatus = require("http-status");


const signUp = async (req, res) => {
    const user = await userServices.createUser(req.body);
    if (user) {
        res.send({user});
        return;
    }
    res.status(httpStatus.CONFLICT).send({
        "message": "User already exists",
    })
}

const getUserById = async (req, res) => {
    const user = await userServices.getUserById(req.params.id);
    if (!user) {
        res.send({
            "message": "User not found",
        })
        return;
    }
    res.send({user});
}
const updateUser = async (req, res) => {
    const row = await userServices.updateUserById(req.params.id, req.body);
    if (!row) {
        res.send({
            "message": "User not found",
        })
        return;
    }

    res.send(await userServices.getUserById(req.params.id));
}
const deleteUser = async (req, res) => {
    const deleted = await userServices.deleteUserById(req.params.id);
    if (!deleted) {
        res.send({
            "message": "User not found",
        })
    }
    res.status(httpStatus.NO_CONTENT).send();
}

const getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.send({users});
}


module.exports = {
    signUp,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers

}