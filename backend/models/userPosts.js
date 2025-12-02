const { required } = require("joi");
const mongoose = require("mongoose");

const userPosts = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 128,
    minLength: 5,
  },

  content: {
    type: String,
    required: true,
    maxLength: 750,
  },

  authorUsername: {
    required: true,
    type: String,
    unique: true,
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
        commenterUsername: {
          type: String,
          unique: true,
        },

        content: {
          type: String,
          required: true,
          maxLength: 300,
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
});

module.exports = userPosts;
