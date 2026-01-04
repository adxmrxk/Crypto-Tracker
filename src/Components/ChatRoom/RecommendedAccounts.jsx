import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import axios from "axios";

function RecommendedAccounts() {
  const { user } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setAllUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-4 h-[650px] w-[400px] overflow-hidden flex flex-col gap-3 rounded-xl border border-slate-800/50">
      <h1 className="text-xl font-bold text-blue-100 mb-3">
        Recommended Accounts
      </h1>

      {allUsers.length === 0 ? (
        <p className="text-slate-500 text-sm">No users found</p>
      ) : (
        allUsers.map((userG) => (
          <div
            key={userG._id}
            className="flex flex-row items-center justify-between w-full mb-2 bg-gradient-to-br from-slate-800/80 to-slate-800/40 p-3 rounded-xl hover:from-slate-700/80 hover:to-slate-700/40 transition-all duration-300 cursor-pointer border border-slate-700/30 hover:border-amber-400/50 backdrop-blur-sm"
          >
            {/* LEFT SIDE */}
            <div className="flex flex-row items-center flex-1 min-w-0">
              <div className="bg-gradient-to-r from-blue-400 to-purple-500  w-[45px] h-[45px] rounded-full flex justify-center items-center text-2xl shrink-0 shadow-lg">
                <h1 className="text-[20px] text-white font-semibold">
                  {userG?.profilePicture && userG.profilePicture !== ""
                    ? userG.profilePicture
                    : userG?.username?.slice(0, 2).toUpperCase()}
                </h1>
              </div>

              {/* TEXT */}
              <div className="flex flex-col ml-3 w-[200px] shrink-0 overflow-hidden">
                <h1 className="text-md text-white font-semibold truncate text-left">
                  {userG?.displayName}
                </h1>
                <h1 className="text-sm text-slate-400 truncate text-left">
                  @{userG?.username}
                </h1>
              </div>
            </div>

            {/* FOLLOW BUTTON */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 shrink-0">
              <h1 className="text-sm text-slate-900 font-bold">+</h1>
              <button className="text-sm text-slate-900 font-semibold">
                Follow
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RecommendedAccounts;
