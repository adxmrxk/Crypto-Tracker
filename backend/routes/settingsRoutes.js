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

router.patch("/api/settings/connectGoogle/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { googleEmail, connectedWithGoogle } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        "settings.connectedWithGoogle": connectedWithGoogle,
        "settings.googleEmail": googleEmail,
      },
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

router.patch("/api/settings/changeFontSize/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { fontSize } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { "settings.fontSize": fontSize },
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

router.patch("/api/settings/changeContentLanguage/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { contentLanguage } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { "settings.contentLanguage": contentLanguage },
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

router.patch("/api/settings/changeTwoFactor/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { twoFactorAuthentication } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { "settings.twoFactorAuthentication": twoFactorAuthentication },
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

router.patch("/api/settings/changeLoginAlerts/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { loginAlerts } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { "settings.loginAlerts": loginAlerts },
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

router.patch("/api/settings/changeDirectMessages/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { directMessages } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { "settings.directMessages": directMessages },
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

router.patch("/api/settings/changeRecoveryEmail/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { recoveryEmail } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { "settings.recoveryEmail": recoveryEmail },
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
