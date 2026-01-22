const express = require("express");
const router = express.Router();
const Notification = require("../models/userNotifications.js");
const User = require("../models/users.js");

// Get all notifications for a user
router.get("/api/notifications/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

// Get unread notification count
router.get("/api/notifications/unread/:userId", async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      userId: req.params.userId,
      read: false,
    });
    res.json({ unreadCount: count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch unread count" });
  }
});

// Create a notification
router.post("/api/notifications", async (req, res) => {
  try {
    const {
      userId,
      type,
      title,
      message,
      fromUserId,
      relatedId,
      relatedType,
    } = req.body;

    // Get the user who triggered the notification (if applicable)
    let fromUser = null;
    if (fromUserId) {
      fromUser = await User.findById(fromUserId);
    }

    // Check user's notification preferences
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user has this notification type enabled
    const settings = targetUser.settings || {};
    let shouldNotify = true;

    switch (type) {
      case "follow":
        shouldNotify = settings.notifyFollowers !== false;
        break;
      case "comment":
        shouldNotify = settings.notifyComments !== false;
        break;
      case "reply":
        shouldNotify = settings.notifyReplies !== false;
        break;
      case "upvote":
        shouldNotify = settings.notifyUpvotes !== false;
        break;
      case "mention":
        shouldNotify = settings.notifyMentions !== false;
        break;
      case "coin_alert":
        shouldNotify = settings.notifyCoinAlerts !== false;
        break;
      case "trending":
        shouldNotify = settings.trendingCoins !== false;
        break;
    }

    if (!shouldNotify) {
      return res.json({ message: "Notification skipped due to user preferences" });
    }

    const notification = new Notification({
      userId,
      type,
      title,
      message,
      fromUser: fromUserId || null,
      fromUsername: fromUser?.username || null,
      fromProfilePicture: fromUser?.profilePicture || null,
      relatedId: relatedId || null,
      relatedType: relatedType || null,
    });

    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Failed to create notification" });
  }
});

// Mark a single notification as read
router.patch("/api/notifications/read/:notificationId", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.notificationId,
      { read: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: "Failed to mark notification as read" });
  }
});

// Mark all notifications as read for a user
router.patch("/api/notifications/readAll/:userId", async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.params.userId, read: false },
      { read: true }
    );
    res.json({ message: "All notifications marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark notifications as read" });
  }
});

// Delete a notification
router.delete("/api/notifications/:notificationId", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(
      req.params.notificationId
    );
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.json({ message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete notification" });
  }
});

// Delete all notifications for a user
router.delete("/api/notifications/all/:userId", async (req, res) => {
  try {
    await Notification.deleteMany({ userId: req.params.userId });
    res.json({ message: "All notifications deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete notifications" });
  }
});

module.exports = router;
