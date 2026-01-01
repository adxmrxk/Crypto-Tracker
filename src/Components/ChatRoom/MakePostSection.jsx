import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Pages/SkeletonPage";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import SearchPosts from "./SearchPosts";

const MakePostSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [postText, setPostText] = useState("");
  const { user, setUser } = useContext(UserContext);

  const [showEmoji, setShowEmoji] = useState(false);
  const emojiRef = useRef(null);

  const imageInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const submitPost = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      `http://localhost:5000/api/posts/${user._id}`,
      {
        $push: {
          "socials.posts": {
            content: postText,
            author: user?.username,
            // image intentionally NOT sent yet
          },
        },
      }
    );

    setUser(response.data);
    setPostText("");
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
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
    <div className="w-[70%] border-5 mx-auto flex justify-between">
      <div className="flex flex-col">
        <div className="flex flex-row items-center p-5">
          <div className="bg-gradient-to-br to-gray-400 via-gray-300 from-gray-200 w-[64px] h-[64px] rounded-full flex justify-center items-center text-2xl">
            {user?.profilePicture
              ? user.profilePicture
              : user?.username.slice(0, 2).toUpperCase()}
          </div>

          <form className="w-[800px] ml-2" onSubmit={submitPost}>
            <textarea
              className={`text-md border border-blue-600 w-full ${
                expanded ? "h-[100px]" : "h-[50px]"
              }`}
              onFocus={() => setExpanded(true)}
              onBlur={() => setExpanded(false)}
              placeholder="How do you feel about the markets today? Share your thoughts!"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />

            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="preview"
                  className="max-h-20 rounded-lg border"
                />
              </div>
            )}

            <div className="flex justify-between mt-3">
              <div className="flex gap-3 relative">
                <input
                  type="file"
                  accept="image/*"
                  ref={imageInputRef}
                  className="hidden"
                  onChange={handleImageSelect}
                />

                <h1
                  className="cursor-pointer"
                  onClick={() => imageInputRef.current.click()}
                >
                  Image
                </h1>

                <h1 className="cursor-pointer">GIF</h1>

                <h1
                  className="cursor-pointer select-none"
                  onClick={() => setShowEmoji((prev) => !prev)}
                >
                  Emoji
                </h1>

                {showEmoji && (
                  <div ref={emojiRef} className="absolute top-full mt-2 z-50">
                    <Picker
                      data={data}
                      previewPosition="none"
                      onEmojiSelect={(emoji) => {
                        setPostText((prev) => prev + emoji.native);
                        setShowEmoji(false);
                      }}
                    />
                  </div>
                )}
              </div>

              <button type="submit" className="cursor-pointer">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex border-2 border-pink-400 max-w-[500px] items-center">
        <SearchPosts></SearchPosts>
      </div>
    </div>
  );
};

export default MakePostSection;
