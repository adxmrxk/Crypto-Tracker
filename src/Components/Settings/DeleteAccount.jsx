import React, { useState, useContext } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { UserContext } from "../../Pages/SkeletonPage";
import { useNavigate } from "react-router-dom";

const DeleteAccount = ({ clickDeleteAccount, setClickDeleteAccount }) => {
  const { user, setUser } = useContext(UserContext);
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (confirmText !== "DELETE") {
      alert("Please type DELETE to confirm");
      return;
    }

    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/api/users/${user._id}`);
      localStorage.removeItem("cryptoUserId");
      localStorage.removeItem("cryptoLoginTime");
      setUser(null);
      setClickDeleteAccount(false);
      navigate("/");
    } catch (error) {
      alert("Failed to delete account. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => setClickDeleteAccount(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-sm bg-black/40">
      <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 w-full max-w-md rounded-xl p-6 shadow-2xl ring-1 ring-gray-500/40 transition-transform duration-200 scale-100 hover:scale-[1.01]">

        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-xl text-gray-100 tracking-wide">Delete Account</h1>
          <X size={20} className="cursor-pointer text-gray-300 hover:text-white transition" onClick={handleClose} />
        </div>

        <p className="text-gray-300/90 mb-6 -mt-3 text-sm text-left w-[350px]">
          This will permanently delete your account and all associated data. This action cannot be undone.
        </p>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Type DELETE to confirm"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="outline-none bg-slate-500/50 text-gray-100 placeholder-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:bg-slate-600 transition"
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
              type="button"
              onClick={handleDelete}
              disabled={confirmText !== "DELETE" || isDeleting}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white cursor-pointer font-semibold px-6 py-2 rounded-2xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
