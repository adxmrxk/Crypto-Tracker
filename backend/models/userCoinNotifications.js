const mongoose = require('mongoose');

const userCoinNotifications = new mongoose.Schema({

    enabled: {
        type: Boolean,
        default: true
    },

    alertType: {
        type: String,
        enum: ['Increasing', 'Decreasing'],
        default: 'Increasing'
    },

    alertFormat: {
        type: String,
        enum: ['Price', 'Percent'],
        default: 'Percent'
    }

})

module.exports = userCoinNotifications;
