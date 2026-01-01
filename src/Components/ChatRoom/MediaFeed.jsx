import React, { useState } from "react";
import MediaPost from "./MediaPost";
import ArticlesSection from "./ArticlesSection";
import FollowingSection from "./FollowingSection";
import MakePostSection from "./MakePostSection";
import MessagesSection from "./MessagesSection";
import ProfileSection from "./ProfileSection";

const MediaFeed = () => {
  const [sectionSelected, setSectionSelected] = useState("Explore");
  return (
    <div className="pt-5">
      {(sectionSelected === "Explore" || sectionSelected === "Following") && (
        <MakePostSection />
      )}
      <div className="w-[70%] mx-auto pt-5">
        <div className="flex flex-row gap-3">
          <h1
            className="cursor-pointer "
            onClick={() => {
              setSectionSelected("Explore");
            }}
          >
            Explore
          </h1>
          <h1
            className="cursor-pointer "
            onClick={() => {
              setSectionSelected("Following");
            }}
          >
            Following
          </h1>

          <h1
            className="cursor-pointer "
            onClick={() => {
              setSectionSelected("Message");
            }}
          >
            Messages
          </h1>
          <h1
            className="cursor-pointer"
            onClick={() => {
              setSectionSelected("Profile");
            }}
          >
            Profile
          </h1>
        </div>
        <div className="mb-6 mt-3 w-[66%]">
          <hr className="border-gray-400 my-1"></hr>
        </div>
        <div className="">
          {sectionSelected === "Explore" ? <MediaPost></MediaPost> : null}
          {sectionSelected === "Following" ? (
            <FollowingSection></FollowingSection>
          ) : null}

          {sectionSelected === "Message" ? (
            <MessagesSection></MessagesSection>
          ) : null}
          {sectionSelected === "Profile" ? (
            <ProfileSection></ProfileSection>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MediaFeed;
