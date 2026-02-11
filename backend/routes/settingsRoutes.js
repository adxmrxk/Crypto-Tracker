const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/users.js");
const userSettings = require("../models/userSettings.js");

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

router.patch("/api/settings/changeDisplayName/:id", async (req, res) => {
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

router.patch("/api/settings/changeScreenReader/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { screenReaderSupport } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { "settings.screenReaderSupport": screenReaderSupport },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/api/settings/changeAnimations/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { animations } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { "settings.animations": animations },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/api/settings/changePassword/:id", async (req, res) => {
  const userId = req.params.id;
  const bcrypt = require("bcrypt");
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/api/settings/changeTrendingCoins/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { trendingCoins } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { "settings.trendingCoins": trendingCoins },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/api/settings/changeCountry/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { country } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { "settings.country": country },
      { new: true, runValidators: true }
    );

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
    const { currency } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { "settings.currency": currency },
      { new: true, runValidators: true }
    );

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
    const { displayLanguage } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { "settings.displayLanguage": displayLanguage },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Notification Preferences Routes
router.patch("/api/settings/changeNotifyMentions/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { notifyMentions } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { "settings.notifyMentions": notifyMentions },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/api/settings/changeNotifyCoinAlerts/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { notifyCoinAlerts } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { "settings.notifyCoinAlerts": notifyCoinAlerts },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/api/settings/changeNotifyComments/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { notifyComments } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { "settings.notifyComments": notifyComments },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/api/settings/changeNotifyUpvotes/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { notifyUpvotes } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { "settings.notifyUpvotes": notifyUpvotes },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/api/settings/changeNotifyFollowers/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { notifyFollowers } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { "settings.notifyFollowers": notifyFollowers },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/api/settings/changeNotifyReplies/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { notifyReplies } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { "settings.notifyReplies": notifyReplies },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
