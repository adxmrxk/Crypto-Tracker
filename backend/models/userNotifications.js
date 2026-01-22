const mongoose = require("mongoose");

const userNotifications = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  type: {
    type: String,
    enum: [
      "follow",
      "comment",
      "reply",
      "upvote",
      "mention",
      "coin_alert",
      "trending",
    ],
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  // Who triggered the notification (if applicable)
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  fromUsername: {
    type: String,
  },

  fromProfilePicture: {
    type: String,
  },

  // Related content (post, comment, coin, etc.)
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
  },

  relatedType: {
    type: String,
    enum: ["post", "comment", "coin", "user"],
  },

  read: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
userNotifications.index({ userId: 1, createdAt: -1 });
userNotifications.index({ userId: 1, read: 1 });

const Notification = mongoose.model("Notification", userNotifications);

module.exports = Notification;
