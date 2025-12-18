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
      },
    ],
  },

  following: {
    type: Number,
    default: 0,
  },

  followers: {
    type: Number,
    default: 0,
  },

  blockList: {
    type: [String],
    default: [],
  },
});

module.exports = userSocials;
