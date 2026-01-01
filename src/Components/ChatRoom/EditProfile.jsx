import React, { useState } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";

function EditProfile({ editProfile, setEditProfile }) {
  const [displayName, setDisplayName] = useState("w5auovwtugco");
  const [username, setUsername] = useState("w5auovwtugco");
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Frontend only - no API calls
    console.log("Saving profile:", { displayName, username, avatarPreview });
    setEditProfile(false);
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      console.log("Account deletion requested");
      // Frontend only - no actual deletion
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-sm bg-black/40">
      <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 w-full max-w-2xl rounded-xl shadow-2xl ring-1 ring-gray-500/40 overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-600/50 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setEditProfile(false)}
              className="p-2 hover:bg-slate-600/50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-300" />
            </button>
            <h1 className="text-2xl font-semibold text-white">
              Edit My Profile
            </h1>
          </div>

          {/* Profile Completion Indicator */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-gray-600"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - 0.75)}`}
                  className="text-blue-500 transition-all duration-300"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold text-white">75%</span>
              </div>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-white">Profile Complete</p>
              <p className="text-xs text-gray-400">Keep going!</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* About me section */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-6 text-left">
              About me
            </h2>

            {/* Avatar Section */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-white mb-3 text-left">
                Your Avatar
              </label>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <label className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden ring-4 ring-slate-600 cursor-pointer group">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Avatar preview"
                        className="w-full h-full object-cover group-hover:opacity-70 transition-opacity"
                      />
                    ) : (
                      <div className="text-white text-2xl font-bold group-hover:opacity-70 transition-opacity">
                        @
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity rounded-full"></div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
                ={" "}
                <div className="text-right mt-10">
                  <p className="text-xs font-medium text-gray-400">
                    Last edited
                  </p>
                  <p className="text-sm text-gray-300">Dec 20, 2024</p>
                </div>
              </div>
            </div>

            {/* Display Name */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-white mb-2 text-left">
                Display name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  maxLength={20}
                  className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-gray-600/50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  {displayName.length}/20
                </span>
              </div>
            </div>

            {/* Username */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-white mb-2 text-left">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  maxLength={20}
                  className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-gray-600/50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  {username.length}/20
                </span>
              </div>
              <p className="text-xs text-left text-gray-400 mt-2">
                * Username can only be changed once per 7 days
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-600/50 my-6"></div>

          {/* Delete Account Section */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-red-400" />
              Danger Zone
            </h3>
            <p className="text-sm text-left text-gray-300 mb-3">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-600/50 p-6 flex justify-end gap-3">
          <button
            onClick={() => setEditProfile(false)}
            className="px-6 py-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
