import React from 'react'
import LabelBottomNavigation from '../Components/LabelBottomNavigation'
import TextAreaNavigation from '../Components/TextAreaNavigation'
import ChatSection from '../Components/ChatRoom/ChatSection'
import ExploreServersSection from '../Components/ChatRoom/ExploreServersSection'

const ChatRoomPage = () => {
  return (
    <div>
        <ExploreServersSection></ExploreServersSection>
        <ChatSection></ChatSection>
        <LabelBottomNavigation></LabelBottomNavigation>
        
    </div>
  )
}

export default ChatRoomPage