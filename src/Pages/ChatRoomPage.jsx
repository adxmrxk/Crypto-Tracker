import React from "react";
import LabelBottomNavigation from "../Components/LabelBottomNavigation";
import ChatSection from "../Components/ChatRoom/ChatSection";
import MakePostSection from "../Components/ChatRoom/MakePostSection";
import MediaFeed from "../Components/ChatRoom/MediaFeed";

{
  /* https://coinmarketcap.com/community/?type=Videos */
}

const ChatRoomPage = () => {
  return (
    <div>
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen pt-5 pb-5 bg-radial from-slate-600 via-slate-700 to-slate-800 min-h-screen">
        <MediaFeed></MediaFeed>
      </div>

      <LabelBottomNavigation></LabelBottomNavigation>
    </div>
  );
};

export default ChatRoomPage;
