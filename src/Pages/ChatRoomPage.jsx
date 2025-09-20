import React from 'react'
import LabelBottomNavigation from '../Components/LabelBottomNavigation'
import ChatSection from '../Components/ChatRoom/ChatSection'
import ExploreServersSection from '../Components/ChatRoom/ExploreServersSection'

const ChatRoomPage = () => {
  return (
    <div>
        {/* https://coinmarketcap.com/community/?type=Videos */}
        <ExploreServersSection></ExploreServersSection>
        <ChatSection></ChatSection>
        <LabelBottomNavigation></LabelBottomNavigation>
        
    </div>
  )
}

export default ChatRoomPage