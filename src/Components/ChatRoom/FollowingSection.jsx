import React, { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Users,
  X,
  UserPlus,
  UserCheck,
  Ban,
  Link,
} from "lucide-react";
import axios from "axios";

const FollowingSection = () => {
  const { user, setUser } = useContext(UserContext);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [dislikedPosts, setDislikedPosts] = useState(new Set());
  const [expandedComments, setExpandedComments] = useState(new Set());
  const [commentText, setCommentText] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [copiedPostId, setCopiedPostId] = useState(null);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check if current user is following target user
  const isFollowing = (targetUserId) => {
    return user?.socials?.following?.some(
      (id) => id.toString() === targetUserId?.toString()
    );
  };

  // Check if current user has blocked target user
  const isBlocked = (targetUserId) => {
    return user?.socials?.blockList?.some(
      (blocked) => blocked.userId?.toString() === targetUserId?.toString()
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
      setOpenMenuId(null);
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };

  // Handle block
  const handleBlockUser = async (targetUserId) => {
    try {
      const blocked = isBlocked(targetUserId);
      const endpoint = blocked ? "unblock" : "block";
      const response = await axios.post(
        `http://localhost:5000/api/${endpoint}/${user._id}`,
        { targetUserId }
      );
      setUser(response.data);
      setOpenMenuId(null);
    } catch (error) {
      console.error("Failed to block/unblock user:", error);
    }
  };

  // Handle share (copy link)
  const handleSharePost = (postId) => {
    const postUrl = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(postUrl);
    setCopiedPostId(postId);
    setTimeout(() => setCopiedPostId(null), 2000);
    setOpenMenuId(null);
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const handleLike = (postId) => {
    if (likedPosts.has(postId)) return;
    // If already disliked, remove dislike
    if (dislikedPosts.has(postId)) {
      setDislikedPosts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    }
    setLikedPosts((prev) => new Set([...prev, postId]));
  };

  const handleDislike = (postId) => {
    if (dislikedPosts.has(postId)) return;
    // If already liked, remove like
    if (likedPosts.has(postId)) {
      setLikedPosts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    }
    setDislikedPosts((prev) => new Set([...prev, postId]));
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

  // No posts from following yet - will be populated when following feature is implemented
  const posts = [];

  // Get blocked user IDs
  const blockedUserIds = new Set(
    user?.socials?.blockList?.map((blocked) => blocked.userId?.toString()) || []
  );

  // Filter out posts from blocked users
  const filteredPosts = posts.filter(
    (post) => !blockedUserIds.has(post.userId?.toString())
  );

  if (filteredPosts.length === 0) {
    return (
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 rounded-xl blur-md"></div>
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-amber-500/20 p-10 text-center">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Posts from Following</h3>
          <p className="text-gray-400 max-w-sm mx-auto">
            Follow more people to see their posts here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
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
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold text-white overflow-hidden">
                  {selectedPost.profilePicture ? (
                    <img src={selectedPost.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    selectedPost.username?.slice(0, 2).toUpperCase()
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{selectedPost.displayName}</h3>
                    <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">Following</span>
                  </div>
                  <p className="text-gray-500 text-sm">@{selectedPost.username} · {formatTimeAgo(selectedPost.datePosted)}</p>
                </div>
              </div>

              {/* Full Post Content */}
              <p className="text-gray-200 mb-4 leading-relaxed whitespace-pre-wrap break-words">
                {selectedPost.content}
              </p>

              {/* Post Stats */}
              <div className="flex items-center gap-6 py-3 border-t border-b border-slate-700 mb-4">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-white">{(selectedPost.likes || 0) + (likedPosts.has(selectedPost._id) ? 1 : 0)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsDown className="w-4 h-4 text-red-400" />
                  <span className="font-semibold text-white">{(selectedPost.dislikes || 0) + (dislikedPosts.has(selectedPost._id) ? 1 : 0)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold text-white">{selectedPost.comments?.length || 0}</span>
                </div>
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-around py-2">
                <button
                  onClick={() => handleLike(selectedPost._id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    likedPosts.has(selectedPost._id)
                      ? "text-emerald-500 bg-emerald-500/10"
                      : "text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10"
                  }`}
                >
                  <ThumbsUp className={`w-5 h-5 ${likedPosts.has(selectedPost._id) ? "fill-current" : ""}`} />
                  <span className="text-sm font-medium">Like</span>
                </button>
                <button
                  onClick={() => handleDislike(selectedPost._id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    dislikedPosts.has(selectedPost._id)
                      ? "text-red-500 bg-red-500/10"
                      : "text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                  }`}
                >
                  <ThumbsDown className={`w-5 h-5 ${dislikedPosts.has(selectedPost._id) ? "fill-current" : ""}`} />
                  <span className="text-sm font-medium">Dislike</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Comment</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>

              {/* Comments Section */}
              {selectedPost.comments?.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <h4 className="text-white font-semibold mb-3">Comments</h4>
                  <div className="space-y-3">
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
                          <p className="text-gray-300 text-sm break-words">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {filteredPosts.map((post) => (
        <div
          key={post._id}
          onClick={() => setSelectedPost(post)}
          className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-5 hover:border-amber-500/30 transition-all duration-300 cursor-pointer"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/0 via-orange-500/0 to-rose-500/0 group-hover:from-amber-500/10 group-hover:via-orange-500/10 group-hover:to-rose-500/10 rounded-xl blur-sm transition-all duration-300 -z-10"></div>
          {/* Post Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold text-white overflow-hidden">
                {post.profilePicture ? (
                  <img src={post.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  post.username?.slice(0, 2).toUpperCase()
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white text-sm">{post.displayName}</h3>
                  <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">Following</span>
                </div>
                <p className="text-gray-500 text-xs">
                  @{post.username} · {formatTimeAgo(post.datePosted)}
                </p>
              </div>
            </div>
            <div className="relative" ref={openMenuId === post._id ? menuRef : null}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId(openMenuId === post._id ? null : post._id);
                }}
                className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {openMenuId === post._id && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 top-8 w-48 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50 overflow-hidden"
                >
                  {/* Follow/Unfollow */}
                  <button
                    onClick={() => handleFollowUser(post.userId)}
                    className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-slate-700 transition-colors text-gray-200"
                  >
                    {isFollowing(post.userId) ? (
                      <>
                        <UserCheck className="w-4 h-4 text-amber-400" />
                        <span>Unfollow</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 text-emerald-400" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>

                  {/* Block */}
                  <button
                    onClick={() => handleBlockUser(post.userId)}
                    className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-slate-700 transition-colors text-gray-200"
                  >
                    <Ban className="w-4 h-4 text-red-400" />
                    <span>{isBlocked(post.userId) ? "Unblock" : "Block"}</span>
                  </button>

                  {/* Share */}
                  <button
                    onClick={() => handleSharePost(post._id)}
                    className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-slate-700 transition-colors text-gray-200"
                  >
                    <Link className="w-4 h-4 text-blue-400" />
                    <span>{copiedPostId === post._id ? "Copied!" : "Share post"}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Post Content - Truncated */}
          <p className="text-gray-200 text-sm mb-3 leading-relaxed">
            {truncateText(post.content, 150)}
          </p>

          {/* Post Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-700">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLike(post._id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all group ${
                likedPosts.has(post._id)
                  ? "text-emerald-500 bg-emerald-500/10"
                  : "text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10"
              }`}
            >
              <ThumbsUp
                className={`w-4 h-4 group-hover:scale-110 transition-transform ${
                  likedPosts.has(post._id) ? "fill-current" : ""
                }`}
              />
              <span className="text-xs font-medium">
                {(post.likes || 0) + (likedPosts.has(post._id) ? 1 : 0)}
              </span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDislike(post._id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all group ${
                dislikedPosts.has(post._id)
                  ? "text-red-500 bg-red-500/10"
                  : "text-gray-400 hover:text-red-400 hover:bg-red-500/10"
              }`}
            >
              <ThumbsDown
                className={`w-4 h-4 group-hover:scale-110 transition-transform ${
                  dislikedPosts.has(post._id) ? "fill-current" : ""
                }`}
              />
              <span className="text-xs font-medium">
                {(post.dislikes || 0) + (dislikedPosts.has(post._id) ? 1 : 0)}
              </span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleComments(post._id);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all group"
            >
              <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">{post.comments?.length || 0}</span>
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all group"
            >
              <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Comments Section */}
          {expandedComments.has(post._id) && (
            <div className="mt-4 pt-4 border-t border-slate-700" onClick={(e) => e.stopPropagation()}>
              {/* Add Comment */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white overflow-hidden">
                  {user?.profilePicture ? (
                    <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    user?.username?.slice(0, 2).toUpperCase()
                  )}
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
