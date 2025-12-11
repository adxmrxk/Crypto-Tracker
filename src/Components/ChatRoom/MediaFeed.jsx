import React from "react";

const MediaFeed = () => {
  return (
    <div className="w-[70%] border-2 mx-auto pt-5">
      <div className="flex flex-row gap-3 p-5">
        <h1 className="cursor-pointer">Explore</h1>
        <h1 className="cursor-pointer">Following</h1>
        <h1 className="cursor-pointer">Messages</h1>
        <h1 className="cursor-pointer">Profile</h1>
      </div>
      <div></div>
    </div>
  );
};

export default MediaFeed;
