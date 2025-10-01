const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/users.js');
const { useParams } = require('react-router');

router.patch('/api/users/:id', async (req, res) => {

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id, req.body, { new: true, runValidators: true}
  )

  res.json(updatedUser);
  
});

module.exports = router;