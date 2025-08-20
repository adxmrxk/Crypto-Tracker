const express = require('express'); 
const router = express.Router();
const User = require('../models/users.js');
const userSettings = require('../models/userSettings.js');
const countries = require('../enums/countries.js');
const validateUsers = require('../middleware/validateUsers.js');

router.get('/api/users/:id', (req, res) => {

})

router.post('/api/users', validateUsers, async (req, res) => {
  console.log('Received user');
  const newUser = new User(req.body);
  await newUser.save(); 
  res.status(201).json(newUser);

})

router.put('/api/users/:id', (req, res) => {

})

router.delete('/api/users/:id', (req, res) => {

})

module.exports = router;