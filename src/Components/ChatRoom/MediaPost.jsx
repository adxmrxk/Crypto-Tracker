import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import axios from "axios";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Loader2,
  UserPlus,
  X,
} from "lucide-react";

const MediaPost = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [dislikedPosts, setDislikedPosts] = useState(new Set());
  const [expandedComments, setExpandedComments] = useState(new Set());
  const [commentText, setCommentText] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);

  const truncateText = (text, maxLength = 150) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Fetch all posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/posts");
      setPosts(response.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (userId, postId) => {
    if (likedPosts.has(postId)) return;

    // If already disliked, remove dislike first
    if (dislikedPosts.has(postId)) {
      setDislikedPosts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, dislikes: Math.max((post.dislikes || 0) - 1, 0) } : post
        )
      );
    }

    // Update local state immediately
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
      )
    );
    setLikedPosts((prev) => new Set([...prev, postId]));

    try {
      await axios.patch(`http://localhost:5000/api/posts/${userId}/${postId}/like`);
    } catch (err) {
      console.error("Failed to like post:", err);
    }
  };

  const handleDislike = async (userId, postId) => {
    if (dislikedPosts.has(postId)) return;

    // If already liked, remove like first
    if (likedPosts.has(postId)) {
      setLikedPosts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, likes: Math.max((post.likes || 0) - 1, 0) } : post
        )
      );
    }

    // Update local state immediately
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, dislikes: (post.dislikes || 0) + 1 } : post
      )
    );
    setDislikedPosts((prev) => new Set([...prev, postId]));

    try {
      await axios.patch(`http://localhost:5000/api/posts/${userId}/${postId}/dislike`);
    } catch (err) {
      console.error("Failed to dislike post:", err);
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

    try {
      await axios.post(
        `http://localhost:5000/api/posts/${userId}/${postId}/comment`,
        newComment
      );
    } catch (err) {
      console.error("Failed to add comment:", err);
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
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold text-white">
                  {selectedPost.profilePicture || selectedPost.username?.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{selectedPost.displayName}</h3>
                  <p className="text-gray-500 text-sm">@{selectedPost.username} · {formatTimeAgo(selectedPost.datePosted)}</p>
                </div>
              </div>

              {/* Full Post Content */}
              <p className="text-gray-200 mb-4 leading-relaxed whitespace-pre-wrap break-words">
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
              <div className="flex items-center justify-around py-2">
                <button
                  onClick={() => {
                    handleLike(selectedPost.userId, selectedPost._id);
                    setSelectedPost({...selectedPost, likes: (selectedPost.likes || 0) + 1});
                  }}
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
                  onClick={() => {
                    handleDislike(selectedPost.userId, selectedPost._id);
                    setSelectedPost({...selectedPost, dislikes: (selectedPost.dislikes || 0) + 1});
                  }}
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

      {posts.map((post) => (
        <div
          key={post._id}
          onClick={() => setSelectedPost(post)}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-5 hover:border-slate-600 transition-all duration-200 cursor-pointer"
        >
          {/* Post Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold text-white">
                {post.profilePicture || post.username?.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white text-sm">{post.displayName}</h3>
                  {post.userId !== user?._id && (
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-amber-500 hover:text-amber-400 transition-colors"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <p className="text-gray-500 text-xs">
                  @{post.username} · {formatTimeAgo(post.datePosted)}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Post Content - Truncated */}
          <p className="text-gray-200 text-sm mb-3 leading-relaxed">
            {truncateText(post.content, 150)}
          </p>

          {/* Post Media - Smaller */}
          {post.media && (
            <div className="mb-3">
              <img
                src={post.media}
                alt="Post media"
                className="max-h-32 rounded-lg border border-slate-600 object-cover"
              />
            </div>
          )}

          {/* Post Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-700">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLike(post.userId, post._id);
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
              <span className="text-xs font-medium">{post.likes || 0}</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDislike(post.userId, post._id);
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
              <span className="text-xs font-medium">{post.dislikes || 0}</span>
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
