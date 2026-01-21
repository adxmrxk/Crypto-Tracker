import React, { useContext, useState } from "react";
import { X, UserX } from "lucide-react";
import { UserContext } from "../../Pages/SkeletonPage";

const BlockedAccounts = ({ clickBlockedAccounts, setClickBlockedAccounts }) => {
  const { user } = useContext(UserContext);

  // Mock data - in a real app, this would come from user.socials.blocked
  const [blockedAccounts, setBlockedAccounts] = useState([
    { id: "1", username: "spammer123", displayName: "Spam Account", blockedAt: new Date().toISOString() },
    { id: "2", username: "troll_user", displayName: "Troll User", blockedAt: new Date(Date.now() - 86400000).toISOString() }
  ]);

  const handleUnblock = (accountId) => {
    // In a real app, this would call the backend
    setBlockedAccounts(blockedAccounts.filter((acc) => acc.id !== accountId));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const handleClose = () => setClickBlockedAccounts(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-sm bg-black/40">
      <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 w-full max-w-md rounded-xl p-6 shadow-2xl ring-1 ring-gray-500/40 transition-transform duration-200 scale-100 hover:scale-[1.01]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-xl text-gray-100 tracking-wide">
            Blocked Accounts
          </h1>
          <X
            size={20}
            className="cursor-pointer text-gray-300 hover:text-white transition"
            onClick={handleClose}
          />
        </div>

        <p className="text-gray-300/90 mb-6 -mt-3 text-sm text-left">
          Blocked accounts cannot view your profile, posts, or send you messages.
        </p>

        {blockedAccounts.length === 0 ? (
          <div className="text-center py-8">
            <UserX size={40} className="mx-auto text-gray-500 mb-3" />
            <p className="text-gray-400">No blocked accounts</p>
            <p className="text-gray-500 text-sm">Accounts you block will appear here</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {blockedAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-3 bg-slate-500/30 rounded-lg border border-gray-600"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center">
                    <span className="text-gray-300 font-medium">
                      {account.displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-100 font-medium">{account.displayName}</p>
                    <p className="text-gray-400 text-sm">@{account.username}</p>
                    <p className="text-gray-500 text-xs">Blocked {formatDate(account.blockedAt)}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleUnblock(account.id)}
                  className="px-3 py-1 text-sm bg-slate-500/40 hover:bg-slate-500/60 text-gray-200 rounded-full transition"
                >
                  Unblock
                </button>
              </div>
            ))}
          </div>
        )}

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

export default BlockedAccounts;