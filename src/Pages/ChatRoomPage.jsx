import React from "react";
import LabelBottomNavigation from "../Components/LabelBottomNavigation";
import ChatSection from "../Components/ChatRoom/ChatSection";
import ExploreServersSection from "../Components/ChatRoom/ExploreServersSection";
import MakePostSection from "../Components/ChatRoom/MakePostSection";
import MediaFeed from "../Components/ChatRoom/MediaFeed";
import SideBarNav from "../Components/ChatRoom/SideNavBar";

{
  /* https://coinmarketcap.com/community/?type=Videos */
}

const ChatRoomPage = () => {
  return (
    <div>
      <SideBarNav></SideBarNav>
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-to-br from-green-300 via-green-400 to-green-500">
        <MakePostSection></MakePostSection>
      </div>
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-to-br from-red-300 via-red-400 to-red-500">
        <MediaFeed></MediaFeed>
      </div>

      <LabelBottomNavigation></LabelBottomNavigation>
    </div>
  );
};

export default ChatRoomPage;
