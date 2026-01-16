import React, { useState, useCallback, useContext } from "react";
import { Compass, Users, User } from "lucide-react";
import { UserContext } from "../../Pages/SkeletonPage";
import MediaPost from "./MediaPost";
import FollowingSection from "./FollowingSection";
import MakePostSection from "./MakePostSection";
import ProfileSection from "./ProfileSection";
import SearchPosts from "./SearchPosts";
import RecommendedAccounts from "./RecommendedAccounts";

const MediaFeed = () => {
  const { user } = useContext(UserContext);
  const [sectionSelected, setSectionSelected] = useState("Explore");
  const [refreshKey, setRefreshKey] = useState(0);

  const navItems = [
    { id: "Explore", label: "Explore", icon: Compass },
    { id: "Following", label: "Following", icon: Users },
    { id: "Profile", label: "Profile", icon: User },
  ];

  const handlePostCreated = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto px-4">
      <div className="flex gap-6">
        {/* Left Sidebar - Navigation */}
        <div className="w-[250px] flex-shrink-0">
          <div className="sticky top-6">
            {/* User Quick Info */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-5 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-lg font-bold text-white">
                  {user?.profilePicture || user?.username?.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{user?.displayName}</h3>
                  <p className="text-gray-500 text-sm truncate">@{user?.username}</p>
                </div>
              </div>
              <div className="flex justify-between text-center">
                <div>
                  <p className="text-white font-semibold">{user?.socials?.following?.length || 0}</p>
                  <p className="text-gray-500 text-xs">Following</p>
                </div>
                <div>
                  <p className="text-white font-semibold">{user?.socials?.followers?.length || 0}</p>
                  <p className="text-gray-500 text-xs">Followers</p>
                </div>
                <div>
                  <p className="text-white font-semibold">{user?.socials?.posts?.length || 0}</p>
                  <p className="text-gray-500 text-xs">Posts</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-3">
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = sectionSelected === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSectionSelected(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900"
                          : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Center - Main Feed */}
        <div className="flex-1 min-w-0">
          {/* Create Post (only on Explore/Following) */}
          {(sectionSelected === "Explore" || sectionSelected === "Following") && (
            <div className="mb-6">
              <MakePostSection onPostCreated={handlePostCreated} />
            </div>
          )}

          {/* Content */}
          <div>
            {sectionSelected === "Explore" && <MediaPost key={refreshKey} />}
            {sectionSelected === "Following" && <FollowingSection />}
            {sectionSelected === "Profile" && <ProfileSection />}
          </div>
        </div>

        {/* Right Sidebar - Search & Recommended */}
        {sectionSelected !== "Profile" && (
          <div className="w-[320px] flex-shrink-0">
            <div className="sticky top-6 space-y-4">
              {/* Search */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-4">
                <SearchPosts />
              </div>

              {/* Recommended Accounts */}
              <RecommendedAccounts />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaFeed;
