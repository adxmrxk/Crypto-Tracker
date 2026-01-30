import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Pages/SkeletonPage";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Image, Smile, Send, X, Check } from "lucide-react";

const MAX_CHARS = 1000;

const CreatePostModal = ({ onClose }) => {
  const [postText, setPostText] = useState("");
  const [posting, setPosting] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const charsRemaining = MAX_CHARS - postText.length;
  const isNearLimit = charsRemaining <= 100;
  const isAtLimit = charsRemaining <= 0;

  const [showEmoji, setShowEmoji] = useState(false);
  const emojiRef = useRef(null);

  const imageInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const submitPost = async (event) => {
    event.preventDefault();
    if (!postText.trim() || posting) return;

    setPosting(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/${user._id}`,
        {
          $push: {
            "socials.posts": {
              content: postText,
              author: user?.username,
              media: imagePreview || "",
            },
          },
        }
      );

      setUser(response.data);
      setPostText("");
      setImagePreview(null);
      setPostSuccess(true);

      // Close modal after showing success
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Failed to create post:", err);
    } finally {
      setPosting(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setShowEmoji(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] px-4 backdrop-blur-sm bg-black/60">
      <div className="relative bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="border-b border-slate-700 p-5 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Create Post</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Success State */}
        {postSuccess ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Post Created!</h2>
            <p className="text-gray-400">Your post has been shared with the community.</p>
          </div>
        ) : (
          /* Post Form */
          <div className="p-6">
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0 flex items-center justify-center text-lg font-bold text-white">
                {user?.username?.slice(0, 2).toUpperCase()}
              </div>

              {/* Form */}
              <form className="flex-1" onSubmit={submitPost}>
                <textarea
                  className={`w-full bg-slate-700/50 text-white px-4 py-3 rounded-xl border focus:outline-none resize-none transition-all duration-200 placeholder-gray-400 h-32 ${
                    isAtLimit ? "border-red-500 focus:border-red-500" : "border-slate-600 focus:border-amber-500"
                  }`}
                  placeholder="What's happening in the crypto world?"
                  value={postText}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_CHARS) {
                      setPostText(e.target.value);
                    }
                  }}
                  maxLength={MAX_CHARS}
                  autoFocus
                />

                {/* Image Preview */}
                {imagePreview && (
                  <div className="flex justify-start mt-3">
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="max-h-32 rounded-lg border border-slate-600"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-400 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-1 relative">
                    <input
                      type="file"
                      accept="image/*"
                      ref={imageInputRef}
                      className="hidden"
                      onChange={handleImageSelect}
                    />

                    <button
                      type="button"
                      onClick={() => imageInputRef.current.click()}
                      className="p-2 text-gray-400 hover:text-amber-400 hover:bg-slate-700 rounded-lg transition-all cursor-pointer"
                    >
                      <Image className="w-5 h-5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowEmoji((prev) => !prev)}
                      className="p-2 text-gray-400 hover:text-amber-400 hover:bg-slate-700 rounded-lg transition-all cursor-pointer"
                    >
                      <Smile className="w-5 h-5" />
                    </button>

                    {showEmoji && (
                      <div ref={emojiRef} className="absolute top-full mt-2 z-50">
                        <Picker
                          data={data}
                          previewPosition="none"
                          theme="dark"
                          onEmojiSelect={(emoji) => {
                            if (postText.length + emoji.native.length <= MAX_CHARS) {
                              setPostText((prev) => prev + emoji.native);
                            }
                            setShowEmoji(false);
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Character Counter */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-medium ${
                          isAtLimit
                            ? "text-red-400"
                            : isNearLimit
                            ? "text-amber-400"
                            : "text-gray-400"
                        }`}
                      >
                        {postText.length} / {MAX_CHARS}
                      </span>
                      <div className="w-8 h-8 relative">
                        <svg className="w-8 h-8 transform -rotate-90">
                          <circle
                            cx="16"
                            cy="16"
                            r="12"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            className="text-slate-700"
                          />
                          <circle
                            cx="16"
                            cy="16"
                            r="12"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 12}`}
                            strokeDashoffset={`${2 * Math.PI * 12 * (1 - postText.length / MAX_CHARS)}`}
                            className={`transition-all duration-200 ${
                              isAtLimit
                                ? "text-red-500"
                                : isNearLimit
                                ? "text-amber-500"
                                : "text-amber-500"
                            }`}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!postText.trim() || posting || isAtLimit}
                      className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-semibold rounded-xl transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      {posting ? "Posting..." : "Post"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePostModal;
