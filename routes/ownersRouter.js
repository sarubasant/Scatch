const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");

if (process.env.NODE_ENV === "development") {
    router.post("/create", async function (req, res) {
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res
                .status(503)
                .send('You dont have permission to create owner.');
        }
        let { fullname, email, password } = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.status(201).send(createdOwner);
    });
}

router.get("/", function (req, res) {
    res.send("hey from owner page");
});


module.exports = router;