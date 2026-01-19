import React, { useState, useRef, useEffect, useContext } from "react";
import { FiSearch } from "react-icons/fi";
import { X, UserPlus, UserCheck, Users, Calendar, FileText, MessageSquare } from "lucide-react";
import { UserContext } from "../../Pages/SkeletonPage";
import axios from "axios";

function SearchProfiles() {
  const { user, setUser } = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Fetch all users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setAllUsers(response.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Check if current user is following target user
  const isFollowing = (targetUserId) => {
    return user?.socials?.following?.some(
      (id) => id.toString() === targetUserId?.toString()
    );
  };

  // Handle follow/unfollow
  const handleFollow = async (targetUserId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/follow/${user._id}`,
        { targetUserId }
      );
      setUser(response.data);

      // Update the selectedUser's followers count locally
      setSelectedUser((prev) => {
        if (!prev) return prev;
        const wasFollowing = isFollowing(targetUserId);
        return {
          ...prev,
          socials: {
            ...prev.socials,
            followers: wasFollowing
              ? prev.socials.followers.filter((id) => id.toString() !== user._id.toString())
              : [...(prev.socials.followers || []), user._id],
          },
        };
      });
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };

  // Filter suggestions based on input
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length > 0 && allUsers.length > 0) {
      const filtered = allUsers.filter(u =>
        u._id !== user?._id && (
          u.displayName?.toLowerCase().includes(value.toLowerCase()) ||
          u.username?.toLowerCase().includes(value.toLowerCase()) ||
          u.bio?.toLowerCase().includes(value.toLowerCase())
        )
      ).slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = (userProfile) => {
    setSelectedUser(userProfile);
    setInputValue("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date) => {
    if (!date) return "Unknown";
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-xs h-[75px] w-[890px] py-3 px-4 ml-71 flex items-center relative">
      <form className="w-full" onSubmit={(e) => e.preventDefault()}>
        <div className="relative w-full">
          {/* Icon */}
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50 text-xl pointer-events-none" />

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            placeholder="Search profiles..."
            value={inputValue}
            onChange={handleChange}
            onFocus={() => inputValue.length > 0 && setShowSuggestions(true)}
            className="w-full h-[45px] pl-10 pr-3 rounded-md outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute left-4 right-4 top-[70px] z-50 bg-slate-800 border border-slate-600 rounded-lg shadow-lg overflow-hidden"
        >
          {suggestions.map((userProfile) => (
            <div
              key={userProfile._id}
              onClick={() => handleSelectSuggestion(userProfile)}
              className="px-4 py-3 hover:bg-slate-700 cursor-pointer text-gray-100 transition-colors border-b border-slate-700 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                  {userProfile.profilePicture && userProfile.profilePicture !== ""
                    ? userProfile.profilePicture
                    : userProfile.username?.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{userProfile.displayName}</span>
                    <span className="text-gray-500 text-sm">@{userProfile.username}</span>
                  </div>
                  {userProfile.bio && (
                    <p className="text-gray-400 text-sm truncate">{userProfile.bio}</p>
                  )}
                </div>
                <div className="text-gray-500 text-xs flex-shrink-0">
                  {userProfile.socials?.followers?.length || 0} followers
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {showSuggestions && inputValue.length > 0 && suggestions.length === 0 && (
        <div
          ref={suggestionsRef}
          className="absolute left-4 right-4 top-[70px] z-50 bg-slate-800 border border-slate-600 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="px-4 py-3 text-gray-400 text-center">
            No profiles found matching "{inputValue}"
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-sm bg-black/60">
          <div className="relative bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
            {/* Modal Header */}
            <div className="border-b border-slate-700 p-4 flex items-center justify-between">
              <h1 className="text-lg font-bold text-white">Profile</h1>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Profile Content */}
            <div className="p-6">
              {/* Banner */}
              <div className="h-20 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-blue-500/20 rounded-xl -mx-2 -mt-2 mb-4"></div>

              {/* Avatar */}
              <div className="flex justify-center -mt-14 mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-2xl font-bold text-white border-4 border-slate-800 shadow-lg">
                  {selectedUser.profilePicture && selectedUser.profilePicture !== ""
                    ? selectedUser.profilePicture
                    : selectedUser.username?.slice(0, 2).toUpperCase()}
                </div>
              </div>

              {/* Name & Username */}
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-white">{selectedUser.displayName}</h2>
                <p className="text-gray-400">@{selectedUser.username}</p>
              </div>

              {/* Bio */}
              {selectedUser.bio && (
                <p className="text-gray-300 text-center mb-4 px-4">{selectedUser.bio}</p>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-700/30 rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
                    <Users className="w-4 h-4" />
                  </div>
                  <p className="text-white font-bold">{selectedUser.socials?.followers?.length || 0}</p>
                  <p className="text-gray-500 text-xs">Followers</p>
                </div>
                <div className="bg-slate-700/30 rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
                    <Users className="w-4 h-4" />
                  </div>
                  <p className="text-white font-bold">{selectedUser.socials?.following?.length || 0}</p>
                  <p className="text-gray-500 text-xs">Following</p>
                </div>
                <div className="bg-slate-700/30 rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                    <FileText className="w-4 h-4" />
                  </div>
                  <p className="text-white font-bold">{selectedUser.socials?.posts?.length || 0}</p>
                  <p className="text-gray-500 text-xs">Posts</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {formatDate(selectedUser.createdAt)}</span>
                </div>
                {selectedUser.socials?.comments?.length > 0 && (
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MessageSquare className="w-4 h-4" />
                    <span>{selectedUser.socials.comments.length} comments</span>
                  </div>
                )}
              </div>

              {/* Follow/Unfollow Button */}
              {selectedUser._id !== user?._id && (
                <button
                  onClick={() => handleFollow(selectedUser._id)}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                    isFollowing(selectedUser._id)
                      ? "bg-slate-700 text-white hover:bg-red-500/20 hover:text-red-400 border border-slate-600"
                      : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900"
                  }`}
                >
                  {isFollowing(selectedUser._id) ? (
                    <>
                      <UserCheck className="w-5 h-5" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      Follow
                    </>
                  )}
                </button>
              )}

              {/* If viewing own profile */}
              {selectedUser._id === user?._id && (
                <div className="text-center text-gray-500 text-sm">
                  This is your profile
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchProfiles;
