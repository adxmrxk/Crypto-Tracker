import React, { useState, useContext } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { UserContext } from "../../Pages/SkeletonPage";

const ChangePassword = ({ clickChangePassword, setClickChangePassword }) => {
  const { user, setUser } = useContext(UserContext);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword.length < 5) {
      setError("Password must be at least 5 characters");
      return;
    }

    setIsSaving(true);

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/settings/changePassword/${user._id}`,
        { currentPassword, newPassword }
      );
      setUser(res.data);
      setClickChangePassword(false);
      alert("Password changed successfully!");
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Current password is incorrect");
      } else {
        setError("Failed to change password. Please try again.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => setClickChangePassword(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-sm bg-black/40">
      <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 w-full max-w-md rounded-xl p-6 shadow-2xl ring-1 ring-gray-500/40 transition-transform duration-200 scale-100 hover:scale-[1.01]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-xl text-gray-100 tracking-wide">
            Change Password
          </h1>
          <X
            size={20}
            className="cursor-pointer text-gray-300 hover:text-white transition"
            onClick={handleClose}
          />
        </div>

        <p className="text-gray-300/90 mb-6 -mt-3 text-sm text-left">
          Enter your current password and choose a new secure password.
        </p>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Current Password"
              name="currentPassword"
              className="w-full outline-none bg-slate-500/50 text-gray-100 placeholder-gray-400 rounded-md px-3 py-2 pr-10 focus:ring-1 focus:ring-blue-500 focus:bg-slate-600 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              name="newPassword"
              minLength={5}
              className="w-full outline-none bg-slate-500/50 text-gray-100 placeholder-gray-400 rounded-md px-3 py-2 pr-10 focus:ring-1 focus:ring-blue-500 focus:bg-slate-600 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              name="confirmPassword"
              minLength={5}
              className="w-full outline-none bg-slate-500/50 text-gray-100 placeholder-gray-400 rounded-md px-3 py-2 pr-10 focus:ring-1 focus:ring-blue-500 focus:bg-slate-600 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="bg-slate-500/40 hover:bg-slate-500/60 cursor-pointer text-gray-200 px-5 py-2 rounded-2xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-gradient-to-r from-blue-400 to-purple-500 text-white cursor-pointer font-semibold px-6 py-2 rounded-2xl hover:opacity-90 transition disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;