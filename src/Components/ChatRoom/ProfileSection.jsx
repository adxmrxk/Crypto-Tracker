import React, { useContext } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import CheckIcon from "@mui/icons-material/Check";

function ProfileSection() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="flex justify-start">
      <div className="w-[70%] pt-5 border-2">
        <div className="flex flex-row">
          <div className="bg-gradient-to-br to-gray-400 via-gray-300 from-gray-200 w-[74px] h-[74px] rounded-full flex justify-center items-center text-2xl">
            {user?.profilePicture !== ""
              ? user?.profilePicture
              : user?.username.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex flex-col">
              <h1>{user?.displayName}</h1>
              <h1>@{user?.username}</h1>
            </div>
            <div className="flex flex-row">
              <p className="">{user?.following} following</p>
              <p className="ml-3">{user?.followers} followers</p>
            </div>
          </div>
        </div>
        <p className="w-fit mt-3">
          Joined on{" "}
          {user?.createdAt &&
            new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
        </p>
        <hr className="border-gray-400 my-1"></hr>
        <div className="w-fit mt-3">
          <CheckIcon className="mr-2 text-green-400" />

          <button className="bg-blue-400 py-1 px-2 rounded-sm cursor-pointer">
            Create My First Watch List
          </button>
        </div>
        <div className="flex flex-row gap-3 mt-5 ">
          <h1>Posts</h1>
          <h1>Comments</h1>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
