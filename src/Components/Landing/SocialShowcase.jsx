import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Users,
  Sparkles,
  Send,
  Wifi,
  Battery,
  Signal,
  Mic,
  Camera,
  Smile,
} from "lucide-react";

const SocialShowcase = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Great analysis! I think BTC will hit 65k by...";

  // Typing animation effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        // Reset and start over after a pause
        setTimeout(() => {
          index = 0;
          setTypedText("");
        }, 2000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Fake posts data
  const fakePosts = [
    {
      id: 1,
      author: "CryptoWhale",
      initials: "CW",
      time: "2h ago",
      content:
        "Bitcoin just broke through the $58k resistance! This bull run is just getting started. What are your thoughts?",
      likes: 247,
      dislikes: 12,
      comments: 89,
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      id: 2,
      author: "DeFiHunter",
      initials: "DH",
      time: "5h ago",
      content:
        "Just discovered an amazing yield farming opportunity. Always DYOR but the APY looks promising!",
      likes: 182,
      dislikes: 8,
      comments: 45,
      gradient: "from-purple-400 to-pink-500",
    },
  ];

  // Keyboard keys layout
  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M", "⌫"],
    ["123", "space", "return"],
  ];

  return (
    <div data-aos="fade-left" data-aos-offset="200" className="flex justify-center items-center">
      {/* Phone Frame */}
      <div className="relative">
        {/* Phone Outer Frame - Titanium/Metal Look */}
        <div className="relative rounded-[55px] p-[3px] bg-gradient-to-b from-[#2a2a2e] via-[#1a1a1c] to-[#0d0d0e] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)]">
          {/* Metal Edge Highlight */}
          <div className="absolute inset-0 rounded-[55px] bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>

          {/* Inner Metal Frame */}
          <div className="relative rounded-[52px] p-[10px] bg-gradient-to-b from-[#1c1c1e] to-[#0c0c0d]">
            {/* Inner Edge Shadow */}
            <div className="absolute inset-[3px] rounded-[49px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] pointer-events-none z-10"></div>

            {/* Screen Bezel */}
            <div className="relative bg-black rounded-[42px] overflow-hidden ring-1 ring-black/50">
              {/* Glass Reflection Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none z-30"></div>

              {/* Status Bar */}
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 pt-4 pb-2 bg-gradient-to-b from-slate-900/80 to-transparent">
                <span className="text-white text-xs font-semibold">9:41</span>
                <div className="flex items-center gap-1.5">
                  <Signal className="w-3.5 h-3.5 text-white" />
                  <Wifi className="w-3.5 h-3.5 text-white" />
                  <Battery className="w-5 h-3.5 text-white" />
                </div>
              </div>

              {/* Phone Screen Content */}
              <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 w-[320px] h-[620px] overflow-hidden flex flex-col pt-8">
              {/* Content Area - No Scroll */}
              <div className="flex-1 overflow-hidden p-4 pb-2">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-100 font-semibold text-sm">Community</h3>
                      <p className="text-gray-500 text-xs">Join the conversation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/80 border border-slate-700 rounded-full">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span className="text-amber-400 font-semibold text-xs">Live</span>
                  </div>
                </div>

                {/* Single Post with Comments */}
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 mb-3">
                  {/* Post Header */}
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-[10px] font-bold text-white">
                      CW
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-100 font-medium text-xs text-left">CryptoWhale</h4>
                      <p className="text-gray-500 text-[10px] text-left">2h ago</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-300 text-xs mb-2.5 leading-relaxed text-left">
                    Bitcoin just broke through the $58k resistance! This bull run is just getting started 🚀
                  </p>

                  {/* Post Actions */}
                  <div className="flex items-center gap-3 mb-3">
                    <button className="flex items-center gap-1 text-[10px] text-emerald-400">
                      <ThumbsUp className="w-3 h-3 fill-current" />
                      <span>247</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-400 text-[10px]">
                      <ThumbsDown className="w-3 h-3" />
                      <span>12</span>
                    </button>
                    <button className="flex items-center gap-1 text-blue-400 text-[10px]">
                      <MessageCircle className="w-3 h-3 fill-current" />
                      <span>89</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-400 text-[10px] ml-auto">
                      <Share2 className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Comments Section */}
                  <div className="border-t border-slate-700/50 pt-2.5 space-y-2.5">
                    {/* Existing Comment */}
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0">
                        DH
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-gray-200 text-[10px] font-medium">DeFiHunter</span>
                          <span className="text-gray-600 text-[8px]">1h ago</span>
                        </div>
                        <p className="text-gray-400 text-[10px] text-left">Agreed! The momentum is incredible right now 📈</p>
                      </div>
                    </div>

                    {/* Another Comment */}
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0">
                        SA
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-gray-200 text-[10px] font-medium">SatoshiApe</span>
                          <span className="text-gray-600 text-[8px]">45m ago</span>
                        </div>
                        <p className="text-gray-400 text-[10px] text-left">Just added more to my position! 💎🙌</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Second Post Preview */}
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 opacity-60">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-[10px] font-bold text-white">
                      BD
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-100 font-medium text-xs text-left">BlockchainDev</h4>
                      <p className="text-gray-500 text-[10px] text-left">3h ago</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs text-left">New smart contract audit complete...</p>
                </div>
              </div>

              {/* Comment Input Area - Fixed at bottom above keyboard */}
              <div className="bg-slate-900/95 border-t border-slate-700/50 p-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0">
                    YU
                  </div>
                  <div className="flex-1 bg-slate-800 rounded-full px-3 py-2 flex items-center gap-2 border border-amber-500/50">
                    <span className="text-gray-200 text-xs text-left flex-1">
                      {typedText}
                      <span className="inline-block w-0.5 h-3.5 bg-amber-400 ml-0.5 animate-pulse"></span>
                    </span>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                    <Send className="w-4 h-4 text-slate-900" />
                  </button>
                </div>
              </div>

              {/* iOS Keyboard - Compact */}
              <div className="bg-[#D1D3D9] px-1 pt-1.5 pb-0.5">
                {/* Prediction Bar */}
                <div className="flex items-center justify-around mb-1 px-1">
                  <span className="text-gray-600 text-[8px] px-2 py-0.5 bg-white rounded shadow-sm">"month"</span>
                  <span className="text-gray-600 text-[8px] px-2 py-0.5 bg-white rounded shadow-sm">"end"</span>
                  <span className="text-gray-600 text-[8px] px-2 py-0.5 bg-white rounded shadow-sm">"of"</span>
                </div>

                {/* Row 1 */}
                <div className="flex justify-center gap-[3px] mb-[4px]">
                  {keyboardRows[0].map((key) => (
                    <div
                      key={key}
                      className="w-[22px] h-[28px] bg-white rounded shadow-sm flex items-center justify-center text-[10px] font-normal text-black"
                    >
                      {key}
                    </div>
                  ))}
                </div>

                {/* Row 2 */}
                <div className="flex justify-center gap-[3px] mb-[4px]">
                  {keyboardRows[1].map((key) => (
                    <div
                      key={key}
                      className="w-[22px] h-[28px] bg-white rounded shadow-sm flex items-center justify-center text-[10px] font-normal text-black"
                    >
                      {key}
                    </div>
                  ))}
                </div>

                {/* Row 3 */}
                <div className="flex justify-center gap-[3px] mb-[4px]">
                  <div className="w-[30px] h-[28px] bg-[#A8ABB3] rounded shadow-sm flex items-center justify-center text-[9px] font-medium text-black">
                    ⇧
                  </div>
                  {keyboardRows[2].slice(0, -1).map((key) => (
                    <div
                      key={key}
                      className="w-[22px] h-[28px] bg-white rounded shadow-sm flex items-center justify-center text-[10px] font-normal text-black"
                    >
                      {key}
                    </div>
                  ))}
                  <div className="w-[30px] h-[28px] bg-[#A8ABB3] rounded shadow-sm flex items-center justify-center text-[11px] text-black">
                    ⌫
                  </div>
                </div>

                {/* Row 4 */}
                <div className="flex justify-center gap-[3px]">
                  <div className="w-[32px] h-[28px] bg-[#A8ABB3] rounded shadow-sm flex items-center justify-center text-[8px] font-medium text-black">
                    123
                  </div>
                  <div className="w-[24px] h-[28px] bg-[#A8ABB3] rounded shadow-sm flex items-center justify-center">
                    <Smile className="w-3 h-3 text-black" />
                  </div>
                  <div className="flex-1 h-[28px] bg-white rounded shadow-sm flex items-center justify-center text-[9px] text-gray-500 mx-0.5">
                    space
                  </div>
                  <div className="w-[52px] h-[28px] bg-[#A8ABB3] rounded shadow-sm flex items-center justify-center text-[8px] font-medium text-black">
                    return
                  </div>
                </div>
              </div>

              {/* Home Indicator - on keyboard */}
              <div className="bg-[#D1D3D9] pb-1.5 pt-1 flex justify-center">
                <div className="w-24 h-1 bg-black/30 rounded-full"></div>
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient Glow Effect */}
        <div className="absolute -inset-8 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-cyan-500/10 rounded-[70px] blur-3xl -z-10"></div>
        <div className="absolute -inset-2 bg-gradient-to-b from-white/5 to-transparent rounded-[60px] blur-xl -z-10"></div>

        {/* Side Buttons - Left Side */}
        {/* Silent/Ring Switch */}
        <div className="absolute -left-[2px] top-[120px] w-[3px] h-8 bg-gradient-to-b from-[#3a3a3c] via-[#2a2a2c] to-[#1a1a1c] rounded-l-sm shadow-[-2px_0_4px_rgba(0,0,0,0.3)]"></div>
        {/* Volume Up */}
        <div className="absolute -left-[2px] top-[170px] w-[3px] h-14 bg-gradient-to-b from-[#3a3a3c] via-[#2a2a2c] to-[#1a1a1c] rounded-l-sm shadow-[-2px_0_4px_rgba(0,0,0,0.3)]"></div>
        {/* Volume Down */}
        <div className="absolute -left-[2px] top-[240px] w-[3px] h-14 bg-gradient-to-b from-[#3a3a3c] via-[#2a2a2c] to-[#1a1a1c] rounded-l-sm shadow-[-2px_0_4px_rgba(0,0,0,0.3)]"></div>

        {/* Side Button - Right Side (Power) */}
        <div className="absolute -right-[2px] top-[180px] w-[3px] h-20 bg-gradient-to-b from-[#3a3a3c] via-[#2a2a2c] to-[#1a1a1c] rounded-r-sm shadow-[2px_0_4px_rgba(0,0,0,0.3)]"></div>
      </div>
    </div>
  );
};

export default SocialShowcase;
