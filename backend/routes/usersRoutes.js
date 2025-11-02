const express = require('express'); 
const router = express.Router();
const User = require('../models/users.js');
const userSettings = require('../models/userSettings.js');
const countries = require('../enums/countries.js');
const hashPassword = require('../middleware/hashPassword.js');
const { useParams } = require('react-router');

router.get('/api/users/:id', (req, res) => {

})  

router.post('/api/users', hashPassword, async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save(); 
  res.status(201).json(newUser);

})



router.delete('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
})

module.exports = router;