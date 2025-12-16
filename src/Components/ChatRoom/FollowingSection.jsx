import React, { useContext } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const FollowingSection = () => {
  const { user, setUser } = useContext(UserContext);
  //Go through the users following list. Extract their posts and display them here.
  return (
    <div className="p-3 grid grid-cols-2 gap-3">
      {user?.posts?.map((post, index) => (
        <div key={index} className="border-2 border-blue-400 mb-5 p-5">
          <div className="">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-3">
                <div className="bg-gradient-to-br to-gray-400 via-gray-300 from-gray-200 w-[64px] h-[64px] rounded-full flex justify-center items-center text-2xl">
                  {user?.profilePicture !== ""
                    ? user?.profilePicture
                    : user?.username.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col w-fit border-2">
                  <h1 className="font-semibold text-lg">
                    {post.authorUsername}
                  </h1>
                  <h1 className="-mt-1 -ml-5 text-md">{user?.displayName}</h1>
                </div>
              </div>
              <div className="flex items-center h-fit">
                <PersonAddIcon
                  className="cursor-pointer mr-3 text-gray-700"
                  sx={{ fontSize: 22 }}
                ></PersonAddIcon>
                <div className="flex flex-row cursor-pointer">
                  <h1 className="text-gray-700">•</h1>
                  <h1 className="text-gray-700">•</h1>
                  <h1 className="text-gray-700">•</h1>
                </div>
              </div>
            </div>
            <div className="max-w-[500px] max-h-[300px] mt-10 border-2 flex justify-start items-center text-left px-2">
              <p className="">{post?.content}</p>
            </div>
            <div className="flex flex-row gap-3">
              <div className="w-[225px] h-[225px] border-2 mt-5"></div>
              <div className="w-[225px] h-[225px] border-2 mt-5"></div>
            </div>
            {/*<p className="flex justify-start items-center text-left mt-1">
              {post?.datePosted &&
                new Date(post.datePosted).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
            </p>*/}
            <div className="flex flex-row gap-3 mt-3">
              <p>Following Section</p>
              <p>Likes</p>
              <p>Dislikes</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowingSection;
