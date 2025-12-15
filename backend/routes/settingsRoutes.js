const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/users.js");
const userSettings = require("../models/userSettings.js");
const { useParams } = require("react-router");

router.patch("/api/settings/changeEmail/:id", async (req, res) => {
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

router.patch("/api/settings/changeUsername/:id", async (req, res) => {
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

router.patch("/api/settings/changeProfilePicture/:id", async (req, res) => {
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

router.patch("/api/settings/changeGender/:id", async (req, res) => {
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

router.put("/api/settings/connectGoogle/:id", async (req, res) => {
  const userId = req.params.id;
});

router.put("/api/settings/deleteAccount/:id", async (req, res) => {
  const userId = req.params.id;
});

router.patch("/api/settings/changeCountry/:id", async (req, res) => {
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

router.patch("/api/settings/changeCurrency/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/api/settings/changeDisplayLanguage/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
