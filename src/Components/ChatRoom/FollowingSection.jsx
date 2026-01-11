import React, { useContext, useState } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Users,
} from "lucide-react";

const FollowingSection = () => {
  const { user } = useContext(UserContext);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [expandedComments, setExpandedComments] = useState(new Set());
  const [commentText, setCommentText] = useState({});

  // Fake posts from people you "follow"
  const followingPosts = [
    {
      _id: "follow1",
      content: "Just closed a massive trade on BTC. Patience pays off! Remember: the best traders aren't the ones who trade the most, they're the ones who wait for the right setup. 📈",
      username: "whale_hunter",
      displayName: "Whale Hunter",
      profilePicture: "",
      datePosted: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
      likes: 89,
      comments: [
        { author: "daytrader_x", content: "What was your entry point?", datePosted: new Date() },
      ],
    },
    {
      _id: "follow2",
      content: "Thread on why I think Layer 2 solutions are the future of Ethereum scaling 🧵\n\n1/ Gas fees on mainnet are still too high for everyday users...",
      username: "defi_sarah",
      displayName: "Sarah | DeFi Analyst",
      profilePicture: "",
      datePosted: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
      likes: 234,
      comments: [
        { author: "eth_maxi", content: "Great thread! Bookmarked.", datePosted: new Date() },
        { author: "crypto_newbie", content: "Can you explain L2 for beginners?", datePosted: new Date() },
      ],
    },
    {
      _id: "follow3",
      content: "Portfolio update: Rebalanced to 50% BTC, 30% ETH, 20% alts. Feeling good about this allocation for the current market conditions. What's your split?",
      username: "hodl_master",
      displayName: "HODL Master",
      profilePicture: "",
      datePosted: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      likes: 156,
      comments: [],
    },
    {
      _id: "follow4",
      content: "The amount of innovation happening in crypto right now is insane. New protocols, better UX, institutional adoption... We're still so early. Don't let the noise distract you from the signal. 🎯",
      username: "crypto_visionary",
      displayName: "Crypto Visionary",
      profilePicture: "",
      datePosted: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      likes: 312,
      comments: [
        { author: "blockchain_dev", content: "The dev tools have improved so much!", datePosted: new Date() },
      ],
    },
  ];

  const handleLike = (postId) => {
    if (likedPosts.has(postId)) return;
    setLikedPosts((prev) => new Set([...prev, postId]));
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

  // Use fake posts for demo
  const posts = followingPosts;

  if (posts.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-10 text-center">
        <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Posts from Following</h3>
        <p className="text-gray-400 max-w-sm mx-auto">
          Follow more people to see their posts here!
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
                  <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">Following</span>
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
              onClick={() => handleLike(post._id)}
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
              <span className="text-sm font-medium">
                {(post.likes || 0) + (likedPosts.has(post._id) ? 1 : 0)}
              </span>
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
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
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
                    className="flex-1 bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none text-sm"
                  />
                  <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-medium rounded-lg text-sm transition-colors">
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

export default FollowingSection;
