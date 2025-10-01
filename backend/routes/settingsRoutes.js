const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/users.js');
const userSettings = require('../models/userSettings.js');
const { useParams } = require('react-router');

router.put('/api/settings/connectGoogle/:id', async (req, res) => {
    
    const userId = req.params.id;

})

router.put('/api/settings/connectApple/:id', async (req, res) => {

    const userId = req.params.id;

})

module.exports = router;