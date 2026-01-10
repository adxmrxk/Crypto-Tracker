import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import { UserPlus, Users, Sparkles } from "lucide-react";
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
    <div className="w-[380px] flex-shrink-0">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 overflow-hidden sticky top-6">
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
              {allUsers.slice(0, 5).map((userG) => (
                <div
                  key={userG._id}
                  className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-all duration-200 cursor-pointer border border-slate-700/50 hover:border-amber-500/30 group"
                >
                  {/* User Info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative flex-shrink-0">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold shadow-lg">
                        {userG?.profilePicture && userG.profilePicture !== ""
                          ? userG.profilePicture
                          : userG?.username?.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-800"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate text-sm group-hover:text-amber-400 transition-colors">
                        {userG?.displayName}
                      </h3>
                      <p className="text-gray-500 text-xs truncate">
                        @{userG?.username}
                      </p>
                    </div>
                  </div>

                  {/* Follow Button */}
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-semibold text-sm rounded-lg transition-all duration-200 hover:scale-105 flex-shrink-0">
                    <UserPlus className="w-3.5 h-3.5" />
                    Follow
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {allUsers.length > 5 && (
          <div className="p-4 border-t border-slate-700">
            <button className="w-full text-center text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors">
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecommendedAccounts;
