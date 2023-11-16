const { Router } = require("express");
const User = require("../models/userModel");
const routerAuth = Router();
const bcrypt = require("bcrypt");
const router = require("./uploadroute");
const jwt = require("jsonwebtoken");

routerAuth.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(202).json({ message: "user allready exists" });
    }
    const round = 10;
    const hashedPass = await bcrypt.hash(password, round);
    const newUser = new User({ name, email, password: hashedPass });
    await newUser.save();
    res.status(201).json({ message: "success" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server error" });
  }
});

routerAuth.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(205).json({ message: "user not found" });
    }

    const isValid = await bcrypt.compare(password, existingUser.password);

    if (!isValid) {
      res.status(206).json({ message: "invalid password" });
    }

    const secretKey = process.env.KEY;

    const token = jwt.sign({ email, userId: existingUser._id }, secretKey, {
      expiresIn: "5h",
    });

    res.status(201).json({ message: "success", token });
  } catch (e) {
    console.log(e);
  }
});
module.exports = routerAuth;
