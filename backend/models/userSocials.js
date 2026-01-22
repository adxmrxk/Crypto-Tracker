const { required } = require("joi");
const mongoose = require("mongoose");
const userPosts = require("./userPosts.js");

const userSocials = new mongoose.Schema({
  posts: {
    type: [userPosts],
    default: [],
  },

  comments: {
    type: [
      {
        author: {
          type: String,
          default: function () {
            return this.username;
          },
        },

        content: {
          type: String,
          required: true,
          maxLenth: 250,
        },

        likes: {
          type: Number,
          default: 0,
        },
        dislikes: {
          type: Number,
          default: 0,
        },
        datePosted: {
          type: Date,
          default: Date.now,
        },
        postId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        postOwnerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },

  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },

  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },

  blockList: {
    type: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        username: {
          type: String,
        },
        displayName: {
          type: String,
        },
        profilePicture: {
          type: String,
          default: "",
        },
        blockedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [],
  },

  likedPosts: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },

  dislikedPosts: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
});

module.exports = userSocials;
