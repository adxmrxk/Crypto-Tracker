const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/users.js');
const { useParams } = require('react-router');

router.get('/api/serverList/:id', (req, res) => {

    
    
})

router.patch('/api/addServer/:id', async (req, res) => {
    const userId = req.params.id; 
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true } );
    res.json(updatedUser);

})


module.exports = router;

