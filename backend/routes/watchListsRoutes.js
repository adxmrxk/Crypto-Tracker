const express = require("express");
const axios = require("axios");
const User = require('../models/users.js');

const router = express.Router();

router.patch("/api/addWatchList/:id", async (req, res) => {
  try {
    const updateBody = { ...req.body };

    const watchListItem = updateBody.$addToSet?.watchList;

    if (
      watchListItem &&
      watchListItem.image &&
      watchListItem.image.startsWith("http")
    ) {
      const response = await axios.get(watchListItem.image, {
        responseType: "arraybuffer",
      });

      const base64 = Buffer.from(response.data, "binary").toString("base64");
      const mimeType = response.headers["content-type"];

      watchListItem.image = `data:${mimeType};base64,${base64}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateBody, 
      { new: true, runValidators: true }
    );

    res.json(updatedUser);
  } catch (err) {
    console.error("Error adding to watchlist:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;