const mongoose = require('mongoose');
const COUNTRIES = require('../enums/countries.js');
const CURRENCIES = require('../enums/currencies.js');
const DISPLAY_LANGUAGES = require('../enums/displayLanguages.js');
const CONTENT_LANGUAGES = require('../enums/contentLanguages.js');
const FONT_SIZES = require('../enums/fontSizes.js');

const userSettings = new mongoose.Schema({
     connectedWithGoogle: {
            type: Boolean,
            default: false
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

        contentLanguage: {
            type: String,
            default: CONTENT_LANGUAGES.CANADA,
            enum: Object.values(CONTENT_LANGUAGES)
        }, 

        fontSize: {
            type: String,
            default: FONT_SIZES.MD,
            enum: Object.values(FONT_SIZES)
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

        recoveryEmail: {
            type: String,
            minlength: 5,
            maxlength: 254,
            unique: false
        }
});


module.exports = userSettings;
