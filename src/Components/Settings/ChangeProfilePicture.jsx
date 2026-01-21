import React, { useState, useContext } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { UserContext } from "../../Pages/SkeletonPage";

const ChangeProfilePicture = ({ clickChangeProfilePicture, setClickChangeProfilePicture }) => {
  const { user, setUser } = useContext(UserContext);
  const [preview, setPreview] = useState(user?.profilePicture || "");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!preview) {
      alert("Please select an image");
      return;
    }

    setUploading(true);
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/settings/changeProfilePicture/${user._id}`,
        { profilePicture: preview }
      );
      const updatedUser = res.data;
      setUser(updatedUser);
      setClickChangeProfilePicture(false);
    } catch (error) {
      alert("Failed to update profile picture. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    setUploading(true);
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/settings/changeProfilePicture/${user._id}`,
        { profilePicture: "" }
      );
      const updatedUser = res.data;
      setUser(updatedUser);
      setClickChangeProfilePicture(false);
    } catch (error) {
      alert("Failed to remove profile picture. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => setClickChangeProfilePicture(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-sm bg-black/40">
      <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 w-full max-w-md rounded-xl p-6 shadow-2xl ring-1 ring-gray-500/40 transition-transform duration-200 scale-100 hover:scale-[1.01]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-xl text-gray-100 tracking-wide">
            Change Profile Picture
          </h1>
          <X
            size={20}
            className="cursor-pointer text-gray-300 hover:text-white transition"
            onClick={handleClose}
          />
        </div>

        <p className="text-gray-300/90 mb-6 -mt-3 text-sm text-left">
          Upload a new profile picture. Maximum file size is 5MB.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex justify-center">
            <div className="relative">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-slate-500"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-slate-500/50 flex items-center justify-center border-4 border-slate-500">
                  <span className="text-gray-400 text-4xl">
                    {user?.username?.charAt(0)?.toUpperCase() || "?"}
                  </span>
                </div>
              )}
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="outline-none bg-slate-500/50 text-gray-100 rounded-md px-3 py-2 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-blue-500 file:text-white file:cursor-pointer hover:file:bg-blue-600 transition"
          />

          <div className="flex justify-between gap-3 mt-4">
            {user?.profilePicture && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading}
                className="bg-red-500/20 hover:bg-red-500/40 cursor-pointer text-red-400 px-5 py-2 rounded-2xl transition disabled:opacity-50"
              >
                Remove
              </button>
            )}
            <div className="flex gap-3 ml-auto">
              <button
                type="button"
                onClick={handleClose}
                className="bg-slate-500/40 hover:bg-slate-500/60 cursor-pointer text-gray-200 px-5 py-2 rounded-2xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="bg-gradient-to-r from-blue-400 to-purple-500 text-white cursor-pointer font-semibold px-6 py-2 rounded-2xl hover:opacity-90 transition disabled:opacity-50"
              >
                {uploading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
