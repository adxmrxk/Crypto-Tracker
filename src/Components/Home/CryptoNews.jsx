import React from "react";
import { Newspaper, ExternalLink, Clock, TrendingUp, ThumbsUp, ThumbsDown, MessageCircle, User, Tag } from "lucide-react";
import useCryptoNews from "../../hooks/useCryptoNews";

const CryptoNews = () => {
  const { data: news, isLoading, error } = useCryptoNews();

  const formatTimeAgo = (timestamp) => {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - timestamp;

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (error) {
    return (
      <div className="relative h-[500px]">
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 rounded-3xl blur-lg"></div>
        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 h-full">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-amber-500/20 rounded-lg">
              <Newspaper className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Crypto News</h3>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-400">Unable to load news at this time</p>
            <p className="text-gray-500 text-sm mt-1">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[500px]">
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 rounded-3xl blur-lg"></div>
      <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 flex-shrink-0">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <div className="p-1.5 bg-amber-500/20 rounded-lg">
              <Newspaper className="w-4 h-4 text-amber-400" />
            </div>
            Trending News
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs">{news?.length || 0} articles</span>
            <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" />
              Live
            </span>
          </div>
        </div>

        {/* News List - Scrollable */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 space-y-3 scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent hover:scrollbar-thumb-amber-500/40 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-amber-500/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-amber-500/40">
          {isLoading ? (
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-xl animate-pulse">
                  <div className="w-24 h-20 bg-white/10 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-white/10 rounded w-full mb-2"></div>
                    <div className="h-3 bg-white/10 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {news?.map((article, index) => (
                <a
                  key={article.id || index}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-amber-500/20"
                >
                  {/* Thumbnail */}
                  <div className="relative w-24 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={article.imageurl || "https://via.placeholder.com/96x80?text=News"}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/96x80?text=News";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    {/* Category Badge */}
                    {article.categories && (
                      <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-amber-500/80 rounded text-[10px] font-medium text-slate-900 truncate max-w-[80px]">
                        {article.categories.split("|")[0]}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    {/* Title */}
                    <h4 className="text-white text-sm font-medium line-clamp-2 group-hover:text-amber-400 transition-colors text-left leading-snug mb-2">
                      {article.title}
                    </h4>

                    {/* Author & Source */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        {article.source_info?.img ? (
                          <img
                            src={article.source_info.img}
                            alt={article.source_info.name}
                            className="w-4 h-4 rounded-full"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <User className="w-3 h-3 text-gray-500" />
                        )}
                        <span className="text-amber-400/80 text-xs font-medium truncate max-w-[100px]">
                          {article.source_info?.name || article.source}
                        </span>
                      </div>
                      {article.tags && (
                        <div className="flex items-center gap-1 text-gray-500">
                          <Tag className="w-3 h-3" />
                          <span className="text-xs truncate max-w-[60px]">
                            {article.tags.split("|")[0]}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-3 mt-auto">
                      {/* Time */}
                      <span className="text-gray-500 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimeAgo(article.published_on)}
                      </span>

                      {/* Upvotes */}
                      {article.upvotes !== undefined && (
                        <span className="text-emerald-400/70 text-xs flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {article.upvotes || 0}
                        </span>
                      )}

                      {/* Downvotes */}
                      {article.downvotes !== undefined && (
                        <span className="text-red-400/70 text-xs flex items-center gap-1">
                          <ThumbsDown className="w-3 h-3" />
                          {article.downvotes || 0}
                        </span>
                      )}

                      {/* Comments */}
                      {article.comments !== undefined && (
                        <span className="text-blue-400/70 text-xs flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {article.comments || 0}
                        </span>
                      )}
                    </div>

                    {/* Full Date - Shows on hover */}
                    <div className="text-gray-600 text-[10px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-left">
                      Published: {formatDate(article.published_on)}
                    </div>
                  </div>

                  {/* External Link Icon */}
                  <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-4 h-4 text-amber-400" />
                  </div>
                </a>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoNews;
