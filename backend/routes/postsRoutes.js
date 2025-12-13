const express = require("express");
const router = express.Router();
const User = require("../models/users.js");

router.post("/api/posts/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true,
  });
  console.log("Inside of post maker");
  res.json(updatedUser);
});

module.exports = router;
