import React, { use, useState } from "react";
import axios from "axios";
import { useContext, createContext } from "react";
import { UserContext } from "../../Pages/SkeletonPage";

const MakePostSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [postText, setPostText] = useState("");
  const { user, setUser } = useContext(UserContext);

  const submitPost = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      `http://localhost:5000/api/posts/${user._id}`,
      {
        $push: {
          posts: { content: postText, authorUsername: `${user?.username}` },
        },
      }
    );
    const newUser = response.data;
    console.log("Post Made:", newUser);
    setUser(newUser);
    setPostText("");
  };

  return (
    <div className="w-[70%] border-2 mx-auto">
      <div className="flex flex-col border-blue-500">
        <div className="flex flex-row items-center p-5">
          <div className="bg-gray-100 w-[64px] h-[64px] rounded-full"></div>
          <div className="">
            <form className="w-[870px]" onSubmit={submitPost}>
              <textarea
                className={`text-md text-left border border-blue-600 w-full ml-2 h-[50px] flex ${
                  expanded ? "h-[100px]" : "h-[50px]"
                } `}
                onFocus={() => {
                  setExpanded(!expanded);
                }}
                onBlur={() => {
                  setExpanded(false);
                }}
                placeholder="How do you feel about the markets today? Share your thoughts!"
                onChange={(e) => setPostText(e.target.value)}
              ></textarea>
              <div className="flex flex-row justify-between border-2 ml-1.5 w-[872px] mt-3">
                <div className="border border-red-800 w-fit flex flex-row gap-3">
                  <h1 className="cursor-pointer">Image</h1>
                  <h1 className="cursor-pointer">GIF</h1>
                  <h1 className="cursor-pointer">Emoji</h1>
                  <h1 className="cursor-pointer">Poll</h1>
                </div>
                <div>
                  <button type="submit" className="cursor-pointer">
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePostSection;
