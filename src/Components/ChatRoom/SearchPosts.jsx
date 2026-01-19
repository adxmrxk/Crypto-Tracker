import React, { useState, useRef, useEffect, useContext } from "react";
import { Search, X, ThumbsUp, ThumbsDown, MessageCircle, UserPlus } from "lucide-react";
import { UserContext } from "../../Pages/SkeletonPage";
import axios from "axios";

function SearchPosts() {
  const { user, setUser } = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Get liked/disliked posts from user's data
  const likedPosts = new Set(
    user?.socials?.likedPosts?.map((id) => id.toString()) || []
  );
  const dislikedPosts = new Set(
    user?.socials?.dislikedPosts?.map((id) => id.toString()) || []
  );

  // Fetch all posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setAllPosts(response.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };
    fetchPosts();
  }, []);

  // Filter suggestions based on input
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length > 0 && allPosts.length > 0) {
      const filtered = allPosts.filter(post =>
        post.content?.toLowerCase().includes(value.toLowerCase()) ||
        post.displayName?.toLowerCase().includes(value.toLowerCase()) ||
        post.username?.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = (post) => {
    setSelectedPost(post);
    setInputValue("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const truncateText = (text, maxLength = 60) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const handleLike = async (postOwnerId, postId) => {
    if (likedPosts.has(postId)) return;

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/posts/${postOwnerId}/${postId}/like`,
        { currentUserId: user._id }
      );
      setUser(response.data.currentUser);
      const updatedPost = { ...response.data.post, userId: postOwnerId };

      if (selectedPost?._id === postId) {
        setSelectedPost((prev) => ({
          ...prev,
          likes: updatedPost.likes,
          dislikes: updatedPost.dislikes,
        }));
      }
    } catch (err) {
      console.error("Failed to like post:", err);
    }
  };

  const handleDislike = async (postOwnerId, postId) => {
    if (dislikedPosts.has(postId)) return;

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/posts/${postOwnerId}/${postId}/dislike`,
        { currentUserId: user._id }
      );
      setUser(response.data.currentUser);
      const updatedPost = { ...response.data.post, userId: postOwnerId };

      if (selectedPost?._id === postId) {
        setSelectedPost((prev) => ({
          ...prev,
          likes: updatedPost.likes,
          dislikes: updatedPost.dislikes,
        }));
      }
    } catch (err) {
      console.error("Failed to dislike post:", err);
    }
  };

  const handleComment = async () => {
    if (!commentText?.trim() || !selectedPost) return;

    const newComment = {
      author: user?.username,
      content: commentText.trim(),
      datePosted: new Date(),
      commenterId: user?._id,
    };

    setSelectedPost((prev) => ({
      ...prev,
      comments: [...(prev.comments || []), newComment],
    }));
    setCommentText("");

    try {
      await axios.post(
        `http://localhost:5000/api/posts/${selectedPost.userId}/${selectedPost._id}/comment`,
        newComment
      );
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  return (
    <div className="w-full relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search posts..."
          value={inputValue}
          onChange={handleChange}
          onFocus={() => inputValue.length > 0 && setShowSuggestions(true)}
          className="w-full bg-slate-700/50 text-white pl-12 pr-4 py-3 rounded-xl border border-slate-600 focus:border-amber-500 focus:outline-none placeholder-gray-400"
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-lg overflow-hidden"
        >
          {suggestions.map((post) => (
            <div
              key={post._id}
              onClick={() => handleSelectSuggestion(post)}
              className="px-4 py-3 hover:bg-slate-700 cursor-pointer text-gray-100 transition-colors border-b border-slate-700 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {post.username?.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white text-sm">{post.displayName}</span>
                    <span className="text-gray-500 text-xs">@{post.username}</span>
                  </div>
                  <p className="text-gray-400 text-sm truncate">{truncateText(post.content)}</p>
                </div>
                {post.media && (
                  <img
                    src={post.media}
                    alt="Post media"
                    className="w-10 h-10 rounded object-cover flex-shrink-0"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {showSuggestions && inputValue.length > 0 && suggestions.length === 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="px-4 py-3 text-gray-400 text-center">
            No posts found matching "{inputValue}"
          </div>
        </div>
      )}

      {/* Full Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-sm bg-black/60">
          <div className="relative bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-700 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="border-b border-slate-700 p-5 flex items-center justify-between flex-shrink-0">
              <h1 className="text-xl font-bold text-white">Post</h1>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold text-white">
                    {selectedPost.username?.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-left">
                      {selectedPost.displayName}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      @{selectedPost.username} · {formatTimeAgo(selectedPost.datePosted)}
                    </p>
                  </div>
                </div>
                {selectedPost.userId !== user?._id && (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 font-semibold text-sm rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 transition-all">
                    <UserPlus className="w-4 h-4" />
                    Follow
                  </button>
                )}
              </div>

              {/* Full Post Content */}
              <p className="text-gray-200 mb-4 leading-relaxed whitespace-pre-wrap break-words text-left p-2">
                {selectedPost.content}
              </p>

              {/* Full Post Media */}
              {selectedPost.media && (
                <div className="mb-4">
                  <img
                    src={selectedPost.media}
                    alt="Post media"
                    className="w-full max-h-[400px] rounded-lg border border-slate-600 object-contain"
                  />
                </div>
              )}

              {/* Post Stats */}
              <div className="flex items-center gap-6 py-3 border-t border-b border-slate-700 mb-4">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-white">{selectedPost.likes || 0}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsDown className="w-4 h-4 text-red-400" />
                  <span className="font-semibold text-white">{selectedPost.dislikes || 0}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold text-white">{selectedPost.comments?.length || 0}</span>
                </div>
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-start gap-2 py-2">
                <button
                  onClick={() => handleLike(selectedPost.userId, selectedPost._id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    likedPosts.has(selectedPost._id)
                      ? "text-emerald-500 bg-emerald-500/10"
                      : "text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10"
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${likedPosts.has(selectedPost._id) ? "fill-current" : ""}`} />
                  <span className="text-xs font-medium">Like</span>
                </button>
                <button
                  onClick={() => handleDislike(selectedPost.userId, selectedPost._id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    dislikedPosts.has(selectedPost._id)
                      ? "text-red-500 bg-red-500/10"
                      : "text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                  }`}
                >
                  <ThumbsDown className={`w-4 h-4 ${dislikedPosts.has(selectedPost._id) ? "fill-current" : ""}`} />
                  <span className="text-xs font-medium">Dislike</span>
                </button>
              </div>

              {/* Comments Section */}
              <div className="mt-4 pt-4 border-t border-slate-700">
                <h4 className="text-white font-semibold mb-3">Comments</h4>
                {selectedPost.comments?.length > 0 ? (
                  <div className="space-y-3 mb-4">
                    {selectedPost.comments.map((comment, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                          {comment.author?.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 bg-slate-700/30 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-white text-sm">@{comment.author}</span>
                            <span className="text-gray-500 text-xs">{formatTimeAgo(comment.datePosted)}</span>
                          </div>
                          <p className="text-gray-300 text-sm break-words text-left">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm text-center py-2 mb-4">
                    No comments yet. Be the first to comment!
                  </p>
                )}

                {/* Comment Input */}
                <div className="flex items-center gap-3 pt-3 border-t border-slate-700">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-slate-900 flex-shrink-0">
                    {user?.profilePicture &&
                    user.profilePicture.length <= 4 &&
                    !user.profilePicture.startsWith("data:")
                      ? user.profilePicture
                      : user?.username?.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleComment();
                      }}
                      className="flex-1 bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none text-sm"
                    />
                    <button
                      onClick={handleComment}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-medium rounded-lg text-sm transition-colors"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPosts;
