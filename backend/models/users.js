const mongoose = require("mongoose");
const Joi = require("joi");
const userSettings = require("./userSettings.js");
const userCoinNotifications = require("./userCoinNotifications.js");
const userPosts = require("./userPosts.js");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 254,
    },

    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 64,
      unique: true,
    },

    displayName: {
      type: String,
      minlength: 5,
      maxlength: 32,
      default: function () {
        return this.username;
      },
    },

    gender: {
      type: String,
      minlength: 4,
      maxlength: 32,
      default: null,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    followers: {
      type: Number,
      default: 0,
    },

    following: {
      type: Number,
      default: 0,
    },

    settings: userSettings,

    posts: {
      type: [userPosts],
      default: [],
    },

    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },

    watchList: {
      type: [
        {
          coin: {
            type: String,
          },

          amount: {
            type: Number,
          },

          ticker: {
            type: String,
          },

          image: {
            type: String,
          },

          dateAdded: {
            type: Date,
            default: Date.now(),
          },

          notifications: userCoinNotifications,
        },
      ],
      default: [],
    },

    serverList: {
      type: [String],
      default: [],
    },

    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 64,
    },
  })
);

module.exports = User;
