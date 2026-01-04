const mongoose = require("mongoose");
const Joi = require("joi");
const userSettings = require("./userSettings.js");
const userCoinNotifications = require("./userCoinNotifications.js");
const userPosts = require("./userPosts.js");
const userSocials = require("./userSocials.js");

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
      maxlength: 32,
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

    settings: userSettings,

    socials: userSocials,

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

          notifications: userCoinNotifications,
        },
      ],
      default: [],
    },

    transactions: {
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
          dateOfTransaction: {
            type: Date,
            default: Date.now(),
          },

          transactionType: {
            type: String,
          },
        },
      ],
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
