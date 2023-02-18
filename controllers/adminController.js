const models = require('../models/adminSchema')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const adminsignup = async (req, res) => {
    const {name, email, password } = req.body;
    try {
        const existingUser = await models.findOne({
            email: email,
        });
        if (existingUser) {
            return res.status(400).json("User Already Registered");
        }
        const hashedPassword = await bcrypt.hash(password, 11);
        const result = await models.create({
            name:name,
            email: email,
            password: hashedPassword,
        });
        res.status(201).json({ user: result});
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "something went wrong" });
    }
};
const adminlogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await models.findOne({ email: email });
        if (!existingUser) {
            return res.status(500).json({ message: "User not found" });
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(500).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.SECRET_KEY
        );
        res.status(201).json({ user: existingUser, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong" });
    }
};
module.exports = {
    adminlogin,
    adminsignup,
};
