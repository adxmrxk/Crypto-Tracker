import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Share2,
  TrendingUp,
  Users,
  Sparkles,
  Send,
} from "lucide-react";

const SocialShowcase = () => {
  const [likeCount, setLikeCount] = useState(247);
  const [isLiked, setIsLiked] = useState(false);

  // Fake posts data
  const fakePosts = [
    {
      id: 1,
      author: "CryptoWhale",
      initials: "CW",
      time: "2h ago",
      content:
        "Bitcoin just broke through the $58k resistance! This bull run is just getting started.",
      likes: 247,
      dislikes: 12,
      comments: 89,
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      id: 2,
      author: "DeFiHunter",
      initials: "DH",
      time: "5h ago",
      content:
        "Just discovered an amazing yield farming opportunity. Always DYOR but the APY looks promising!",
      likes: 182,
      dislikes: 8,
      comments: 45,
      gradient: "from-purple-400 to-pink-500",
    },
    {
      id: 3,
      author: "BlockchainDev",
      initials: "BD",
      time: "8h ago",
      content:
        "New smart contract audit complete. Security is everything in this space. Stay safe out there!",
      likes: 156,
      dislikes: 3,
      comments: 32,
      gradient: "from-amber-400 to-orange-500",
    },
  ];

  const handleLike = () => {
    if (!isLiked) {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  return (
    <div data-aos="fade-left" data-aos-offset="200">
      <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-2xl border border-sky-400/50 p-6 w-[480px] mb-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-gray-100 font-semibold">Community Feed</h3>
              <p className="text-gray-400 text-sm">Join the conversation</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/60 border border-slate-600 rounded-lg">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 font-semibold text-sm">Live</span>
          </div>
        </div>

        {/* Fake Post Input */}
        <div className="flex items-center gap-3 mb-5 p-3 bg-slate-800/60 rounded-xl border border-slate-600">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-white">
            YU
          </div>
          <div className="flex-1 text-gray-400 text-sm text-left">
            Share your thoughts on the market...
          </div>
          <Send className="w-4 h-4 text-amber-400" />
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {fakePosts.slice(0, 2).map((post, index) => (
            <div
              key={post.id}
              className="p-4 bg-slate-800/60 rounded-xl border border-slate-600"
            >
              {/* Post Header */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${post.gradient} flex items-center justify-center text-xs font-bold text-white`}
                >
                  {post.initials}
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-100 font-medium text-sm text-left">
                    {post.author}
                  </h4>
                  <p className="text-gray-500 text-xs text-left">{post.time}</p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-300 text-sm mb-3 leading-relaxed text-left ml-2">
                {post.content.length > 100
                  ? post.content.slice(0, 100) + "..."
                  : post.content}
              </p>

              {/* Post Actions */}
              <div className="flex items-center gap-4">
                <button
                  onClick={index === 0 ? handleLike : undefined}
                  className={`flex items-center gap-1.5 text-sm transition-colors ${
                    index === 0 && isLiked
                      ? "text-emerald-400"
                      : "text-gray-400 hover:text-emerald-400"
                  }`}
                >
                  <ThumbsUp
                    className={`w-4 h-4 ${index === 0 && isLiked ? "fill-current" : ""}`}
                  />
                  <span>{index === 0 ? likeCount : post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 text-sm transition-colors">
                  <ThumbsDown className="w-4 h-4" />
                  <span>{post.dislikes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 text-sm transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-1.5 text-gray-400 hover:text-amber-400 text-sm transition-colors ml-auto">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-600">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-slate-800"></div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-slate-800"></div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-slate-800"></div>
            </div>
            <span className="text-gray-400 text-xs">+2.4k online</span>
          </div>
          <span className="text-amber-400 text-sm font-medium">
            View all posts →
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialShowcase;
