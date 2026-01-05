import React, { useContext, useState } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import CheckIcon from "@mui/icons-material/Check";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditIcon from "@mui/icons-material/Edit";
import RecommendedAccounts from "./RecommendedAccounts";
import EditProfile from "./EditProfile";
import SearchProfiles from "./SearchProfiles";

function ProfileSection() {
  const { user, setUser } = useContext(UserContext);
  const [selected, setSelected] = useState("Posts");
  const [editProfile, setEditProfile] = useState(false);

  return (
    <div className="flex justify-between mb-15">
      <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-3 w-[70%]">
        {editProfile ? (
          <EditProfile
            editProfile={editProfile}
            setEditProfile={setEditProfile}
          ></EditProfile>
        ) : null}
        <div className="w-[66.5%] pt-5">
          <div className="flex justify-between border-1 border-slate-600 hover:border-amber-400 p-3 w-[850px] bg-slate-800/50 transition-colors duration-300">
            <div className="flex flex-row">
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 cursor-pointer hover:opacity-90 w-[74px] h-[74px] rounded-full flex justify-center items-center text-2xl text-white font-bold">
                {user?.profilePicture !== ""
                  ? user?.profilePicture
                  : user?.username.slice(0, 2).toUpperCase()}
              </div>
              <div className="ml-5">
                <div className="flex flex-col text-left">
                  <h1 className="font-semibold text-white">
                    {user?.displayName}
                  </h1>
                  <h1 className="text-gray-300">@{user?.username}</h1>
                </div>
                <div className="flex flex-row gap-3 mt-3">
                  <p className="text-gray-300">
                    {user?.socials?.following ? user?.socials?.following : 0}{" "}
                    following
                  </p>
                  <p className="text-gray-300">
                    {user?.socials?.followers ? user?.socials?.followers : 0}{" "}
                    followers
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div
                className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 w-fit h-fit py-1 px-4 duration-300 transition-all cursor-pointer rounded-sm flex items-center"
                onClick={() => {
                  setEditProfile(true);
                }}
              >
                <EditIcon
                  className="mr-1 text-slate-900"
                  sx={{ fontSize: 23 }}
                ></EditIcon>
                <button className="cursor-pointer text-slate-900 font-semibold">
                  Edit
                </button>
              </div>
            </div>
          </div>
          <p className="w-fit mt-4 text-gray-300">
            Joined on{" "}
            {user?.createdAt &&
              new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
          </p>
          <hr className="border-slate-600 mt-2 w-[65%]"></hr>
          <div className="w-fit mt-5 translate-y-4 flex items-center">
            <CheckIcon className="mr-2 text-green-400" />
            <button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 py-1 px-4 rounded-sm cursor-pointer text-slate-900 font-semibold transition-all duration-300">
              Create My First Watch List
            </button>
          </div>
          <div className="flex flex-col mt-5">
            <div className="flex flex-row gap-7 mt-5">
              <h1 className="text-gray-200 font-medium">Posts</h1>
              <h1 className="text-gray-200 font-medium">Comments</h1>
            </div>
            <hr className="border-slate-600 mt-2 w-[65%] mb-10"></hr>
          </div>
          {selected === "Posts" ? (
            <div>
              {user?.socials?.posts?.length > 0 ? (
                <div className="border-2 border-slate-600 h-[380px] overflow-y-auto bg-slate-800/30">
                  {user?.socials.posts.map((post, index) => {
                    return (
                      <div
                        className="border-2 border-slate-600 p-2 bg-slate-800/40"
                        key={index}
                      >
                        <div className="mb-3">
                          <div className="flex flex-row justify-between">
                            <div className="flex flex-row gap-3">
                              <div className="bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 w-[50px] h-[50px] rounded-full flex justify-center items-center text-2xl">
                                <h1 className="text-[20px] text-white font-bold">
                                  {user?.profilePicture !== ""
                                    ? user?.profilePicture
                                    : user?.username.slice(0, 2).toUpperCase()}
                                </h1>
                              </div>
                              <div className="flex flex-col w-fit">
                                <h1 className="font-semibold text-lg text-white">
                                  {user?.displayName}
                                </h1>
                                <h1 className="-mt-1 -ml-5 text-md text-gray-300">
                                  @{user?.username}
                                </h1>
                              </div>
                            </div>
                          </div>
                          <div className="max-w-[500px] max-h-[300px] mt-10 flex justify-start items-center text-left px-2">
                            <p className="text-gray-200">{post?.content}</p>
                          </div>
                          <div className="flex flex-row gap-3">
                            <div className="w-[195px] h-[175px] border-2 border-slate-600 mt-5 bg-slate-700/50"></div>
                            <div className="w-[195px] h-[175px] border-2 border-slate-600 mt-5 bg-slate-700/50"></div>
                          </div>
                          <div className="flex flex-row gap-3 mt-3">
                            <p className="text-gray-300 hover:text-pink-400 cursor-pointer transition-colors">
                              Comments
                            </p>
                            <p className="text-gray-300 hover:text-pink-400 cursor-pointer transition-colors">
                              Likes
                            </p>
                            <p className="text-gray-300 hover:text-pink-400 cursor-pointer transition-colors">
                              Dislikes
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="border-1 border-slate-600 hover:border-amber-400 flex flex-col justify-center items-center w-[65%] p-6 bg-slate-800/30 transition-colors duration-300">
                  <h1 className="text-lg font-semibold text-left text-white">
                    Nothing Here!
                  </h1>
                  <p className="text-md text-center text-gray-300">
                    You can make your first post, or discover and follow
                    accounts you are interested in!
                  </p>
                  <button className="bg-gradient-to-r from-blue-400 to-purple-500 cursor-pointer hover:opacity-90  mt-3 px-4 py-2 rounded-sm text-white font-medium transition-all duration-300">
                    Create new post
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <RecommendedAccounts></RecommendedAccounts>
    </div>
  );
}

export default ProfileSection;
