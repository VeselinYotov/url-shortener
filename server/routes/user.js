const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const { authorize }  = require("../middleware/authorize");

router.post("/user", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = user.generateJWT();

        res.status(201).send({ user, token });
    } catch (e) {
        res.status(404);
        throw new Error(e);
    }
});

router.post("/user/login", async (req, res) => {
    const userInfo = req.body;

    try {
        const user = await User.findUser(userInfo.email, userInfo.password);
        const token = await user.generateJWT();

        res.send({ user, token });
    } catch (e) {
        res.send(404);
    }
});

router.post("/user/logout", authorize, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.get("/user/me", authorize, async (req, res) => {
    try {
        res.status(200).send(req.body);
    } catch (e) {
        res.status(400);
    }
});

module.exports = router;
