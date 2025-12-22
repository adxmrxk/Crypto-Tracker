import React, { useContext, useState } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import CheckIcon from "@mui/icons-material/Check";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditIcon from "@mui/icons-material/Edit";
import RecommendedAccounts from "./RecommendedAccounts";
import EditProfile from "./EditProfile";

function ProfileSection() {
  const { user, setUser } = useContext(UserContext);
  const [selected, setSelected] = useState("Posts");
  const [editProfile, setEditProfile] = useState(false);

  return (
    <div className="flex justify-between">
      {editProfile ? (
        <EditProfile
          editProfile={editProfile}
          setEditProfile={setEditProfile}
        ></EditProfile>
      ) : null}
      <div className="w-[66.5%] pt-5">
        <div className="flex justify-between border-2">
          <div className="flex flex-row">
            <div className="bg-gradient-to-br to-gray-400 via-gray-300 from-gray-200 w-[74px] h-[74px] rounded-full flex justify-center items-center text-2xl">
              {user?.profilePicture !== ""
                ? user?.profilePicture
                : user?.username.slice(0, 2).toUpperCase()}
            </div>
            <div className="border-2 ml-5">
              <div className="flex flex-col text-left">
                <h1 className="font-semibold">{user?.displayName}</h1>
                <h1>@{user?.username}</h1>
              </div>
              <div className="flex flex-row gap-3 mt-3">
                <p className="">{user?.following} following</p>
                <p className="">{user?.followers} followers</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div
              className="bg-slate-700 w-fit h-fit py-1 px-4 hover:bg-slate-600 duration-300 transition-all cursor-pointer rounded-sm"
              onClick={() => {
                setEditProfile(true);
              }}
            >
              <EditIcon
                className="mr-1 text-gray-200"
                sx={{ fontSize: 23 }}
              ></EditIcon>
              <button className="cursor-pointer text-gray-200">Edit</button>
            </div>
          </div>
        </div>
        <p className="w-fit mt-4">
          Joined on{" "}
          {user?.createdAt &&
            new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
        </p>
        <hr className="border-gray-400 mt-2 w-[65%]"></hr>
        <div className="w-fit mt-5 translate-y-4">
          <CheckIcon className="mr-2 text-green-400" />

          <button className="bg-blue-400 py-1 px-2 rounded-sm cursor-pointer">
            Create My First Watch List
          </button>
        </div>
        <div className="flex flex-col mt-5">
          <div className="flex flex-row gap-7 mt-5 ">
            <h1>Posts</h1>
            <h1>Comments</h1>
          </div>
          <hr className="border-gray-400 mt-2 w-[65%] mb-10"></hr>
        </div>
        {selected === "Posts" ? (
          <div>
            {user?.socials?.posts?.length > 0 ? (
              <div>
                {user?.socials.posts.map((post, index) => {
                  return (
                    <div>
                      <div className="">
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-row gap-3">
                            <div className="bg-gradient-to-br to-gray-400 via-gray-300 from-gray-200 w-[50px] h-[50px] rounded-full flex justify-center items-center text-2xl">
                              <h1 className="text-[20px]">
                                {user?.profilePicture !== ""
                                  ? user?.profilePicture
                                  : user?.username.slice(0, 2).toUpperCase()}
                              </h1>
                            </div>
                            <div className="flex flex-col w-fit border-2">
                              <h1 className="font-semibold text-lg">
                                {user?.displayName}
                              </h1>
                              <h1 className="-mt-1 -ml-5 text-md">
                                @{user?.username}
                              </h1>
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
                          <p>Comments</p>
                          <p>Likes</p>
                          <p>Dislikes</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="border-2 flex flex-col justify-center items-center w-[65%]">
                <h1 className="text-lg font-semibold text-left">
                  Nothing Here!
                </h1>
                <p className="text-md text-center">
                  You can make your first post, or discover and follow accounts
                  you are interested in!
                </p>
                <button className="border-2 mt-3">Create new post</button>
              </div>
            )}
          </div>
        ) : null}
      </div>
      <RecommendedAccounts></RecommendedAccounts>
    </div>
  );
}

export default ProfileSection;
