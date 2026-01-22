import React, { useState, useContext } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { UserContext } from "../../Pages/SkeletonPage";

const ConnectGoogle = ({ clickConnectGoogle, setClickConnectGoogle }) => {
  const { user, setUser } = useContext(UserContext);
  const [googleEmail, setGoogleEmail] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const isConnected = user?.settings?.connectedWithGoogle;

  const handleConnect = async (e) => {
    e.preventDefault();
    if (!googleEmail) {
      alert("Please enter your Google email");
      return;
    }

    setIsConnecting(true);
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/settings/connectGoogle/${user._id}`,
        {
          googleEmail: googleEmail,
          connectedWithGoogle: true
        }
      );
      const updatedUser = res.data;
      setUser(updatedUser);
      setClickConnectGoogle(false);
    } catch (error) {
      alert("Failed to connect Google account. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    setIsConnecting(true);
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/settings/connectGoogle/${user._id}`,
        {
          googleEmail: "",
          connectedWithGoogle: false
        }
      );
      const updatedUser = res.data;
      setUser(updatedUser);
      setClickConnectGoogle(false);
    } catch (error) {
      alert("Failed to disconnect Google account. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleClose = () => setClickConnectGoogle(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-sm bg-black/40">
      <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 w-full max-w-md rounded-xl p-6 shadow-2xl ring-1 ring-gray-500/40 transition-transform duration-200 scale-100 hover:scale-[1.01]">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-left font-semibold text-xl text-gray-100 tracking-wide">
            {isConnected ? "Google Account Connected" : "Connect Google Account"}
          </h1>
          <X
            size={20}
            className="cursor-pointer text-gray-300 hover:text-white transition"
            onClick={handleClose}
          />
        </div>

        {isConnected ? (
          <div className="text-left">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
              <p className="text-left text-green-400 font-medium">Connected</p>
              <p className="text-left text-gray-300 text-sm mt-1">{user?.settings?.googleEmail || "Google account linked"}</p>
            </div>

            <p className="text-left text-gray-300/90 mb-4 text-sm">
              Your Google account is connected. You can use it to sign in quickly to CryptoScope.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="bg-slate-500/40 hover:bg-slate-500/60 cursor-pointer text-gray-200 px-5 py-2 rounded-2xl transition"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleDisconnect}
                disabled={isConnecting}
                className="bg-red-500/20 hover:bg-red-500/40 text-red-400 cursor-pointer font-semibold px-6 py-2 rounded-2xl transition disabled:opacity-50"
              >
                {isConnecting ? "Disconnecting..." : "Disconnect"}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConnect} className="text-left">
            <p className="text-left text-gray-300/90 mb-6 text-sm">
              Connect your Google account to enable quick sign-in and account recovery options.
            </p>

            <input
              type="email"
              placeholder="Enter your Google email"
              value={googleEmail}
              onChange={(e) => setGoogleEmail(e.target.value)}
              className="w-full outline-none bg-slate-500/50 text-gray-100 placeholder-gray-400 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:bg-slate-600 transition mb-4"
              required
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="bg-slate-500/40 hover:bg-slate-500/60 cursor-pointer text-gray-200 px-5 py-2 rounded-2xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isConnecting}
                className="bg-gradient-to-r from-blue-400 to-purple-500 text-white cursor-pointer font-semibold px-6 py-2 rounded-2xl hover:opacity-90 transition disabled:opacity-50"
              >
                {isConnecting ? "Connecting..." : "Connect"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ConnectGoogle;
