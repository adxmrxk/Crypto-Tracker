import React, { useContext, useState } from "react";
import { X, CheckCircle } from "lucide-react";
import axios from "axios";
import { UserContext } from "../../Pages/SkeletonPage";

const ChangeRecoveryEmail = ({ clickChangeRecoveryEmail, setClickChangeRecoveryEmail }) => {
  const { user, setUser } = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [savedEmail, setSavedEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecoveryEmail = e.target.newRecoveryEmail.value;
    const confirmRecoveryEmail = e.target.confirmRecoveryEmail.value;

    if (newRecoveryEmail !== confirmRecoveryEmail) {
      alert("Email addresses do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/settings/changeRecoveryEmail/${user._id}`,
        { recoveryEmail: newRecoveryEmail }
      );
      const updatedUser = res.data;
      setUser(updatedUser);
      setSavedEmail(newRecoveryEmail);
      setShowSuccess(true);
    } catch (error) {
      alert("Failed to update recovery email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    setClickChangeRecoveryEmail(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-sm bg-black/40">
      <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 w-full max-w-md rounded-xl p-6 shadow-2xl ring-1 ring-gray-500/40 transition-transform duration-200 scale-100 hover:scale-[1.01]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-xl text-gray-100 tracking-wide">
            Change Recovery Email
          </h1>
          <X
            size={20}
            className="cursor-pointer text-gray-300 hover:text-white transition"
            onClick={handleClose}
          />
        </div>

        {showSuccess ? (
          <div className="text-left">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <CheckCircle size={24} className="text-green-400" />
                <div>
                  <p className="text-left text-green-400 font-medium">Recovery Email Updated</p>
                  <p className="text-left text-gray-300 text-sm mt-1">A confirmation email has been sent to:</p>
                  <p className="text-left text-blue-400 text-sm font-medium">{savedEmail}</p>
                </div>
              </div>
            </div>

            <p className="text-left text-gray-300/90 mb-4 text-sm">
              Please check your inbox to verify that you received the confirmation email. If you don't see it, check your spam folder.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="bg-gradient-to-r from-blue-400 to-purple-500 text-white cursor-pointer font-semibold px-6 py-2 rounded-2xl hover:opacity-90 transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-300/90 mb-6 -mt-3 text-sm text-left">
              Your recovery email will be used to reset your password if you forget it. A confirmation email will be sent to verify the address.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="New Recovery Email"
                name="newRecoveryEmail"
                defaultValue={user?.settings?.recoveryEmail || ""}
                className="outline-none bg-slate-500/50 text-gray-100 placeholder-gray-400 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:bg-slate-600 transition"
                required
                disabled={isSubmitting}
              />
              <input
                type="email"
                placeholder="Confirm Recovery Email"
                name="confirmRecoveryEmail"
                className="outline-none bg-slate-500/50 text-gray-100 placeholder-gray-400 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:bg-slate-600 transition"
                required
                disabled={isSubmitting}
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="bg-slate-500/40 hover:bg-slate-500/60 cursor-pointer text-gray-200 px-5 py-2 rounded-2xl transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-400 to-purple-500 text-white cursor-pointer font-semibold px-6 py-2 rounded-2xl hover:opacity-90 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Save"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ChangeRecoveryEmail;