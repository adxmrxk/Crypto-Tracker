const mongoose = require('mongoose');
const COUNTRIES = require('../enums/countries.js');
const CURRENCIES = require('../enums/currencies.js');
const DISPLAY_LANGUAGES = require('../enums/displayLanguages.js');

const userSettings = new mongoose.Schema({
        connectedWithGoogle: {
            type: Boolean,
            default: false
        },

        googleEmail: {
            type: String,
            default: ""
        },

        connectedWithApple: {
            type: Boolean,
            default: false
        },

        country: {
            type: String,
            default: COUNTRIES.CANADA,
            enum: Object.values(COUNTRIES)
        },

        currency: {
            type: String,
            default: CURRENCIES.CANADA,
            enum: Object.values(CURRENCIES)
        },

        displayLanguage: {
            type: String,
            default: DISPLAY_LANGUAGES.CANADA,
            enum: Object.values(DISPLAY_LANGUAGES)
        },

        screenReaderSupport: {
            type: Boolean,
            default: false
        },

        darkMode: {
            type: Boolean,
            default: false
        },

        animations: {
            type: Boolean,
            default: true
        },

        twoFactorAuthentication: {
            type: Boolean,
            default: false
        },

        loginAlerts: {
            type: Boolean,
            default: true
        },

        directMessages: {
            type: Boolean,
            default: true
        },

        trendingCoins: {
            type: Boolean,
            default: true
        },

        recoveryEmail: {
            type: String,
            minlength: 5,
            maxlength: 254,
            unique: false
        },

        // Notification Preferences
        notifyMentions: {
            type: Boolean,
            default: true
        },

        notifyCoinAlerts: {
            type: Boolean,
            default: true
        },

        notifyComments: {
            type: Boolean,
            default: true
        },

        notifyUpvotes: {
            type: Boolean,
            default: true
        },

        notifyFollowers: {
            type: Boolean,
            default: true
        },

        notifyReplies: {
            type: Boolean,
            default: true
        }
});


module.exports = userSettings;
