const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const userSettings = require("../models/userSettings.js");
const countries = require("../enums/countries.js");
const hashPassword = require("../middleware/hashPassword.js");
const bcrypt = require("bcrypt");

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

// Get user by ID (for session restore)
router.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Login route
router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Return user data
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: "Login failed" });
  }
});

router.post("/api/users", hashPassword, async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
});

router.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete account" });
  }
});

router.patch("/api/usersProfile/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

// Follow/Unfollow a user
router.patch("/api/follow/:id", async (req, res) => {
  const currentUserId = req.params.id;
  const { targetUserId } = req.body;

  try {
    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFollowing = currentUser.socials.following.some(
      (id) => id.toString() === targetUserId.toString()
    );

    if (isFollowing) {
      // Unfollow
      currentUser.socials.following = currentUser.socials.following.filter(
        (id) => id.toString() !== targetUserId.toString()
      );
      targetUser.socials.followers = targetUser.socials.followers.filter(
        (id) => id.toString() !== currentUserId.toString()
      );
    } else {
      // Follow
      currentUser.socials.following.push(targetUserId);
      targetUser.socials.followers.push(currentUserId);
    }

    await currentUser.save();
    await targetUser.save();

    res.json(currentUser);
  } catch (error) {
    console.error("Follow/Unfollow error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
