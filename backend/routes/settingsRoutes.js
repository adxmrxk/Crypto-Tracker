const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/users.js');
const userSettings = require('../models/userSettings.js');
const { useParams } = require('react-router');

router.patch('/api/settings/changeEmail/:id', async (req, res) => {
    
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true});
    res.json(updatedUser);

})

router.patch('/api/settings/changeUsername/:id', async (req, res) => {
    
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true});
    res.json(updatedUser);

})

router.patch('/api/settings/changeGender/:id', async (req, res) => {
    
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true, runValidators: true});
    res.json(updatedUser);

})

router.put('/api/settings/connectGoogle/:id', async (req, res) => {
    
    const userId = req.params.id;

})

router.put('/api/settings/connectApple/:id', async (req, res) => {

    const userId = req.params.id;

})

router.put('/api/settings/deleteAccount/:id', async (req, res) => {

    const userId = req.params.id;

})

router.put('/api/settings/deleteAccount/:id', async (req, res) => {

    const userId = req.params.id;

})

router.patch('/api/settings/changeCountry/:id', async (req, res) => {

    const userId = req.params.id;
    //const { country } = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true, runValidators: true});

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);

})

module.exports = router;