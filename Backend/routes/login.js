const express = require("express")
const User = require("../model/user.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()
const secret = process.env.SECRET
const router = express.Router()



router.post("/register", async (req, res) => {
    let { email, name,password,confirmpassword } = req.body
    if (!name || !email || !password || !confirmpassword) {
        return res.status(400).json({
            "message": "feilds are missing"
        });
    }
    let existingdata = await User.findOne({ email: email })
    if (existingdata) {
        return res.status(400).json({
            "message": "User already Registered"
        });
    }
    if (password != confirmpassword) {
        return res.status(400).json({
            "message": "Password not matching"
        });
    }
    let salt = await bcrypt.genSalt(saltRounds)
    let hashpassword = await bcrypt.hash(password, salt)
    let userdata = new User({
        name: name,
        email: email,
        password: hashpassword
    })

    let result = await User.create(userdata)
    res.status(200).json({
        "status": "success",
        "message": "User registered successfully"
    });

    console.log(result);

})

router.post("/login", async (req, res) => {
    let { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            "message": "feilds are missing"
        });
    }
    let existingdata = await User.findOne({ email: email })
    if (!existingdata) {
        return res.status(400).json({
            "message": "User not Registered"
        });
    }
    let checkpassword = await bcrypt.compare(password, existingdata.password)
    if (checkpassword == false) {
        return res.status(400).json({
            "message": "Incorrect password"
        });
    }
    let token = jwt.sign({ email: email }, secret, { expiresIn: "1hr" })
    console.log(token)
    return res.status(200).json({
        "token": token
    });

})


module.exports = router;