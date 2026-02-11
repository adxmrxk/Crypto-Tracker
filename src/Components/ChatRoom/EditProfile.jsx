import React, { useState, useContext } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  X,
  Camera,
  User,
  AtSign,
  Trash2,
  Save,
  Loader2,
  Check,
  AlertTriangle,
} from "lucide-react";

function EditProfile({ editProfile, setEditProfile }) {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Form state initialized with current user data
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [username, setUsername] = useState(user?.username || "");
  const [avatarPreview, setAvatarPreview] = useState(null);

  // UI state
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleSave = async () => {
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const updateData = {
        displayName,
        username,
        lastEdited: new Date(),
      };

      // If there's a new avatar, include it
      if (avatarPreview) {
        updateData.profilePicture = avatarPreview;
      }

      const response = await axios.patch(
        `http://localhost:5000/api/usersProfile/${user._id}`,
        updateData
      );

      setUser(response.data);
      setSuccess("Profile updated successfully!");

      // Close modal after short delay
      setTimeout(() => {
        setEditProfile(false);
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setError("");
    setDeleting(true);

    try {
      await axios.delete(`http://localhost:5000/api/users/${user._id}`);

      // Clear user from context and localStorage
      setUser(null);
      localStorage.removeItem("userId");

      // Redirect to login/home
      navigate("/");
      setEditProfile(false);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to delete account. Please try again."
      );
      setDeleting(false);
    }
  };

  if (!editProfile) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] px-4 backdrop-blur-sm bg-black/60">
      <div className="relative bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="border-b border-slate-700 p-5 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Edit Profile</h1>

          {/* Close Button */}
          <button
            onClick={() => setEditProfile(false)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          {/* Status Messages */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm">
              <Check className="w-4 h-4 flex-shrink-0" />
              {success}
            </div>
          )}

          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className="relative group">
              <label className="cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                    />
                  ) : user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Current avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {user?.username?.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1 text-left">
                Profile Photo
              </h3>
              <p className="text-gray-400 text-sm">
                Click to upload a new photo
              </p>
            </div>
          </div>

          {/* Display Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <User className="w-4 h-4" />
              Display Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                maxLength={32}
                placeholder="Your display name"
                className="w-full bg-slate-900/50 text-white px-4 py-3 rounded-xl border border-slate-700 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                {displayName.length}/32
              </span>
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <AtSign className="w-4 h-4" />
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))
                }
                maxLength={32}
                placeholder="your_username"
                className="w-full bg-slate-900/50 text-white px-4 py-3 rounded-xl border border-slate-700 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                {username.length}/32
              </span>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="pt-4 border-t border-slate-700">
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-red-400" />
                Danger Zone
              </h3>
              <p className="text-gray-400 text-sm mb-4 text-left px-2">
                Once you delete your account, there is no going back. Your data
                will be removed.
              </p>

              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Delete Account
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deleting}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                  >
                    {deleting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Yes, Delete My Account"
                    )}
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-gray-300 text-sm font-medium rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700 p-5 flex justify-end gap-3">
          <button
            onClick={() => setEditProfile(false)}
            className="px-5 py-2.5 text-gray-400 hover:text-white hover:bg-slate-700 rounded-xl transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !displayName || !username}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
