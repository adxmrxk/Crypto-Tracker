import React from "react";

const MakePostSection = () => {
  return (
    <div className="w-[70%] border-2 mx-auto">
      <div className="flex flex-col border-blue-500">
        <div className="flex flex-row items-center p-5">
          <div className="bg-gray-100 w-[64px] h-[64px] rounded-full"></div>
          <div className="border border-blue-600 w-[65%] ml-2 h-[50px] flex items-center">
            <h1 className="text-md text-left">
              How do you feel about the markets today? Share your ideas!
            </h1>
          </div>
        </div>
        <div className="flex flex-row justify-between ">
          <div className="border border-red-800 w-fit ml-22 flex flex-row gap-3">
            <h1>Image</h1>
            <h1>GIF</h1>
            <h1>Emoji</h1>
            <h1>Poll</h1>
          </div>
          <div className="mr-108">
            <button>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePostSection;
