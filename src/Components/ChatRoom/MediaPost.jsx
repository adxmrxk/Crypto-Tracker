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
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedComments, setExpandedComments] = useState(new Set());
  const [commentText, setCommentText] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);

  // Get liked/disliked posts from user's data
  const likedPosts = new Set(
    user?.socials?.likedPosts?.map((id) => id.toString()) || [],
  );
  const dislikedPosts = new Set(
    user?.socials?.dislikedPosts?.map((id) => id.toString()) || [],
  );

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

  const handleLike = async (postOwnerId, postId) => {
    if (likedPosts.has(postId)) return;

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/posts/${postOwnerId}/${postId}/like`,
        { currentUserId: user._id },
      );

      // Update user context with new likedPosts
      setUser(response.data.currentUser);

      const updatedPost = { ...response.data.post, userId: postOwnerId };

      // Update local posts state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: updatedPost.likes,
                dislikes: updatedPost.dislikes,
              }
            : post,
        ),
      );

      // Update selectedPost if this post is currently expanded
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
        { currentUserId: user._id },
      );

      // Update user context with new dislikedPosts
      setUser(response.data.currentUser);

      const updatedPost = { ...response.data.post, userId: postOwnerId };

      // Update local posts state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: updatedPost.likes,
                dislikes: updatedPost.dislikes,
              }
            : post,
        ),
      );

      // Update selectedPost if this post is currently expanded
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

  const handleComment = async (userId, postId) => {
    const content = commentText[postId];
    if (!content?.trim()) return;

    const newComment = {
      author: user?.username,
      content: content.trim(),
      datePosted: new Date(),
      commenterId: user?._id,
    };

    // Update local state immediately
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...(post.comments || []), newComment] }
          : post,
      ),
    );
    setCommentText((prev) => ({ ...prev, [postId]: "" }));

    try {
      await axios.post(
        `http://localhost:5000/api/posts/${userId}/${postId}/comment`,
        newComment,
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
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return postDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
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
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 rounded-xl blur-md"></div>
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-amber-500/20 p-10 text-center">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Posts Yet</h3>
          <p className="text-gray-400 max-w-sm mx-auto">
            Be the first to share your thoughts with the community!
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
                      @{selectedPost.username} ·{" "}
                      {formatTimeAgo(selectedPost.datePosted)}
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
                  <span className="font-semibold text-white">
                    {selectedPost.likes || 0}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsDown className="w-4 h-4 text-red-400" />
                  <span className="font-semibold text-white">
                    {selectedPost.dislikes || 0}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold text-white">
                    {selectedPost.comments?.length || 0}
                  </span>
                </div>
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-start gap-2 py-2">
                <button
                  onClick={() =>
                    handleLike(selectedPost.userId, selectedPost._id)
                  }
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    likedPosts.has(selectedPost._id)
                      ? "text-emerald-500 bg-emerald-500/10"
                      : "text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10"
                  }`}
                >
                  <ThumbsUp
                    className={`w-4 h-4 ${likedPosts.has(selectedPost._id) ? "fill-current" : ""}`}
                  />
                  <span className="text-xs font-medium">Like</span>
                </button>
                <button
                  onClick={() =>
                    handleDislike(selectedPost.userId, selectedPost._id)
                  }
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    dislikedPosts.has(selectedPost._id)
                      ? "text-red-500 bg-red-500/10"
                      : "text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                  }`}
                >
                  <ThumbsDown
                    className={`w-4 h-4 ${dislikedPosts.has(selectedPost._id) ? "fill-current" : ""}`}
                  />
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
                            <span className="font-medium text-white text-sm">
                              @{comment.author}
                            </span>
                            <span className="text-gray-500 text-xs">
                              {formatTimeAgo(comment.datePosted)}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm break-words text-left">
                            {comment.content}
                          </p>
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
                      value={commentText[selectedPost._id] || ""}
                      onChange={(e) =>
                        setCommentText((prev) => ({
                          ...prev,
                          [selectedPost._id]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleComment(selectedPost.userId, selectedPost._id);
                          // Update selectedPost with the new comment
                          const newComment = {
                            author: user?.username,
                            content: commentText[selectedPost._id]?.trim(),
                            datePosted: new Date(),
                          };
                          if (newComment.content) {
                            setSelectedPost((prev) => ({
                              ...prev,
                              comments: [...(prev.comments || []), newComment],
                            }));
                          }
                        }
                      }}
                      className="flex-1 bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none text-sm"
                    />
                    <button
                      onClick={() => {
                        const content = commentText[selectedPost._id]?.trim();
                        if (content) {
                          handleComment(selectedPost.userId, selectedPost._id);
                          // Update selectedPost with the new comment
                          const newComment = {
                            author: user?.username,
                            content: content,
                            datePosted: new Date(),
                          };
                          setSelectedPost((prev) => ({
                            ...prev,
                            comments: [...(prev.comments || []), newComment],
                          }));
                        }
                      }}
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

      {posts.map((post) => (
        <div
          key={post._id}
          onClick={() => setSelectedPost(post)}
          className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-5 hover:border-amber-500/30 transition-all duration-300 cursor-pointer"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/0 via-orange-500/0 to-rose-500/0 group-hover:from-amber-500/10 group-hover:via-orange-500/10 group-hover:to-rose-500/10 rounded-xl blur-sm transition-all duration-300 -z-10"></div>
          {/* Post Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold text-white">
                {post.username?.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm text-left">
                  {post.displayName}
                </h3>
                <p className="text-gray-500 text-xs text-left">
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
          <p className="text-gray-200 text-sm mb-3 leading-relaxed text-left p-2">
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
              <span className="text-xs font-medium">
                {post.comments?.length || 0}
              </span>
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
            <div
              className="mt-4 pt-4 border-t border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Add Comment */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-slate-900">
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
                    value={commentText[post._id] || ""}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      setCommentText((prev) => ({
                        ...prev,
                        [post._id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter")
                        handleComment(post.userId, post._id);
                    }}
                    className="flex-1 bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none text-sm"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleComment(post.userId, post._id);
                    }}
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
                        <p className="text-gray-300 text-sm text-left">
                          {comment.content}
                        </p>
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
