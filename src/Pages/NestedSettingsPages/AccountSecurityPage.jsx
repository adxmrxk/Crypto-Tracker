import { useState } from "react";
import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Footer from "../../Components/Shared/Footer";
import LabelBottomNavigation from "../../Components/LabelBottomNavigation";
import ChangePassword from "../../Components/Settings/ChangePassword";
import RecentLogins from "../../Components/Settings/RecentLogins";
import BlockedAccounts from "../../Components/Settings/BlockedAccounts";

const AccountSecurityPage = () => {
  const [clickChangePassword, setClickChangePassword] = useState(false);
  const [clickRecentLogins, setClickRecentLogins] = useState(false);
  const [clickBlockedAccounts, setClickBlockedAccounts] = useState(false);

  return (
    <div>
      {clickChangePassword && (
        <ChangePassword
          clickChangePassword={clickChangePassword}
          setClickChangePassword={setClickChangePassword}
        />
      )}
      {clickRecentLogins && (
        <RecentLogins
          clickRecentLogins={clickRecentLogins}
          setClickRecentLogins={setClickRecentLogins}
        />
      )}
      {clickBlockedAccounts && (
        <BlockedAccounts
          clickBlockedAccounts={clickBlockedAccounts}
          setClickBlockedAccounts={setClickBlockedAccounts}
        />
      )}

      <div className="rounded-md w-[100%] h-auto relative top-4 p-3">
        <h1 className="font-roboto font-bold text-xl my-5 pl-9 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
          Account Security
        </h1>
        <hr className="border-amber-500/30 my-1 w-[80%] mx-auto mask-x-from-0.5"></hr>

        {/* Recent Logins */}
        <div className="mb-10">
          <div className="flex justify-between items-center m-5 mt-8">
            <h2 className="font-roboto font-normal text-left ml-25 w-[380px] text-gray-100">
              Recent Logins
            </h2>
            <div
              className="flex items-center gap-[8px] mr-22 cursor-pointer group px-3 py-1.5 rounded-lg hover:bg-amber-500/10 transition-all duration-300"
              onClick={() => setClickRecentLogins(true)}
            >
              <p className="font-normal text-amber-400 group-hover:text-amber-300 transition-colors drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">View Logins</p>
              <ChevronRightIcon className="text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
            </div>
          </div>
          <p className="font-roboto text-sm w-fit ml-30 -mt-6 text-gray-400">
            View your recent login devices and locations.
          </p>
        </div>

        <h1 className="font-roboto font-bold text-xl pl-9 my-5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
          Social
        </h1>
        <hr className="border-amber-500/30 my-1 w-[80%] mx-auto mask-x-from-0.5"></hr>

        {/* Blocked Accounts */}
        <div>
          <div
            className="flex justify-between items-center m-5 mt-10 mb-10 cursor-pointer group"
            onClick={() => setClickBlockedAccounts(true)}
          >
            <h2 className="font-roboto font-normal w-fit ml-25 text-gray-100">
              Blocked Accounts
            </h2>
            <div className="flex items-center gap-[8px] mr-22 px-3 py-1.5 rounded-lg group-hover:bg-amber-500/10 transition-all duration-300">
              <p className="font-normal text-amber-400 group-hover:text-amber-300 transition-colors drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">View Blocked</p>
              <ChevronRightIcon className="text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
            </div>
          </div>
          <p className="font-roboto text-sm w-fit ml-30 -mt-9 text-gray-400">
            Manage accounts you have blocked from interacting with you.
          </p>
        </div>

        <h1 className="font-roboto font-bold text-xl pl-9 my-5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
          Advanced
        </h1>
        <hr className="border-amber-500/30 my-1 w-[80%] mx-auto mask-x-from-0.5"></hr>

        {/* Change Password */}
        <div>
          <div
            className="flex justify-between items-center m-5 mt-10 mb-10 cursor-pointer group"
            onClick={() => setClickChangePassword(true)}
          >
            <h2 className="font-roboto font-normal w-fit ml-25 text-gray-100">
              Change Password
            </h2>
            <div className="flex items-center gap-[8px] mr-22 px-3 py-1.5 rounded-lg group-hover:bg-amber-500/10 transition-all duration-300">
              <ChevronRightIcon className="text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
            </div>
          </div>
          <p className="font-roboto text-sm w-fit ml-30 -mt-9 text-gray-400">
            Update your account password.
          </p>
        </div>

        <Footer />
        <LabelBottomNavigation />
      </div>
    </div>
  );
};

export default AccountSecurityPage;
