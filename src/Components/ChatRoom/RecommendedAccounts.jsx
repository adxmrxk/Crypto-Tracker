import React, { useContext } from "react";
import { UserContext } from "../../Pages/SkeletonPage";

function RecommendedAccounts() {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-3 h-[650px] flex flex-col gap-3 rounded-xs">
      <h1 className="text-lg font-semibold text-gray-200 mb-5">
        Recommended Accounts
      </h1>

      {/* Account Row */}
      <div className="flex flex-row gap-25 items-center mb-2 bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700 p-3 rounded-lg hover:scale-102 transition-all duration-300 cursor-pointer">
        <div className="flex flex-row">
          {/* Avatar */}
          <div className="bg-gradient-to-br to-gray-400 via-gray-300 from-gray-200 w-[45px] h-[45px] rounded-full flex justify-center items-center text-2xl">
            <h1 className="text-[20px]">
              {user?.profilePicture !== ""
                ? user?.profilePicture
                : user?.username.slice(0, 2).toUpperCase()}
            </h1>
          </div>

          {/* Name */}
          <div className="flex flex-col ml-1">
            <h1 className="text-md text-gray-100">{user?.displayName}</h1>
            <h1 className="text-sm text-gray-300">@{user?.username}</h1>
          </div>
        </div>

        {/* Follow Button (kept warm colors) */}
        <div className="flex items-center h-fit gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 px-3 py-1 rounded-sm transition shadow-md hover:shadow-lg">
          <h1 className="text-sm text-slate-900 font-bold">+</h1>
          <button className="text-sm text-slate-900 font-semibold">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecommendedAccounts;
