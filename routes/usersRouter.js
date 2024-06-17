const express = require('express');
const userModel = require('../models/user-model');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get("/", function (req, res) {
    res.send("hey");
});

router.post("/register", function (req, res) {
    try {
        let { email, password, fullname } = req.body;

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    });
                    let token = jwt.sign({ email, id: user._id }, "secret", { expiresIn: '1h' });
                    res.cookie("token", token);
                    res.send(token);
                }
            })
        })


    }
    catch (err) {
        res.send(err.message);
    }
});

module.exports = router;