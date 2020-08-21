const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../server/models/user");
const Slug = require("../../server/models/slug");

const slugOneId = new mongoose.Types.ObjectId();
const slugOne = {
    _id: slugOneId,
    URL: process.env.URL,
    slug: "hsorew3",
};

const slugTwoId = new mongoose.Types.ObjectId();
const slugTwo = {
    _id: slugTwoId,
    URL: "https://www.chess.com/home",
    slug: "chess",
};

const slugThreeId = new mongoose.Types.ObjectId();
const slugThree = {
    _id: slugThreeId,
    URL: "http://www.three.co.uk/",
    slug: "ukphones",
};

const slugFourId = new mongoose.Types.ObjectId();
const slugFour = {
    _id: slugFourId,
    URL: "https://www.zamunda.net/bananas",
    slug: "kher",
};

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    username: "JamesCharles",
    email: "charles_j@something.com",
    password: "#PasW#ord",
    urls: [slugTwoId],
    tokens: [
        {
            token: jwt.sign({ _id: userOneId }, process.env.JWT_KEY),
        },
    ],
};
const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    username: "IvoryGreen",
    email: "green@something.com",
    password: "$OJVDA",
    tokens: [
        {
            token: jwt.sign({ _id: userTwoId }, process.env.JWT_KEY),
        },
    ],
};

const userThreeId = new mongoose.Types.ObjectId();
const userThree = {
    _id: userThreeId,
    username: "ConGrat",
    email: "bay@sg.com",
    password: "$vadf@a",
    tokens: [
        {
            token: jwt.sign({ _id: userThreeId }, process.env.JWT_KEY),
        },
    ],
};
const dumpDatabase = async () => {
    await User.deleteMany();
    await Slug.deleteMany();
};

const loadDatabase = async () => {
    await dumpDatabase();
    await new User(userOne).save();
    await new Slug(slugThree).save();
};

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    userThreeId,
    userThree,
    slugOne,
    slugTwo,
    slugThree,
    slugFourId,
    slugFour,
    loadDatabase,
    dumpDatabase,
};
