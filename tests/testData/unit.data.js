const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const validUserId = new mongoose.Types.ObjectId();
const validUser = {
    _id: validUserId,
    username: "FunShoy",
    email: "fs@g.com",
    password: "$ASD#@",
    tokens: [
        {
            token: jwt.sign({ _id: validUserId }, process.env.JWT_KEY),
        },
    ],
};

const UserWithInvalidEmailId = new mongoose.Types.ObjectId();
const UserWithInvalidEmail = {
    _id: UserWithInvalidEmailId,
    username: "FunSoy",
    email: "fg",
    password: "$ASD#@",
    tokens: [
        {
            token: jwt.sign({ _id: UserWithInvalidEmailId }, process.env.JWT_KEY),
        },
    ],
};
module.exports = {
    validUser,
    validUserId,
    UserWithInvalidEmailId,
    UserWithInvalidEmail
}