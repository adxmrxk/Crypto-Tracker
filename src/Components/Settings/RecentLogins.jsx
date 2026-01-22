import React, { useContext } from "react";
import { X, Monitor, Smartphone, Tablet } from "lucide-react";
import { UserContext } from "../../Pages/SkeletonPage";

const RecentLogins = ({ clickRecentLogins, setClickRecentLogins }) => {
  const { user } = useContext(UserContext);

  // Get login history from user data
  const currentSessionId = localStorage.getItem("cryptoSessionId");
  const recentLogins = (user?.loginHistory || []).map((login, index) => ({
    id: login._id || index,
    device: login.device || "Unknown Device",
    deviceType: login.deviceType || "desktop",
    browser: login.browser || "Unknown Browser",
    location: login.location || "Unknown Location",
    ip: login.ip || "Unknown",
    time: login.time,
    current: login.sessionId === currentSessionId,
  }));

  const getDeviceIcon = (type) => {
    switch (type) {
      case "mobile":
        return <Smartphone size={20} className="text-gray-400" />;
      case "tablet":
        return <Tablet size={20} className="text-gray-400" />;
      default:
        return <Monitor size={20} className="text-gray-400" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const handleClose = () => setClickRecentLogins(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-sm bg-black/40">
      <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 w-full max-w-lg rounded-xl p-6 shadow-2xl ring-1 ring-gray-500/40 transition-transform duration-200 scale-100 hover:scale-[1.01]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-xl text-gray-100 tracking-wide">
            Recent Logins
          </h1>
          <X
            size={20}
            className="cursor-pointer text-gray-300 hover:text-white transition"
            onClick={handleClose}
          />
        </div>

        <p className="text-gray-300/90 mb-6 -mt-3 text-sm text-left">
          View your recent login activity. If you see any suspicious activity, change your password immediately.
        </p>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {recentLogins.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No login history available yet.</p>
            </div>
          ) : (
            recentLogins.map((login) => (
              <div
                key={login.id}
                className={`p-4 rounded-lg ${
                  login.current
                    ? "bg-green-500/10 border border-green-500/30"
                    : "bg-slate-500/30 border border-gray-600"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getDeviceIcon(login.deviceType)}</div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-left text-gray-100 font-medium">{login.device}</span>
                      {login.current && (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-left text-gray-400 text-sm">{login.browser}</p>
                    <p className="text-left text-gray-400 text-sm">
                      {login.location} • IP: {login.ip}
                    </p>
                    <p className="text-left text-gray-500 text-xs mt-1">{formatDate(login.time)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={handleClose}
            className="bg-slate-500/40 hover:bg-slate-500/60 cursor-pointer text-gray-200 px-5 py-2 rounded-2xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentLogins;