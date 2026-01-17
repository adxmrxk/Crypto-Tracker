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
    const { currentUserId } = req.body;

    // Check if user already liked this post
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res.status(404).json({ error: "Current user not found" });
    }

    const alreadyLiked = currentUser.socials.likedPosts.some(
      (id) => id.toString() === postId
    );
    const alreadyDisliked = currentUser.socials.dislikedPosts.some(
      (id) => id.toString() === postId
    );

    if (alreadyLiked) {
      return res.status(400).json({ error: "Already liked this post" });
    }

    // If previously disliked, remove dislike and decrement dislike count
    if (alreadyDisliked) {
      await User.findOneAndUpdate(
        { _id: userId, "socials.posts._id": postId },
        { $inc: { "socials.posts.$.dislikes": -1 } }
      );
      currentUser.socials.dislikedPosts = currentUser.socials.dislikedPosts.filter(
        (id) => id.toString() !== postId
      );
    }

    // Increment like count on the post
    const postOwner = await User.findOneAndUpdate(
      { _id: userId, "socials.posts._id": postId },
      { $inc: { "socials.posts.$.likes": 1 } },
      { new: true }
    );

    if (!postOwner) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Add post to current user's likedPosts
    currentUser.socials.likedPosts.push(postId);
    await currentUser.save();

    const updatedPost = postOwner.socials.posts.find(p => p._id.toString() === postId);
    return res.status(200).json({ post: updatedPost, currentUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to like post" });
  }
});

// Dislike a post
router.patch("/api/posts/:userId/:postId/dislike", async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const { currentUserId } = req.body;

    // Check if user already disliked this post
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res.status(404).json({ error: "Current user not found" });
    }

    const alreadyDisliked = currentUser.socials.dislikedPosts.some(
      (id) => id.toString() === postId
    );
    const alreadyLiked = currentUser.socials.likedPosts.some(
      (id) => id.toString() === postId
    );

    if (alreadyDisliked) {
      return res.status(400).json({ error: "Already disliked this post" });
    }

    // If previously liked, remove like and decrement like count
    if (alreadyLiked) {
      await User.findOneAndUpdate(
        { _id: userId, "socials.posts._id": postId },
        { $inc: { "socials.posts.$.likes": -1 } }
      );
      currentUser.socials.likedPosts = currentUser.socials.likedPosts.filter(
        (id) => id.toString() !== postId
      );
    }

    // Increment dislike count on the post
    const postOwner = await User.findOneAndUpdate(
      { _id: userId, "socials.posts._id": postId },
      { $inc: { "socials.posts.$.dislikes": 1 } },
      { new: true }
    );

    if (!postOwner) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Add post to current user's dislikedPosts
    currentUser.socials.dislikedPosts.push(postId);
    await currentUser.save();

    const updatedPost = postOwner.socials.posts.find(p => p._id.toString() === postId);
    return res.status(200).json({ post: updatedPost, currentUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to dislike post" });
  }
});

// Add a comment to a post
router.post("/api/posts/:userId/:postId/comment", async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const { author, content, commenterId } = req.body;

    const commentData = {
      author,
      content,
      datePosted: new Date(),
    };

    // Add comment to the post
    const user = await User.findOneAndUpdate(
      { _id: userId, "socials.posts._id": postId },
      {
        $push: {
          "socials.posts.$.comments": commentData,
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Also save comment to the commenter's socials.comments array
    if (commenterId) {
      await User.findByIdAndUpdate(
        commenterId,
        {
          $push: {
            "socials.comments": {
              ...commentData,
              postId: postId,
              postOwnerId: userId,
            },
          },
        }
      );
    }

    const updatedPost = user.socials.posts.find(p => p._id.toString() === postId);
    return res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to add comment" });
  }
});

module.exports = router;
