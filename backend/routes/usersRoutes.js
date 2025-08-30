const express = require('express'); 
const router = express.Router();
const User = require('../models/users.js');
const userSettings = require('../models/userSettings.js');
const countries = require('../enums/countries.js');
const validateUser = require('../middleware/validateUser.js');
const hashPassword = require('../middleware/hashPassword.js');
const { useParams } = require('react-router');

router.get('/api/users/:id', (req, res) => {

})  

router.post('/api/users', hashPassword, async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save(); 
  res.status(201).json(newUser);

})

router.patch('/api/users/:id', async (req, res) => {

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id, req.body, { new: true, runValidators: true}
  )

  res.json(updatedUser);
  
});

router.delete('/api/users/:id', (req, res) => {

})

module.exports = router;