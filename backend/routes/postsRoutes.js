const express = require("express");
const router = express.Router();
const User = require("../models/users.js");

// Shuffle array helper function (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get all posts from all users for the explore feed (randomized)
router.get("/api/posts", async (req, res) => {
  try {
    const users = await User.find({ "socials.posts": { $exists: true, $ne: [] } });

    // Flatten all posts from all users and add user info to each post
    const allPosts = [];

    users.forEach((user) => {
      if (user.socials?.posts) {
        user.socials.posts.forEach((post) => {
          allPosts.push({
            _id: post._id,
            content: post.content,
            author: post.author,
            media: post.media,
            datePosted: post.datePosted,
            likes: post.likes,
            dislikes: post.dislikes,
            comments: post.comments,
            // Add user info
            userId: user._id,
            displayName: user.displayName,
            username: user.username,
            profilePicture: user.profilePicture,
          });
        });
      }
    });

    // Randomize the posts for explore feed
    const randomizedPosts = shuffleArray(allPosts);

    return res.status(200).json(randomizedPosts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Create a new post for a user
router.post("/api/posts/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true,
  });
  res.json(updatedUser);
});

// Like a post
router.patch("/api/posts/:userId/:postId/like", async (req, res) => {
  try {
    const { userId, postId } = req.params;

    const user = await User.findOneAndUpdate(
      { _id: userId, "socials.posts._id": postId },
      { $inc: { "socials.posts.$.likes": 1 } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "Post not found" });
    }

    const updatedPost = user.socials.posts.find(p => p._id.toString() === postId);
    return res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to like post" });
  }
});

// Dislike a post
router.patch("/api/posts/:userId/:postId/dislike", async (req, res) => {
  try {
    const { userId, postId } = req.params;

    const user = await User.findOneAndUpdate(
      { _id: userId, "socials.posts._id": postId },
      { $inc: { "socials.posts.$.dislikes": 1 } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "Post not found" });
    }

    const updatedPost = user.socials.posts.find(p => p._id.toString() === postId);
    return res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to dislike post" });
  }
});

// Add a comment to a post
router.post("/api/posts/:userId/:postId/comment", async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const { author, content } = req.body;

    const user = await User.findOneAndUpdate(
      { _id: userId, "socials.posts._id": postId },
      {
        $push: {
          "socials.posts.$.comments": {
            author,
            content,
            datePosted: new Date(),
          },
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "Post not found" });
    }

    const updatedPost = user.socials.posts.find(p => p._id.toString() === postId);
    return res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to add comment" });
  }
});

module.exports = router;
