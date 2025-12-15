import React, { useState } from "react";
import MediaPost from "./MediaPost";
import Articles from "./Articles";

const MediaFeed = () => {
  const [sectionSelected, setSectionSelected] = useState("Explore");
  return (
    <div className="w-[70%] mx-auto pt-5">
      <div className="flex flex-row gap-3 p-5">
        <h1 className="cursor-pointer">Explore</h1>
        <h1 className="cursor-pointer">Following</h1>
        <h1 className="cursor-pointer">Articles</h1>
        <h1 className="cursor-pointer">Messages</h1>
        <h1 className="cursor-pointer">Profile</h1>
      </div>
      <div className="border-2 border-purple-500">
        {sectionSelected === "Explore" ? <MediaPost></MediaPost> : null}
      </div>
    </div>
  );
};

export default MediaFeed;
