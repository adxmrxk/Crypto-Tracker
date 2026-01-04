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
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen pt-5 bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500">
        <MediaFeed></MediaFeed>
      </div>

      <LabelBottomNavigation></LabelBottomNavigation>
    </div>
  );
};

export default ChatRoomPage;
