import React, { useState } from "react";
import { Search, X, Send, MoreVertical } from "lucide-react";

function MessagesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");

  // Mock data for existing chats
  const existingChats = [
    {
      id: 1,
      username: "johnDoe23",
      displayName: "John Doe",
      lastMessage: "Hey, did you see the latest crypto news?",
      timestamp: "2m ago",
      unread: 2,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      online: true,
    },
    {
      id: 2,
      username: "cryptoQueen",
      displayName: "Sarah Miller",
      lastMessage: "Thanks for the tip!",
      timestamp: "1h ago",
      unread: 0,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      online: false,
    },
    {
      id: 3,
      username: "trader_mike",
      displayName: "Mike Wilson",
      lastMessage: "Bitcoin is going crazy right now",
      timestamp: "3h ago",
      unread: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      online: true,
    },
  ];

  // Mock data for search results (new users)
  const searchResults = [
    {
      id: 4,
      username: "alexCrypto",
      displayName: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      online: true,
    },
    {
      id: 5,
      username: "emilyTrader",
      displayName: "Emily Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      online: false,
    },
  ];

  const handleSearch = (value) => {
    setSearchQuery(value);
    setIsSearching(value.length > 0);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setIsSearching(false);
    setSearchQuery("");
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Filter existing chats based on search query
  const filteredChats = existingChats.filter(
    (chat) =>
      chat.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Determine what to display
  const displaySearchResults = isSearching && filteredChats.length === 0;
  const displayFilteredChats = isSearching && filteredChats.length > 0;
  const displayAllChats = !isSearching;

  return (
    <div className="w-full h-[775px] flex bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
      {/* Left Sidebar - Chats List */}
      <div className="w-[380px] border-r border-gray-700 flex flex-col">
        {/* Search Bar Section */}
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for users..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-slate-700/50 text-white pl-10 pr-10 py-3 rounded-lg border border-gray-600/50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-600 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto">
          {/* Display all existing chats */}
          {displayAllChats && (
            <div>
              {existingChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleChatSelect(chat)}
                  className={`flex items-center gap-3 p-4 hover:bg-slate-700/50 cursor-pointer transition-colors border-b border-gray-700/50 ${
                    selectedChat?.id === chat.id ? "bg-slate-700/70" : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      src={chat.avatar}
                      alt={chat.displayName}
                      className="w-12 h-12 rounded-full ring-2 ring-slate-600"
                    />
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-slate-800"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-white font-semibold truncate">
                        {chat.displayName}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {chat.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {chat.unread}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Display filtered existing chats */}
          {displayFilteredChats && (
            <div>
              <div className="px-4 py-2 bg-slate-700/30">
                <p className="text-xs font-semibold text-gray-400 uppercase">
                  Your Chats
                </p>
              </div>
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleChatSelect(chat)}
                  className={`flex items-center gap-3 p-4 hover:bg-slate-700/50 cursor-pointer transition-colors border-b border-gray-700/50 ${
                    selectedChat?.id === chat.id ? "bg-slate-700/70" : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      src={chat.avatar}
                      alt={chat.displayName}
                      className="w-12 h-12 rounded-full ring-2 ring-slate-600"
                    />
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-slate-800"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold truncate">
                      {chat.displayName}
                    </h3>
                    <p className="text-sm text-gray-400">@{chat.username}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Display search results for new users */}
          {displaySearchResults && (
            <div>
              <div className="px-4 py-2 bg-slate-700/30">
                <p className="text-xs font-semibold text-gray-400 uppercase">
                  Start New Chat
                </p>
              </div>
              {searchResults
                .filter(
                  (user) =>
                    user.username
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    user.displayName
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                )
                .map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleChatSelect(user)}
                    className="flex items-center gap-3 p-4 hover:bg-slate-700/50 cursor-pointer transition-colors border-b border-gray-700/50"
                  >
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.displayName}
                        className="w-12 h-12 rounded-full ring-2 ring-slate-600"
                      />
                      {user.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-slate-800"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold truncate">
                        {user.displayName}
                      </h3>
                      <p className="text-sm text-gray-400">@{user.username}</p>
                    </div>
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
                      Chat
                    </button>
                  </div>
                ))}
            </div>
          )}

          {/* No results message */}
          {isSearching &&
            filteredChats.length === 0 &&
            searchResults.filter(
              (user) =>
                user.username
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                user.displayName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
            ).length === 0 && (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Search className="w-12 h-12 text-gray-600 mb-3" />
                <p className="text-gray-400">No users found</p>
                <p className="text-sm text-gray-500 mt-1">
                  Try searching with a different username
                </p>
              </div>
            )}
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.displayName}
                    className="w-10 h-10 rounded-full ring-2 ring-slate-600"
                  />
                  {selectedChat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-slate-800"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    {selectedChat.displayName}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {selectedChat.online ? "Active now" : "Offline"}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/30">
              {/* Sample messages */}
              <div className="flex justify-start">
                <div className="max-w-[70%] bg-slate-700 text-white p-3 rounded-2xl rounded-tl-sm">
                  <p className="text-sm">Hey! How's it going?</p>
                  <span className="text-xs text-gray-400 mt-1 block">
                    10:30 AM
                  </span>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[70%] bg-blue-600 text-white p-3 rounded-2xl rounded-tr-sm">
                  <p className="text-sm">
                    Pretty good! Just checking out some crypto prices
                  </p>
                  <span className="text-xs text-blue-200 mt-1 block">
                    10:32 AM
                  </span>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[70%] bg-slate-700 text-white p-3 rounded-2xl rounded-tl-sm">
                  <p className="text-sm">{selectedChat.lastMessage}</p>
                  <span className="text-xs text-gray-400 mt-1 block">
                    {selectedChat.timestamp}
                  </span>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-700 bg-slate-800/50">
              <div className="flex items-end gap-2">
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  rows="1"
                  className="flex-1 bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-gray-600/50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </>
        ) : (
          // No chat selected
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Select a chat to start messaging
              </h3>
              <p className="text-gray-400">
                Choose from your existing conversations or search for a new user
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagesSection;
