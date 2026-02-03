const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET = "simple_secret_key";

/* REGISTER */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    console.log("Register failed: Missing fields", req.body);
    return res.status(400).json({ message: "Missing fields" });
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed });

  res.json({ message: "Registered" });
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", req.body); // Debug log

  const user = await User.findOne({ email });
  if (!user) {
    console.log("Login failed: User not found for email:", email);
    return res.status(400).json({ message: "Invalid login: User not found" });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    console.log("Login failed: Password mismatch for email:", email);
    console.log("Provided password:", password); // REMOVE IN PRODUCTION
    console.log("Stored hash:", user.password); // REMOVE IN PRODUCTION
    return res.status(400).json({ message: "Invalid login: Password mismatch" });
  }

  const token = jwt.sign({ id: user._id }, SECRET);

  res.json({ token, userId: user._id });
});

module.exports = router;
