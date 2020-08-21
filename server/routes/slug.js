const express = require("express");
const router = new express.Router();
const shortId = require("shortid");
const Slug = require("../models/slug");
const { authorizeToken } = require("../middleware/authorize");
const User = require("../models/user");

router.post("/slug", async (req, res) => {
    const slug = new Slug(req.body);
    if (slug.URL === process.env.URL) {
        res.status(400).send("You can not create a slug with host URL");
    }

    if (!(await authorizeToken(req.header("Authorization")))){
        if (slug.slug){
            res.status(400).send("You need to be logged in to create a named slug");
        }
    } 
    
    if (!slug.slug){
        slug.slug = shortId.generate();
    }

    try {
        await slug.save();
        res.status(201).send({ slug });
    } catch (e) {
        res.status(401);
    }
});

router.get("/slug", async (req, res) => {
    try {
        const slug = await Slug.findSlug(req.body);
        res.redirect(slug.URL);
    } catch (e) {
        throw new Error(e);
    }
});
module.exports = router;
