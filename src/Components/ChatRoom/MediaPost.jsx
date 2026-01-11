import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import axios from "axios";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Loader2,
  UserPlus,
} from "lucide-react";

const MediaPost = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [expandedComments, setExpandedComments] = useState(new Set());
  const [commentText, setCommentText] = useState({});

  // Fake posts for demo
  const fakePosts = [
    {
      _id: "fake1",
      content: "Bitcoin just broke $100k! This is the moment we've all been waiting for. The institutional adoption is real and it's happening faster than anyone predicted. What a time to be alive! 🚀",
      username: "cryptoking",
      displayName: "Crypto King",
      profilePicture: "",
      userId: "fake-user-1",
      datePosted: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
      likes: 234,
      comments: [
        { author: "trader_mike", content: "This is insane! So glad I held!", datePosted: new Date() },
        { author: "sarah_crypto", content: "To the moon! 🌙", datePosted: new Date() },
      ],
    },
    {
      _id: "fake2",
      content: "Just published my analysis on Ethereum's upcoming upgrades. The shift to PoS has been massive for energy efficiency, and the next updates will make gas fees even lower. ETH is seriously undervalued right now.",
      username: "ethdev_anna",
      displayName: "Anna | ETH Developer",
      profilePicture: "",
      userId: "fake-user-2",
      datePosted: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      likes: 89,
      comments: [
        { author: "blockchain_bob", content: "Great analysis! Shared with my community.", datePosted: new Date() },
      ],
    },
    {
      _id: "fake3",
      content: "Unpopular opinion: Most altcoins won't survive the next bear market. Focus on projects with real utility and strong teams. Don't get caught holding bags. DYOR always! 📊",
      username: "trader_mike",
      displayName: "Mike Trading",
      profilePicture: "",
      userId: "fake-user-3",
      datePosted: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      likes: 156,
      comments: [],
    },
    {
      _id: "fake4",
      content: "New to crypto? Here's my advice:\n\n1. Never invest more than you can lose\n2. Dollar cost average\n3. Use hardware wallets\n4. Don't chase pumps\n5. Learn about the tech\n\nWelcome to the community! 💪",
      username: "crypto_mentor",
      displayName: "Crypto Mentor",
      profilePicture: "",
      userId: "fake-user-4",
      datePosted: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
      likes: 412,
      comments: [
        { author: "newbie_joe", content: "This is exactly what I needed. Thank you!", datePosted: new Date() },
        { author: "sarah_crypto", content: "Solid advice for beginners 👍", datePosted: new Date() },
        { author: "hodler99", content: "Number 4 is so important!", datePosted: new Date() },
      ],
    },
    {
      _id: "fake5",
      content: "Solana ecosystem is exploding right now. The transaction speeds and low fees make it perfect for DeFi and NFTs. Just deployed my first dApp on it - the developer experience is 🔥",
      username: "solana_dev",
      displayName: "Sol Builder",
      profilePicture: "",
      userId: "fake-user-5",
      datePosted: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      likes: 67,
      comments: [],
    },
  ];

  // Fetch all posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/posts");
      // Combine real posts with fake posts, real posts first
      const allPosts = [...response.data, ...fakePosts];
      setPosts(allPosts);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      // If API fails, just show fake posts
      setPosts(fakePosts);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (userId, postId) => {
    if (likedPosts.has(postId)) return;

    // Update local state immediately
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
      )
    );
    setLikedPosts((prev) => new Set([...prev, postId]));

    // Only call API for real posts
    if (!postId.startsWith("fake")) {
      try {
        await axios.patch(`http://localhost:5000/api/posts/${userId}/${postId}/like`);
      } catch (err) {
        console.error("Failed to like post:", err);
      }
    }
  };

  const handleComment = async (userId, postId) => {
    const content = commentText[postId];
    if (!content?.trim()) return;

    const newComment = {
      author: user?.username,
      content: content.trim(),
      datePosted: new Date(),
    };

    // Update local state immediately
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...(post.comments || []), newComment] }
          : post
      )
    );
    setCommentText((prev) => ({ ...prev, [postId]: "" }));

    // Only call API for real posts
    if (!postId.startsWith("fake")) {
      try {
        await axios.post(
          `http://localhost:5000/api/posts/${userId}/${postId}/comment`,
          newComment
        );
      } catch (err) {
        console.error("Failed to add comment:", err);
      }
    }
  };

  const toggleComments = (postId) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return postDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-10 text-center">
        <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Posts Yet</h3>
        <p className="text-gray-400 max-w-sm mx-auto">
          Be the first to share your thoughts with the community!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-5 hover:border-slate-600 transition-all duration-200"
        >
          {/* Post Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-sm font-bold text-slate-900">
                {post.profilePicture || post.username?.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white">{post.displayName}</h3>
                  {post.userId !== user?._id && (
                    <button className="text-amber-500 hover:text-amber-400 transition-colors">
                      <UserPlus className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <p className="text-gray-500 text-sm">
                  @{post.username} · {formatTimeAgo(post.datePosted)}
                </p>
              </div>
            </div>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Post Content */}
          <p className="text-gray-200 mb-4 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>

          {/* Post Actions */}
          <div className="flex items-center gap-1 pt-3 border-t border-slate-700">
            <button
              onClick={() => toggleComments(post._id)}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all group"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{post.comments?.length || 0}</span>
            </button>
            <button
              onClick={() => handleLike(post.userId, post._id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all group ${
                likedPosts.has(post._id)
                  ? "text-red-500 bg-red-500/10"
                  : "text-gray-400 hover:text-red-400 hover:bg-red-500/10"
              }`}
            >
              <Heart
                className={`w-5 h-5 group-hover:scale-110 transition-transform ${
                  likedPosts.has(post._id) ? "fill-current" : ""
                }`}
              />
              <span className="text-sm font-medium">{post.likes || 0}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all group">
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all group ml-auto">
              <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Comments Section */}
          {expandedComments.has(post._id) && (
            <div className="mt-4 pt-4 border-t border-slate-700">
              {/* Add Comment */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-slate-900">
                  {user?.profilePicture || user?.username?.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentText[post._id] || ""}
                    onChange={(e) =>
                      setCommentText((prev) => ({ ...prev, [post._id]: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleComment(post.userId, post._id);
                    }}
                    className="flex-1 bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none text-sm"
                  />
                  <button
                    onClick={() => handleComment(post.userId, post._id)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-medium rounded-lg text-sm transition-colors"
                  >
                    Post
                  </button>
                </div>
              </div>

              {/* Comments List */}
              {post.comments?.length > 0 ? (
                <div className="space-y-3">
                  {post.comments.map((comment, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold text-white">
                        {comment.author?.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 bg-slate-700/30 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-white text-sm">
                            @{comment.author}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {formatTimeAgo(comment.datePosted)}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm text-center py-2">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaPost;
