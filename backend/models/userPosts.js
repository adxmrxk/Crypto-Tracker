const { required } = require("joi");
const mongoose = require("mongoose");

const userPosts = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxLength: 1000,
  },

  author: {
    required: true,
    type: String,
  },

  media: {
    type: String,
    default: "",
  },

  datePosted: {
    type: Date,
    default: Date.now,
  },

  likes: {
    type: Number,
    default: 0,
  },

  dislikes: {
    type: Number,
    default: 0,
  },

  comments: {
    type: [
      {
        author: {
          type: String,
          required: true,
        },

        content: {
          type: String,
          required: true,
          maxLength: 250,
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
    default: [],
  },
});

module.exports = userPosts;
