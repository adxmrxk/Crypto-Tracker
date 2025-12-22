import React, { useState, useContext } from "react";
import {
  TrendingUp,
  TrendingDown,
  MessageSquare,
  PlusCircle,
  Bell,
  Users,
  DollarSign,
  Activity,
  Heart,
  Share2,
  Bookmark,
} from "lucide-react";

// Mock user context for demo
const UserContext = React.createContext({
  user: { username: "cryptoTrader92" },
});

// TopWinners Component (embedded version of your component)
const TopWinners = () => {
  const sortedData = [
    {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
      current_price: 43250.0,
      price_change_percentage_24h: 4.23,
    },
    {
      id: 2,
      name: "Ethereum",
      symbol: "ETH",
      image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
      current_price: 2150.5,
      price_change_percentage_24h: 3.87,
    },
    {
      id: 3,
      name: "Cardano",
      symbol: "ADA",
      image: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
      current_price: 0.52,
      price_change_percentage_24h: 2.15,
    },
  ];

  const WinnerCard = ({ rank, coin }) => {
    if (!coin) return null;

    const previousPrice =
      coin.current_price / (1 + coin.price_change_percentage_24h / 100);
    const changePercent = coin.price_change_percentage_24h;
    const isPositive = changePercent >= 0;

    const rankColors = {
      1: "from-yellow-400 to-yellow-600",
      2: "from-gray-300 to-gray-500",
      3: "from-amber-600 to-amber-800",
    };

    return (
      <div className="group relative mb-4 rounded-md bg-gradient-to-r from-slate-800 to-slate-700 p-3 transition-all duration-300 hover:shadow-lg hover:from-slate-700 hover:to-slate-600 hover:scale-105 cursor-pointer border border-slate-600 hover:border-cyan-500">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${rankColors[rank]} blur-md opacity-50`}
            ></div>
            <div
              className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${rankColors[rank]} flex items-center justify-center font-black text-lg text-slate-900 shadow-lg`}
            >
              {rank}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-6 h-6 rounded-full"
              />
              <h3 className="font-semibold text-white truncate">{coin.name}</h3>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">
                  ${coin.current_price.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400">
                  prev: ${previousPrice.toFixed(2)}
                </span>
              </div>
              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm ${
                  isPositive
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                <TrendingUp
                  size={14}
                  className={isPositive ? "" : "rotate-180"}
                />
                {changePercent.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-sm bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 p-6 shadow-2xl">
      <h1 className="mb-6 text-2xl font-bold text-white flex items-center justify-center gap-2">
        <h1 className="text-2xl flex justify-center text-gray-200">
          Top Performers
        </h1>
      </h1>

      <div className="space-y-3">
        {sortedData.slice(0, 3).map((coin, index) => (
          <WinnerCard key={coin.id} rank={index + 1} coin={coin} />
        ))}
      </div>
    </div>
  );
};

const HomePannel = () => {
  const { user } = useContext(UserContext);

  // Mock data for activity feed
  const activityFeed = [
    {
      id: 1,
      user: "whaleWatcher",
      avatar: "🐋",
      content:
        "Just added more $ETH to my bag. Feeling bullish on the merge updates! The fundamentals are stronger than ever. 🚀",
      likes: 124,
      comments: 18,
      time: "2h ago",
      isLiked: false,
      isBookmarked: false,
      tags: ["ETH", "Bullish"],
    },
    {
      id: 2,
      user: "cryptoQueen",
      avatar: "👑",
      content:
        "BTC holding strong at 43k support. This is the bottom IMO. Time to accumulate before the next leg up 📈 DCA is the way!",
      likes: 256,
      comments: 42,
      time: "4h ago",
      isLiked: true,
      isBookmarked: false,
      tags: ["BTC", "Analysis"],
    },
    {
      id: 3,
      user: "defiDegen",
      avatar: "🦍",
      content:
        "Staking rewards hit different when you HODL long term 💎🙌 Just hit my 1 year anniversary. Never selling!",
      likes: 189,
      comments: 25,
      time: "6h ago",
      isLiked: false,
      isBookmarked: true,
      tags: ["Staking", "HODL"],
    },
    {
      id: 4,
      user: "moonBoi",
      avatar: "🌙",
      content:
        "SOL breaking out! Finally some action in my portfolio. Who else is riding this wave? 🌊",
      likes: 93,
      comments: 31,
      time: "8h ago",
      isLiked: false,
      isBookmarked: false,
      tags: ["SOL", "Breakout"],
    },
    {
      id: 5,
      user: "techAnalyst",
      avatar: "📊",
      content:
        "RSI showing oversold conditions on multiple alts. Could be a good entry point for swing traders. DYOR as always 👀",
      likes: 167,
      comments: 28,
      time: "10h ago",
      isLiked: true,
      isBookmarked: true,
      tags: ["Technical", "Trading"],
    },
  ];

  const notifications = [
    {
      id: 1,
      text: "BTC reached your target price of $43,000",
      type: "alert",
      time: "5m ago",
    },
    {
      id: 2,
      text: "cryptoQueen started following you",
      type: "social",
      time: "1h ago",
    },
    {
      id: 3,
      text: "New comment on your post about ETH",
      type: "social",
      time: "2h ago",
    },
    {
      id: 4,
      text: "Your portfolio is up 5% today!",
      type: "alert",
      time: "3h ago",
    },
  ];

  const [posts, setPosts] = useState(activityFeed);

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleBookmark = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {user?.username}
          </h1>
          <p className="text-gray-600 mt-1">
            Stay connected with the crypto community
          </p>
        </div>
        <div className="flex gap-3">
          <button className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow relative">
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <MessageSquare className="w-5 h-5 text-gray-700" />
          </button>
          <button className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-sm hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            <span className="font-medium">Create Post</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Community Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 opacity-80" />
                <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">
                  24h
                </span>
              </div>
              <p className="text-sm opacity-90 mb-1">Total Invested</p>
              <p className="text-3xl font-bold">20,323</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 opacity-80" />
                <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">
                  Total
                </span>
              </div>
              <p className="text-sm opacity-90 mb-1">Followers</p>
              <p className="text-3xl font-bold">1,247</p>
              <p className="text-sm opacity-80 mt-1">+23 this week</p>
            </div>
          </div>

          {/* Community Feed */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">
                Community Feed
              </h3>
              <div className="flex gap-2 mt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                  For You
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200">
                  Following
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200">
                  Trending
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {posts.slice(0, 3).map((post) => (
                <div
                  key={post.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                      {post.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-gray-800 hover:underline cursor-pointer">
                          {post.user}
                        </span>
                        <span className="text-gray-400 text-sm">
                          • {post.time}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3 leading-relaxed">
                        {post.content}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium hover:bg-blue-200 cursor-pointer"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <button className="flex items-center gap-2 hover:text-blue-600 transition-colors group">
                          <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span className="font-medium">{post.comments}</span>
                        </button>
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-2 transition-colors group ${
                            post.isLiked ? "text-red-500" : "hover:text-red-600"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 group-hover:scale-110 transition-transform ${
                              post.isLiked ? "fill-current" : ""
                            }`}
                          />
                          <span className="font-medium">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-green-600 transition-colors group">
                          <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                        <button
                          onClick={() => handleBookmark(post.id)}
                          className={`ml-auto flex items-center gap-2 transition-colors group ${
                            post.isBookmarked
                              ? "text-yellow-500"
                              : "hover:text-yellow-600"
                          }`}
                        >
                          <Bookmark
                            className={`w-4 h-4 group-hover:scale-110 transition-transform ${
                              post.isBookmarked ? "fill-current" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-gray-200 text-center mb-15">
              <button className="text-blue-600 font-medium hover:text-blue-700">
                Load More Posts
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Top Winners Component */}
          <TopWinners />

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {notifications.slice(0, 3).map((notif) => (
                <div
                  key={notif.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      notif.type === "alert" ? "bg-orange-500" : "bg-blue-500"
                    }`}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">{notif.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-blue-600 text-sm font-medium hover:text-blue-700">
              View All Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePannel;
