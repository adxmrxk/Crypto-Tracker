const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Notification = require("../models/userNotifications.js");

// Helper function to extract @mentions from text
const extractMentions = (text) => {
  if (!text) return [];
  const mentionRegex = /@(\w+)/g;
  const mentions = [];
  let match;
  while ((match = mentionRegex.exec(text)) !== null) {
    mentions.push(match[1].toLowerCase());
  }
  return [...new Set(mentions)]; // Remove duplicates
};

// Helper function to create mention notifications
const createMentionNotifications = async (text, authorId, authorUser, relatedId, relatedType) => {
  const mentionedUsernames = extractMentions(text);
  if (mentionedUsernames.length === 0) return;

  // Find all mentioned users
  const mentionedUsers = await User.find({
    username: { $in: mentionedUsernames.map(u => new RegExp(`^${u}$`, 'i')) }
  });

  for (const mentionedUser of mentionedUsers) {
    // Don't notify yourself
    if (mentionedUser._id.toString() === authorId.toString()) continue;

    // Check if user wants mention notifications
    if (mentionedUser.settings?.notifyMentions === false) continue;

    const notification = new Notification({
      userId: mentionedUser._id,
      type: "mention",
      title: "You were mentioned",
      message: `${authorUser.displayName || authorUser.username} mentioned you in a ${relatedType}`,
      fromUser: authorId,
      fromUsername: authorUser.username,
      fromProfilePicture: authorUser.profilePicture || "",
      relatedId: relatedId,
      relatedType: relatedType,
    });
    await notification.save();
  }
};

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
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get the newly created post (last one in the array)
    const newPost = updatedUser.socials.posts[updatedUser.socials.posts.length - 1];

    // Check for @mentions in the post content and create notifications
    if (newPost?.content) {
      await createMentionNotifications(
        newPost.content,
        userId,
        updatedUser,
        newPost._id,
        "post"
      );
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create post" });
  }
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

    // Create notification for the post owner (if not liking own post)
    if (userId !== currentUserId && postOwner.settings?.notifyUpvotes !== false) {
      const notification = new Notification({
        userId: userId,
        type: "upvote",
        title: "Post Liked",
        message: `${currentUser.displayName || currentUser.username} liked your post`,
        fromUser: currentUserId,
        fromUsername: currentUser.username,
        fromProfilePicture: currentUser.profilePicture || "",
        relatedId: postId,
        relatedType: "post",
      });
      await notification.save();
    }

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
      const commenter = await User.findByIdAndUpdate(
        commenterId,
        {
          $push: {
            "socials.comments": {
              ...commentData,
              postId: postId,
              postOwnerId: userId,
            },
          },
        },
        { new: true }
      );

      // Create notification for the post owner (if not commenting on own post)
      if (userId !== commenterId && user.settings?.notifyComments !== false) {
        const notification = new Notification({
          userId: userId,
          type: "comment",
          title: "New Comment",
          message: `${commenter?.displayName || author} commented on your post`,
          fromUser: commenterId,
          fromUsername: commenter?.username || author,
          fromProfilePicture: commenter?.profilePicture || "",
          relatedId: postId,
          relatedType: "post",
        });
        await notification.save();
      }

      // Check for @mentions in the comment and create notifications
      if (content && commenter) {
        await createMentionNotifications(
          content,
          commenterId,
          commenter,
          postId,
          "comment"
        );
      }
    }

    const updatedPost = user.socials.posts.find(p => p._id.toString() === postId);
    return res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to add comment" });
  }
});

module.exports = router;
