import React, { useState, useCallback, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [sectionSelected, setSectionSelected] = useState(() => {
    return location.state?.tab || "Explore";
  });
  const [refreshKey, setRefreshKey] = useState(0);

  // Handle tab changes from navigation state
  useEffect(() => {
    if (location.state?.tab) {
      setSectionSelected(location.state.tab);
      // Scroll to the top to show the Make Post section
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [location.key]);

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
            <div className="relative mb-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-amber-500/20 rounded-2xl blur-lg -z-10"></div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-lg font-bold text-white">
                  {user?.username?.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate text-left">{user?.displayName}</h3>
                  <p className="text-gray-500 text-sm truncate text-left">@{user?.username}</p>
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
            </div>

            {/* Navigation */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-3">
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = sectionSelected === item.id;
                  return (
                    <div key={item.id} className="relative">
                      {isActive && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-xl blur-md"></div>
                      )}
                      <button
                        onClick={() => setSectionSelected(item.id)}
                        className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 shadow-lg shadow-amber-500/25"
                            : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </button>
                    </div>
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
