import React, { useState, useRef, useEffect, useContext } from "react";
import { Search, X, ThumbsUp, ThumbsDown, MessageCircle, UserPlus, UserCheck, User } from "lucide-react";
import { UserContext } from "../../Pages/SkeletonPage";
import axios from "axios";

const SearchModal = ({ onClose }) => {
  const { user, setUser } = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");
  const [postResults, setPostResults] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Get liked/disliked posts from user's data
  const likedPosts = new Set(
    user?.socials?.likedPosts?.map((id) => id.toString()) || []
  );
  const dislikedPosts = new Set(
    user?.socials?.dislikedPosts?.map((id) => id.toString()) || []
  );

  // Fetch all posts and users on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, usersRes] = await Promise.all([
          axios.get("http://localhost:5000/api/posts"),
          axios.get("http://localhost:5000/api/users")
        ]);
        setAllPosts(postsRes.data);
        setAllUsers(usersRes.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  // Filter results based on input
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length > 0) {
      // Check if searching for users (starts with @)
      if (value.startsWith("@")) {
        const searchTerm = value.slice(1).toLowerCase();
        const filteredUsers = allUsers.filter(u =>
          u._id !== user?._id &&
          u.username?.toLowerCase().includes(searchTerm)
        ).slice(0, 8);
        setUserResults(filteredUsers);
        setPostResults([]);
        setActiveTab("users");
      } else {
        // Search posts by content, displayName, or username
        const filteredPosts = allPosts.filter(post =>
          post.content?.toLowerCase().includes(value.toLowerCase()) ||
          post.displayName?.toLowerCase().includes(value.toLowerCase()) ||
          post.username?.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 8);

        // Also search users by displayName
        const filteredUsers = allUsers.filter(u =>
          u._id !== user?._id && (
            u.displayName?.toLowerCase().includes(value.toLowerCase()) ||
            u.username?.toLowerCase().includes(value.toLowerCase())
          )
        ).slice(0, 4);

        setPostResults(filteredPosts);
        setUserResults(filteredUsers);
        setActiveTab("all");
      }
    } else {
      setPostResults([]);
      setUserResults([]);
    }
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

  const truncateText = (text, maxLength = 60) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Check if following a user
  const isFollowingUser = (targetUserId) => {
    return user?.socials?.following?.some(
      (id) => id.toString() === targetUserId?.toString()
    );
  };

  // Handle follow/unfollow
  const handleFollowUser = async (targetUserId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/follow/${user._id}`,
        { targetUserId }
      );
      setUser(response.data);

      // Update selectedUser's followers count locally
      if (selectedUser?._id === targetUserId) {
        setSelectedUser((prev) => {
          const wasFollowing = isFollowingUser(targetUserId);
          return {
            ...prev,
            socials: {
              ...prev.socials,
              followers: wasFollowing
                ? prev.socials.followers.filter((id) => id.toString() !== user._id.toString())
                : [...(prev.socials.followers || []), user._id],
            },
          };
        });
      }
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };

  const handleLike = async (postOwnerId, postId) => {
    if (likedPosts.has(postId)) return;

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/posts/${postOwnerId}/${postId}/like`,
        { currentUserId: user._id }
      );
      setUser(response.data.currentUser);

      if (selectedPost?._id === postId) {
        setSelectedPost((prev) => ({
          ...prev,
          likes: response.data.post.likes,
          dislikes: response.data.post.dislikes,
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

      if (selectedPost?._id === postId) {
        setSelectedPost((prev) => ({
          ...prev,
          likes: response.data.post.likes,
          dislikes: response.data.post.dislikes,
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

  const hasResults = postResults.length > 0 || userResults.length > 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] px-4 backdrop-blur-sm bg-black/60">
      <div className="relative bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-700 overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-slate-700 p-5 flex items-center justify-between flex-shrink-0">
          <h1 className="text-xl font-bold text-white">Search</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-slate-700 flex-shrink-0">
          <div className="relative">
            <div className={`absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/20 rounded-xl blur-md transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-amber-400' : 'text-gray-400'}`} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                value={inputValue}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full bg-slate-700/50 text-white pl-12 pr-4 py-3 rounded-xl border border-slate-600 focus:border-amber-500 focus:outline-none placeholder-gray-400"
                autoFocus
              />
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-2">Tip: Use @ to search for users by username</p>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {inputValue.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-7 h-7 text-gray-500" />
              </div>
              <p className="text-gray-400 mb-1">Start typing to search</p>
              <p className="text-gray-500 text-sm">Find posts, users, and more</p>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No results found for "{inputValue}"</p>
              <p className="text-gray-500 text-sm mt-1">Try a different search term</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Users Section */}
              {userResults.length > 0 && (
                <div>
                  <h3 className="text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Users
                  </h3>
                  <div className="space-y-2">
                    {userResults.map((userProfile) => (
                      <div
                        key={userProfile._id}
                        onClick={() => setSelectedUser(userProfile)}
                        className="flex items-center justify-between p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold text-white">
                            {userProfile.username?.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-white font-medium">{userProfile.displayName}</p>
                            <p className="text-gray-500 text-sm">@{userProfile.username}</p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFollowUser(userProfile._id);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            isFollowingUser(userProfile._id)
                              ? "bg-slate-600 text-white hover:bg-red-500/20 hover:text-red-400"
                              : "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900"
                          }`}
                        >
                          {isFollowingUser(userProfile._id) ? "Following" : "Follow"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Posts Section */}
              {postResults.length > 0 && (
                <div>
                  <h3 className="text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Posts
                  </h3>
                  <div className="space-y-2">
                    {postResults.map((post) => (
                      <div
                        key={post._id}
                        onClick={() => setSelectedPost(post)}
                        className="p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                            {post.username?.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="text-white font-medium text-sm">{post.displayName}</span>
                            <span className="text-gray-500 text-xs ml-2">@{post.username}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">{truncateText(post.content, 100)}</p>
                        <div className="flex items-center gap-4 mt-2 text-gray-500 text-xs">
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" /> {post.likes || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" /> {post.comments?.length || 0}
                          </span>
                          <span>{formatTimeAgo(post.datePosted)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* User Profile Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-[110] px-4 backdrop-blur-sm bg-black/60">
          <div className="relative bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 w-full max-w-xs rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-2 right-2 p-1.5 hover:bg-slate-700 rounded-lg transition-colors z-10 cursor-pointer"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>

            <div className="p-4 pt-8 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-lg font-bold text-white shadow-lg mb-3">
                {selectedUser.username?.slice(0, 2).toUpperCase()}
              </div>

              <h2 className="text-lg font-bold text-white">{selectedUser.displayName}</h2>
              <p className="text-gray-400 text-sm mb-3">@{selectedUser.username}</p>

              <div className="flex justify-center gap-4 text-sm mb-4">
                <div>
                  <span className="text-white font-semibold">{selectedUser.socials?.followers?.length || 0}</span>
                  <span className="text-gray-500 ml-1">followers</span>
                </div>
                <div>
                  <span className="text-white font-semibold">{selectedUser.socials?.following?.length || 0}</span>
                  <span className="text-gray-500 ml-1">following</span>
                </div>
              </div>

              <button
                onClick={() => handleFollowUser(selectedUser._id)}
                className={`w-full py-2 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  isFollowingUser(selectedUser._id)
                    ? "bg-slate-700 text-white hover:bg-red-500/20 hover:text-red-400 border border-slate-600"
                    : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900"
                }`}
              >
                {isFollowingUser(selectedUser._id) ? (
                  <>
                    <UserCheck className="w-4 h-4" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Follow
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center z-[110] px-4 backdrop-blur-sm bg-black/60">
          <div className="relative bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-700 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="border-b border-slate-700 p-5 flex items-center justify-between flex-shrink-0">
              <h1 className="text-xl font-bold text-white">Post</h1>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
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
                    <h3 className="font-semibold text-white text-left">{selectedPost.displayName}</h3>
                    <p className="text-gray-500 text-sm">
                      @{selectedPost.username} · {formatTimeAgo(selectedPost.datePosted)}
                    </p>
                  </div>
                </div>
                {selectedPost.userId !== user?._id && (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 font-semibold text-sm rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 transition-all cursor-pointer">
                    <UserPlus className="w-4 h-4" />
                    Follow
                  </button>
                )}
              </div>

              {/* Post Content */}
              <p className="text-gray-200 mb-4 leading-relaxed whitespace-pre-wrap break-words text-left p-2">
                {selectedPost.content}
              </p>

              {/* Post Media */}
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
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
                    {user?.username?.slice(0, 2).toUpperCase()}
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
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-medium rounded-lg text-sm transition-colors cursor-pointer"
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
};

export default SearchModal;
