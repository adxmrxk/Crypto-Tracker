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
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-xl text-gray-100 tracking-wide">
            {isConnected ? "Google Account Connected" : "Connect Google Account"}
          </h1>
          <X
            size={20}
            className="cursor-pointer text-gray-300 hover:text-white transition"
            onClick={handleClose}
          />
        </div>

        {isConnected ? (
          <div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-green-400 font-medium">Connected</p>
                  <p className="text-gray-300 text-sm">{user?.settings?.googleEmail || "Google account linked"}</p>
                </div>
              </div>
            </div>

            <p className="text-gray-300/90 mb-4 text-sm">
              Your Google account is connected. You can use it to sign in quickly to CryptoScope.
            </p>

            <div className="flex justify-end gap-3 mt-4">
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
          <form onSubmit={handleConnect}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-7 h-7">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-100 font-medium">Sign in with Google</p>
                <p className="text-gray-400 text-sm">Link your account for easy access</p>
              </div>
            </div>

            <p className="text-gray-300/90 mb-4 text-sm">
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
