const express = require('express');
const Joi = require('joi');

function validateUser(user) {

    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        

    });
}           


module.exports = validateUser;