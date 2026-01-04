const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const userSettings = require("../models/userSettings.js");
const countries = require("../enums/countries.js");
const hashPassword = require("../middleware/hashPassword.js");
const { useParams } = require("react-router");

router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.post("/api/users", hashPassword, async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
});

router.delete("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
});

module.exports = router;
