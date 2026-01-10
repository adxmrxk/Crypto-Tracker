import React, { useState } from "react";
import { Compass, Users, User } from "lucide-react";
import MediaPost from "./MediaPost";
import ArticlesSection from "./ArticlesSection";
import FollowingSection from "./FollowingSection";
import MakePostSection from "./MakePostSection";
import MessagesSection from "./MessagesSection";
import ProfileSection from "./ProfileSection";
import SearchProfiles from "./SearchProfiles";

const MediaFeed = () => {
  const [sectionSelected, setSectionSelected] = useState("Explore");

  const tabs = [
    { id: "Explore", label: "Explore", icon: Compass },
    { id: "Following", label: "Following", icon: Users },
    { id: "Profile", label: "Profile", icon: User },
  ];

  return (
    <div className="pt-5">
      {(sectionSelected === "Explore" || sectionSelected === "Following") && (
        <MakePostSection />
      )}
      {sectionSelected === "Profile" && <SearchProfiles />}

      <div className="w-[70%] mx-auto pt-5">
        {/* Navigation Tabs */}
        <div className="flex gap-1 bg-slate-800/50 p-1 rounded-xl border border-slate-700 w-fit mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSectionSelected(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  sectionSelected === tab.id
                    ? "bg-amber-500 text-slate-900"
                    : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div>
          {sectionSelected === "Explore" && <MediaPost />}
          {sectionSelected === "Following" && <FollowingSection />}
          {sectionSelected === "Profile" && <ProfileSection />}
        </div>
      </div>
    </div>
  );
};

export default MediaFeed;
