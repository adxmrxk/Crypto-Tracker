import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import { UserPlus, UserCheck, Users, Sparkles } from "lucide-react";
import axios from "axios";

function RecommendedAccounts() {
  const { user, setUser } = useContext(UserContext);
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

  const isFollowing = (targetUserId) => {
    return user?.socials?.following?.some(
      (id) => id.toString() === targetUserId.toString(),
    );
  };

  const handleFollow = async (targetUserId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/follow/${user._id}`,
        { targetUserId },
      );
      setUser(response.data);
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-lg font-bold text-white">Who to Follow</h2>
          </div>
        </div>

        {/* Users List */}
        <div className="p-4">
          {allUsers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No users found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {allUsers
                .filter((u) => u._id !== user?._id)
                .slice(0, 5)
                .map((userG) => (
                  <div
                    key={userG._id}
                    className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-all duration-200 cursor-pointer border border-slate-700/50 hover:border-amber-500/30 group"
                  >
                    {/* User Info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold shadow-lg">
                          {userG?.profilePicture && userG.profilePicture !== ""
                            ? userG.profilePicture
                            : userG?.username?.slice(0, 2).toUpperCase()}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 mr-2">
                        <h3 className="font-semibold text-white truncate text-sm group-hover:text-amber-400 transition-colors text-left">
                          {userG?.displayName}
                        </h3>
                        <p className="text-gray-500 text-xs truncate text-left">
                          @{userG?.username}
                        </p>
                      </div>
                    </div>

                    {/* Follow Button */}
                    {isFollowing(userG._id) ? (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 font-semibold text-sm rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 flex-shrink-0">
                        <UserCheck className="w-3.5 h-3.5" />
                        Following
                      </div>
                    ) : (
                      <button
                        onClick={() => handleFollow(userG._id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 font-semibold text-sm rounded-lg transition-all duration-200 cursor-pointer flex-shrink-0 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        Follow
                      </button>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecommendedAccounts;
