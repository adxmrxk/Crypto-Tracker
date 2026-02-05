import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Pages/SkeletonPage";
import {
  Edit3,
  Calendar,
  Users,
  UserPlus,
  UserCheck,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Share2,
  MoreHorizontal,
  Plus,
  FileText,
  MessageCircle,
  Sparkles,
  X,
  Search,
} from "lucide-react";
import axios from "axios";
import EditProfile from "./EditProfile";

function ProfileSection() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Posts");
  const [editProfile, setEditProfile] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedCommentPost, setSelectedCommentPost] = useState(null);
  const [postOwnerInfo, setPostOwnerInfo] = useState(null);
  const [commentText, setCommentText] = useState({});

  // User search state
  const [searchInput, setSearchInput] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Get liked/disliked posts from user's data
  const likedPosts = new Set(
    user?.socials?.likedPosts?.map((id) => id.toString()) || []
  );
  const dislikedPosts = new Set(
    user?.socials?.dislikedPosts?.map((id) => id.toString()) || []
  );

  // Fetch post when clicking on a comment
  const handleCommentClick = async (comment) => {
    if (!comment.postId || !comment.postOwnerId) return;

    try {
      // Fetch the post owner's data to get the post
      const response = await axios.get(
        `http://localhost:5000/api/users/${comment.postOwnerId}`
      );
      const postOwner = response.data;
      setPostOwnerInfo(postOwner);

      // Find the specific post
      const post = postOwner.socials?.posts?.find(
        (p) => p._id.toString() === comment.postId.toString()
      );

      if (post) {
        setSelectedCommentPost({
          ...post,
          userId: postOwner._id,
          displayName: postOwner.displayName,
          username: postOwner.username,
          profilePicture: postOwner.profilePicture,
        });
      }
    } catch (err) {
      console.error("Failed to fetch post:", err);
    }
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Fetch fresh user data from backend when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?._id) return;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${user._id}`
        );
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };
    fetchUserData();
  }, []);

  // Fetch all users for search
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setAllUsers(response.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchAllUsers();
  }, []);

  // Handle user search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.length > 0 && allUsers.length > 0) {
      const filtered = allUsers.filter(u =>
        u._id !== user?._id && (
          u.displayName?.toLowerCase().includes(value.toLowerCase()) ||
          u.username?.toLowerCase().includes(value.toLowerCase())
        )
      ).slice(0, 6);
      setSearchSuggestions(filtered);
      setShowSearchSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSearchSuggestions(false);
    }
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

      // Update selectedUserProfile's followers count locally
      setSelectedUserProfile((prev) => {
        if (!prev) return prev;
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
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };

  const handleLike = async (postId) => {
    if (likedPosts.has(postId)) return;

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/posts/${user._id}/${postId}/like`,
        { currentUserId: user._id }
      );

      // Update user context with new likedPosts and updated post
      setUser(response.data.currentUser);

      // Update selectedPost if it's the same post
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

  const handleDislike = async (postId) => {
    if (dislikedPosts.has(postId)) return;

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/posts/${user._id}/${postId}/dislike`,
        { currentUserId: user._id }
      );

      // Update user context with new dislikedPosts and updated post
      setUser(response.data.currentUser);

      // Update selectedPost if it's the same post
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

  // Like handler for comment post
  const handleCommentPostLike = async (postOwnerId, postId) => {
    if (likedPosts.has(postId)) return;

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/posts/${postOwnerId}/${postId}/like`,
        { currentUserId: user._id }
      );

      setUser(response.data.currentUser);

      if (selectedCommentPost?._id === postId) {
        setSelectedCommentPost((prev) => ({
          ...prev,
          likes: response.data.post.likes,
          dislikes: response.data.post.dislikes,
        }));
      }
    } catch (err) {
      console.error("Failed to like post:", err);
    }
  };

  // Dislike handler for comment post
  const handleCommentPostDislike = async (postOwnerId, postId) => {
    if (dislikedPosts.has(postId)) return;

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/posts/${postOwnerId}/${postId}/dislike`,
        { currentUserId: user._id }
      );

      setUser(response.data.currentUser);

      if (selectedCommentPost?._id === postId) {
        setSelectedCommentPost((prev) => ({
          ...prev,
          likes: response.data.post.likes,
          dislikes: response.data.post.dislikes,
        }));
      }
    } catch (err) {
      console.error("Failed to dislike post:", err);
    }
  };

  // Comment handler for comment post modal
  const handleCommentPostComment = async (postOwnerId, postId) => {
    const content = commentText[postId];
    if (!content?.trim()) return;

    const newComment = {
      author: user?.username,
      content: content.trim(),
      datePosted: new Date(),
      commenterId: user?._id,
    };

    setCommentText((prev) => ({ ...prev, [postId]: "" }));

    try {
      await axios.post(
        `http://localhost:5000/api/posts/${postOwnerId}/${postId}/comment`,
        newComment
      );

      // Update selectedCommentPost with the new comment
      setSelectedCommentPost((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), newComment],
      }));
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  const formatTimeAgo = (date) => {
    if (!date) return "";
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

  return (
    <div className="mb-15">
      {/* Main Profile Area */}
      <div>
        {editProfile && (
          <EditProfile
            editProfile={editProfile}
            setEditProfile={setEditProfile}
          />
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
                      {user?.username?.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-left">
                        {user?.displayName}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        @{user?.username} ·{" "}
                        {formatTimeAgo(selectedPost?.datePosted)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Full Post Content */}
                <p className="text-gray-200 mb-4 leading-relaxed whitespace-pre-wrap break-words text-left p-2">
                  {selectedPost?.content}
                </p>

                {/* Full Post Media */}
                {selectedPost?.media && (
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
                      {selectedPost?.likes || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsDown className="w-4 h-4 text-red-400" />
                    <span className="font-semibold text-white">
                      {selectedPost?.dislikes || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-blue-400" />
                    <span className="font-semibold text-white">
                      {selectedPost?.comments?.length || 0}
                    </span>
                  </div>
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-start gap-2 py-2">
                  <button
                    onClick={() => handleLike(selectedPost._id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                      likedPosts.has(selectedPost._id?.toString())
                        ? "text-emerald-500 bg-emerald-500/10"
                        : "text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10"
                    }`}
                  >
                    <ThumbsUp
                      className={`w-4 h-4 ${
                        likedPosts.has(selectedPost._id?.toString())
                          ? "fill-current"
                          : ""
                      }`}
                    />
                    <span className="text-xs font-medium">Like</span>
                  </button>
                  <button
                    onClick={() => handleDislike(selectedPost._id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                      dislikedPosts.has(selectedPost._id?.toString())
                        ? "text-red-500 bg-red-500/10"
                        : "text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    }`}
                  >
                    <ThumbsDown
                      className={`w-4 h-4 ${
                        dislikedPosts.has(selectedPost._id?.toString())
                          ? "fill-current"
                          : ""
                      }`}
                    />
                    <span className="text-xs font-medium">Dislike</span>
                  </button>
                </div>

                {/* Comments Section */}
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <h4 className="text-white font-semibold mb-3">Comments</h4>
                  {selectedPost?.comments?.length > 0 ? (
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
                      {user?.username?.slice(0, 2).toUpperCase()}
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
                        onKeyDown={async (e) => {
                          if (e.key === "Enter") {
                            const content = commentText[selectedPost._id]?.trim();
                            if (!content) return;
                            const newComment = {
                              author: user?.username,
                              content: content,
                              datePosted: new Date(),
                              commenterId: user?._id,
                            };
                            setCommentText((prev) => ({ ...prev, [selectedPost._id]: "" }));
                            setSelectedPost((prev) => ({
                              ...prev,
                              comments: [...(prev.comments || []), newComment],
                            }));
                            try {
                              await axios.post(
                                `http://localhost:5000/api/posts/${user._id}/${selectedPost._id}/comment`,
                                newComment
                              );
                            } catch (err) {
                              console.error("Failed to add comment:", err);
                            }
                          }
                        }}
                        className="flex-1 bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none text-sm"
                      />
                      <button
                        onClick={async () => {
                          const content = commentText[selectedPost._id]?.trim();
                          if (!content) return;
                          const newComment = {
                            author: user?.username,
                            content: content,
                            datePosted: new Date(),
                            commenterId: user?._id,
                          };
                          setCommentText((prev) => ({ ...prev, [selectedPost._id]: "" }));
                          setSelectedPost((prev) => ({
                            ...prev,
                            comments: [...(prev.comments || []), newComment],
                          }));
                          try {
                            await axios.post(
                              `http://localhost:5000/api/posts/${user._id}/${selectedPost._id}/comment`,
                              newComment
                            );
                          } catch (err) {
                            console.error("Failed to add comment:", err);
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

        {/* Comment Post Modal - Shows the post that the user commented on */}
        {selectedCommentPost && (
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-sm bg-black/60">
            <div className="relative bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-700 overflow-hidden max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="border-b border-slate-700 p-5 flex items-center justify-between flex-shrink-0">
                <h1 className="text-xl font-bold text-white">Post</h1>
                <button
                  onClick={() => {
                    setSelectedCommentPost(null);
                    setPostOwnerInfo(null);
                  }}
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
                      {selectedCommentPost.username?.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-left">
                        {selectedCommentPost.displayName}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        @{selectedCommentPost.username} ·{" "}
                        {formatTimeAgo(selectedCommentPost.datePosted)}
                      </p>
                    </div>
                  </div>
                  {selectedCommentPost.userId !== user?._id && (
                    <button className="flex items-center gap-1.5 px-3 py-1.5 font-semibold text-sm rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 transition-all">
                      <UserPlus className="w-4 h-4" />
                      Follow
                    </button>
                  )}
                </div>

                {/* Full Post Content */}
                <p className="text-gray-200 mb-4 leading-relaxed whitespace-pre-wrap break-words text-left p-2">
                  {selectedCommentPost.content}
                </p>

                {/* Full Post Media */}
                {selectedCommentPost.media && (
                  <div className="mb-4">
                    <img
                      src={selectedCommentPost.media}
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
                      {selectedCommentPost.likes || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsDown className="w-4 h-4 text-red-400" />
                    <span className="font-semibold text-white">
                      {selectedCommentPost.dislikes || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-blue-400" />
                    <span className="font-semibold text-white">
                      {selectedCommentPost.comments?.length || 0}
                    </span>
                  </div>
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-start gap-2 py-2">
                  <button
                    onClick={() =>
                      handleCommentPostLike(
                        selectedCommentPost.userId,
                        selectedCommentPost._id
                      )
                    }
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                      likedPosts.has(selectedCommentPost._id?.toString())
                        ? "text-emerald-500 bg-emerald-500/10"
                        : "text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10"
                    }`}
                  >
                    <ThumbsUp
                      className={`w-4 h-4 ${
                        likedPosts.has(selectedCommentPost._id?.toString())
                          ? "fill-current"
                          : ""
                      }`}
                    />
                    <span className="text-xs font-medium">Like</span>
                  </button>
                  <button
                    onClick={() =>
                      handleCommentPostDislike(
                        selectedCommentPost.userId,
                        selectedCommentPost._id
                      )
                    }
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                      dislikedPosts.has(selectedCommentPost._id?.toString())
                        ? "text-red-500 bg-red-500/10"
                        : "text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    }`}
                  >
                    <ThumbsDown
                      className={`w-4 h-4 ${
                        dislikedPosts.has(selectedCommentPost._id?.toString())
                          ? "fill-current"
                          : ""
                      }`}
                    />
                    <span className="text-xs font-medium">Dislike</span>
                  </button>
                </div>

                {/* Comments Section */}
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <h4 className="text-white font-semibold mb-3">Comments</h4>
                  {selectedCommentPost.comments?.length > 0 ? (
                    <div className="space-y-3 mb-4">
                      {selectedCommentPost.comments.map((comment, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                            {comment.author?.slice(0, 2).toUpperCase()}
                          </div>
                          <div className={`flex-1 rounded-lg p-3 ${
                            comment.author === user?.username
                              ? "bg-amber-500/5 border border-amber-500/20"
                              : "bg-slate-700/30"
                          }`}>
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
                      {user?.username?.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentText[selectedCommentPost._id] || ""}
                        onChange={(e) =>
                          setCommentText((prev) => ({
                            ...prev,
                            [selectedCommentPost._id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleCommentPostComment(
                              selectedCommentPost.userId,
                              selectedCommentPost._id
                            );
                          }
                        }}
                        className="flex-1 bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none text-sm"
                      />
                      <button
                        onClick={() =>
                          handleCommentPostComment(
                            selectedCommentPost.userId,
                            selectedCommentPost._id
                          )
                        }
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

        {/* Search Users */}
        <div className="mb-3 relative w-[35%]">
          <div className="relative">
            <div className={`absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/20 rounded-xl blur-md transition-opacity duration-300 ${isSearchFocused ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${isSearchFocused ? 'text-amber-400' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search for users..."
                value={searchInput}
                onChange={handleSearchChange}
                onFocus={() => {
                  setIsSearchFocused(true);
                  searchInput.length > 0 && setShowSearchSuggestions(true);
                }}
                onBlur={() => {
                  setIsSearchFocused(false);
                  setTimeout(() => setShowSearchSuggestions(false), 200);
                }}
                className="w-full bg-slate-700/50 text-white pl-12 pr-4 py-3 rounded-xl border border-slate-600 focus:border-amber-500 focus:outline-none placeholder-gray-400"
              />
            </div>
          </div>
          {showSearchSuggestions && searchSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-lg overflow-hidden z-50">
              {searchSuggestions.map((userProfile) => (
                <div
                  key={userProfile._id}
                  onClick={() => {
                    setSelectedUserProfile(userProfile);
                    setSearchInput("");
                    setShowSearchSuggestions(false);
                  }}
                  className="px-4 py-3 hover:bg-slate-700 cursor-pointer text-gray-100 transition-colors border-b border-slate-700 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                      {userProfile.username?.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-white">{userProfile.displayName}</span>
                      <span className="text-gray-500 text-sm ml-2">@{userProfile.username}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {showSearchSuggestions && searchInput.length > 0 && searchSuggestions.length === 0 && (
            <div className="absolute left-0 right-0 mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-lg overflow-hidden z-50">
              <div className="px-4 py-4 text-center">
                <p className="text-gray-400 text-sm">No users found matching "{searchInput}"</p>
                <p className="text-gray-500 text-xs mt-1">Try a different search term</p>
              </div>
            </div>
          )}
        </div>

        {/* Profile Header Card */}
        <div className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 rounded-xl border border-slate-700 overflow-hidden">
          {/* Banner */}
          <div className="h-24 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-blue-500/20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-800/80"></div>
          </div>

          {/* Profile Info */}
          <div className="px-5 pb-5 pt-2 -mt-10 relative z-10">
            <div className="flex justify-between items-end mb-3 pt-3">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xl font-bold text-white shadow-xl">
                {user?.username?.slice(0, 2).toUpperCase()}
              </div>

              {/* Edit Button */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/25 to-orange-500/25 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                <button
                  onClick={() => setEditProfile(true)}
                  className="relative flex items-center gap-2 px-3 py-2 bg-slate-800/60 border border-slate-600 rounded-lg hover:border-amber-500/50 hover:bg-slate-700/60 transition-all duration-200 cursor-pointer text-gray-300 hover:text-amber-400"
                >
                  <Edit3 className="w-4 h-4" />
                  <span className="text-sm font-medium">Edit Profile</span>
                </button>
              </div>
            </div>

            {/* Name & Username */}
            <div className="mb-3">
              <h1 className="text-xl font-bold text-white text-left">
                {user?.displayName}
              </h1>
              <p className="text-gray-400 text-left">@{user?.username}</p>
            </div>

            {/* Bio */}
            {user?.bio && (
              <p className="text-gray-300 mb-3 leading-relaxed">{user.bio}</p>
            )}

            {/* Stats Row */}
            <div className="flex items-center gap-5 mb-3">
              <div className="flex items-center gap-2 text-gray-300 hover:text-amber-400 cursor-pointer transition-colors">
                <Users className="w-4 h-4" />
                <span className="font-semibold text-white">
                  {user?.socials?.following?.length || 0}
                </span>
                <span className="text-gray-400">Following</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 hover:text-amber-400 cursor-pointer transition-colors">
                <UserPlus className="w-4 h-4" />
                <span className="font-semibold text-white">
                  {user?.socials?.followers?.length || 0}
                </span>
                <span className="text-gray-400">Followers</span>
              </div>
            </div>

            {/* Joined Date */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>
                Joined{" "}
                {user?.createdAt &&
                  new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
              </span>
            </div>
          </div>
        </div>

        {/* User Profile Modal */}
        {selectedUserProfile && (
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-sm bg-black/60">
            <div className="relative bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 w-full max-w-xs rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
              {/* Close Button */}
              <button
                onClick={() => setSelectedUserProfile(null)}
                className="absolute top-2 right-2 p-1.5 hover:bg-slate-700 rounded-lg transition-colors z-10"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>

              {/* Profile Content */}
              <div className="p-4 pt-8 text-center">
                {/* Avatar */}
                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-lg font-bold text-white shadow-lg mb-3">
                  {selectedUserProfile.username?.slice(0, 2).toUpperCase()}
                </div>

                {/* Name & Username */}
                <h2 className="text-lg font-bold text-white">{selectedUserProfile.displayName}</h2>
                <p className="text-gray-400 text-sm mb-3">@{selectedUserProfile.username}</p>

                {/* Stats Row */}
                <div className="flex justify-center gap-4 text-sm mb-4">
                  <div>
                    <span className="text-white font-semibold">{selectedUserProfile.socials?.followers?.length || 0}</span>
                    <span className="text-gray-500 ml-1">followers</span>
                  </div>
                  <div>
                    <span className="text-white font-semibold">{selectedUserProfile.socials?.following?.length || 0}</span>
                    <span className="text-gray-500 ml-1">following</span>
                  </div>
                </div>

                {/* Follow/Unfollow Button */}
                <button
                  onClick={() => handleFollowUser(selectedUserProfile._id)}
                  className={`w-full py-2 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    isFollowingUser(selectedUserProfile._id)
                      ? "bg-slate-700 text-white hover:bg-red-500/20 hover:text-red-400 border border-slate-600"
                      : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900"
                  }`}
                >
                  {isFollowingUser(selectedUserProfile._id) ? (
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

        {/* Watchlist CTA */}
        {(!user?.watchList || user?.watchList?.length === 0) && (
          <div className="relative mt-6">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 rounded-xl blur-md"></div>
            <div className="relative bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-left">
                    Create Your Watchlist
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Start tracking your favorite cryptocurrencies
                  </p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/25 to-orange-500/25 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                <button
                  onClick={() => {
                    navigate("/PortfolioPage");
                    setTimeout(() => {
                      document
                        .getElementById("search-crypto")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="relative px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-semibold rounded-xl transition-all duration-200 cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mt-6">
          <div className="flex gap-1 bg-slate-800/50 p-1 rounded-xl border border-slate-700 w-fit">
            <button
              onClick={() => setSelected("Posts")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                selected === "Posts"
                  ? "bg-amber-500 text-slate-900"
                  : "text-gray-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <FileText className="w-4 h-4" />
              Posts
            </button>
            <button
              onClick={() => setSelected("Comments")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                selected === "Comments"
                  ? "bg-amber-500 text-slate-900"
                  : "text-gray-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              Comments
            </button>
          </div>
        </div>

        {/* Posts Section */}
        {selected === "Posts" && (
          <div className="mt-6 w-[85%]">
            {user?.socials?.posts?.length > 0 ? (
              <div className="space-y-4">
                {user.socials.posts.map((post, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedPost(post)}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-5 hover:border-slate-600 transition-colors cursor-pointer"
                  >
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold text-white">
                          {user?.profilePicture && user.profilePicture.length <= 4 && !user.profilePicture.startsWith("data:")
                            ? user.profilePicture
                            : user?.username?.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="">
                          <h3 className="font-semibold text-white text-sm text-left">
                            {user?.displayName}
                          </h3>
                          <p className="text-gray-500 text-xs text-left">
                            @{user?.username} ·{" "}
                            {formatTimeAgo(post?.datePosted)}
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
                      {truncateText(post?.content, 150)}
                    </p>

                    {/* Post Media - Smaller */}
                    {post?.media && (
                      <div className="mb-3">
                        <img
                          src={post.media}
                          alt="Post media"
                          className="max-h-32 rounded-lg border border-slate-600 object-cover"
                        />
                      </div>
                    )}

                    {/* Post Stats */}
                    <div className="flex items-center gap-4 pt-2 border-t border-slate-700">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-400">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-xs font-medium">
                          {post?.likes || 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-400">
                        <ThumbsDown className="w-4 h-4" />
                        <span className="text-xs font-medium">
                          {post?.dislikes || 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-400">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-xs font-medium">
                          {post?.comments?.length || 0}
                        </span>
                      </div>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all group"
                      >
                        <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-10 text-center">
                <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No Posts Yet
                </h3>
                <p className="text-gray-400 mb-6 max-w-sm mx-auto">
                  Share your thoughts, insights, and crypto journey with the
                  community!
                </p>
                <div className="relative group inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/25 to-orange-500/25 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                  <button className="relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-semibold rounded-xl transition-all duration-200 cursor-pointer">
                    <Plus className="w-4 h-4" />
                    Create Your First Post
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Comments Section */}
        {selected === "Comments" && (
          <div className="mt-6 w-[85%]">
            {user?.socials?.comments?.length > 0 ? (
              <div className="space-y-4">
                {user.socials.comments.map((comment, index) => (
                  <div
                    key={index}
                    onClick={() => handleCommentClick(comment)}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-5 hover:border-slate-600 transition-colors cursor-pointer"
                  >
                    {/* Comment Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                        {user?.profilePicture && user.profilePicture.length <= 4 && !user.profilePicture.startsWith("data:")
                          ? user.profilePicture
                          : user?.username?.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white text-sm text-left">
                            {user?.displayName}
                          </h3>
                          <span className="text-gray-500 text-xs">
                            @{user?.username}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs text-left">
                          {formatTimeAgo(comment?.datePosted)}
                        </p>
                      </div>
                    </div>

                    {/* Comment Content */}
                    <div className="bg-slate-700/30 rounded-lg p-4 mb-3">
                      <p className="text-gray-200 text-sm leading-relaxed text-left">
                        {comment?.content}
                      </p>
                    </div>

                    {/* Comment Stats & View Post */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-400">
                          <ThumbsUp className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-medium">
                            {comment?.likes || 0}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 text-gray-400">
                          <ThumbsDown className="w-4 h-4 text-red-400" />
                          <span className="text-xs font-medium">
                            {comment?.dislikes || 0}
                          </span>
                        </div>
                      </div>
                      {comment.postId && (
                        <span className="text-xs text-amber-500 font-medium">
                          Click to view original post →
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-10 text-center">
                <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No Comments Yet
                </h3>
                <p className="text-gray-400 max-w-sm mx-auto">
                  Join the conversation! Your comments on other posts will appear
                  here.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileSection;
