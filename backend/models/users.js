const mongoose = require('mongoose');
const Joi = require('joi');
const userSettings = require('./userSettings.js');
const userCoinNotifications = require('./userCoinNotifications.js');

const User = mongoose.model('User', new mongoose.Schema({

    
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
        unique: true
        
    },

    gender: {
        type: String,
        minlength: 4,
        maxlength: 12,
        default: null
    },

    settings: userSettings,

    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true


    },

    watchList: {
        type: [
            {
                coin: {
                type: String
                },

                amount: {
                    type: Number
                },

                ticker: {
                    type: String
                },

                notifications: userCoinNotifications,

         }],
        default: []
    },

    serverList: {
        type: [String],
        default: []
    },

    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 64,
    }


 }));

module.exports = User;
