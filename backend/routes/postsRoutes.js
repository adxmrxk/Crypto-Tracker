const express = require("express");
const router = express.Router();
const User = require("../models/users.js");

router.get("/api/posts/:id", (req, res) => {
  return res.send("Get post by id");
});

router.post("/api/posts", async (req, res) => {
  return null;
});

module.exports = router;
