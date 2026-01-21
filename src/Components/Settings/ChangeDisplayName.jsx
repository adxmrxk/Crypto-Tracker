import React from "react";
import { X } from "lucide-react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../Pages/SkeletonPage";

const ChangeDisplayName = ({ clickChangeDisplayName, setClickChangeDisplayName }) => {
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDisplayNameValue = e.target.newDisplayName.value;

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/settings/changeDisplayName/${user._id}`,
        { displayName: newDisplayNameValue }
      );
      const updatedUser = res.data;
      setUser(updatedUser);
      setClickChangeDisplayName(false);
    } catch (error) {
      alert("Failed to update display name. Please try again.");
    }
  };

  const handleClose = () => setClickChangeDisplayName(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-sm bg-black/40">
      <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 w-full max-w-md rounded-xl p-6 shadow-2xl ring-1 ring-gray-500/40 transition-transform duration-200 scale-100 hover:scale-[1.01]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-xl text-gray-100 tracking-wide">
            Change your Display Name
          </h1>
          <X
            size={20}
            className="cursor-pointer text-gray-300 hover:text-white transition"
            onClick={handleClose}
          />
        </div>

        <p className="text-gray-300/90 mb-6 -mt-3 text-sm text-left w-[300px]">
          Your display name is shown on your profile and posts. It can be different from your username.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="New Display Name"
            name="newDisplayName"
            defaultValue={user?.displayName || user?.username}
            minLength={2}
            maxLength={32}
            className="outline-none bg-slate-500/50 text-gray-100 placeholder-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:bg-slate-600 transition"
            required
          />

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
              className="bg-gradient-to-r from-blue-400 to-purple-500 text-white cursor-pointer font-semibold px-6 py-2 rounded-2xl hover:opacity-90 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeDisplayName;
