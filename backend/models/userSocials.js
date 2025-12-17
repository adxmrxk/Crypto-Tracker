const { required } = require("joi");
const mongoose = require("mongoose");
const userPosts = require("./userPosts.js");

const userSocials = new mongoose.Schema({
  posts: {
    type: [userPosts],
    default: [],
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
