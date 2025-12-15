const express = require("express");
const router = express.Router();
const User = require("../models/users.js");

/* router.get("/api/allPosts"),
  async (req, res) => {
    return null;
  };

*/
router.post("/api/posts/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true,
  });
  res.json(updatedUser);
});

module.exports = router;
