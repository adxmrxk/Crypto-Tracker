import { useState, useContext } from "react";
import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ControlledSwitches from "../../Components/ControlledSwitches";
import Footer from "../../Components/Shared/Footer";
import LabelBottomNavigation from "../../Components/LabelBottomNavigation";
import { UserContext } from "../SkeletonPage";
import ChangePassword from "../../Components/Settings/ChangePassword";
import ChangeRecoveryEmail from "../../Components/Settings/ChangeRecoveryEmail";
import RecentLogins from "../../Components/Settings/RecentLogins";
import BlockedAccounts from "../../Components/Settings/BlockedAccounts";
import axios from "axios";

const AccountSecurityPage = () => {
  const { user, setUser } = useContext(UserContext);

  const [clickChangePassword, setClickChangePassword] = useState(false);
  const [clickChangeRecoveryEmail, setClickChangeRecoveryEmail] =
    useState(false);
  const [clickRecentLogins, setClickRecentLogins] = useState(false);
  const [clickBlockedAccounts, setClickBlockedAccounts] = useState(false);

  const handleTwoFactorChange = async (checked) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/settings/changeTwoFactor/${user._id}`,
        { twoFactorAuthentication: checked },
      );
      setUser(res.data);
    } catch (error) {
      console.error("Failed to update two-factor setting");
    }
  };

  const handleLoginAlertsChange = async (checked) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/settings/changeLoginAlerts/${user._id}`,
        { loginAlerts: checked },
      );
      setUser(res.data);
    } catch (error) {
      console.error("Failed to update login alerts setting");
    }
  };

  const handleDirectMessagesChange = async (checked) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/settings/changeDirectMessages/${user._id}`,
        { directMessages: checked },
      );
      setUser(res.data);
    } catch (error) {
      console.error("Failed to update direct messages setting");
    }
  };

  return (
    <div>
      {clickChangePassword && (
        <ChangePassword
          clickChangePassword={clickChangePassword}
          setClickChangePassword={setClickChangePassword}
        />
      )}
      {clickChangeRecoveryEmail && (
        <ChangeRecoveryEmail
          clickChangeRecoveryEmail={clickChangeRecoveryEmail}
          setClickChangeRecoveryEmail={setClickChangeRecoveryEmail}
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
        <h1 className="font-roboto font-bold text-xl my-5 pl-9 text-sky-200">
          Account Security
        </h1>
        <hr className="border-sky-400 my-1 w-[80%] mx-auto mask-x-from-0.5"></hr>

        {/* Two-factor Authentication */}
        <div>
          <div className="flex justify-between items-center m-5 mt-8">
            <h2 className="font-roboto font-normal w-[380px] text-gray-100">
              Two-factor authentication
            </h2>
            <div className="pr-24">
              <ControlledSwitches
                checked={user?.settings?.twoFactorAuthentication || false}
                onChange={handleTwoFactorChange}
              />
            </div>
          </div>
          <p className="font-roboto text-sm w-fit ml-30 -mt-6 text-gray-300">
            Secure your CryptoScope account with two-factor authentication
          </p>
        </div>

        {/* Recent Logins */}
        <div>
          <div className="flex justify-between items-center m-5 mt-8">
            <h2 className="font-roboto font-normal text-left ml-25 w-[380px] text-gray-100">
              Recent Logins
            </h2>
            <div
              className="flex items-center gap-[8px] mr-22 cursor-pointer group"
              onClick={() => setClickRecentLogins(true)}
            >
              <p className="font-normal text-amber-400/70 group-hover:text-amber-400 transition-colors">View Logins</p>
              <ChevronRightIcon className="text-amber-400 group-hover:text-amber-300 rounded-2xl transition-colors" />
            </div>
          </div>
          <p className="font-roboto text-sm w-fit ml-30 -mt-6 text-gray-300">
            View your recent login devices and locations.
          </p>
        </div>

        {/* Login Alerts */}
        <div className="mb-10">
          <div className="flex justify-between items-center m-5 mt-8">
            <h2 className="font-roboto font-normal text-left ml-25 w-[380px] text-gray-100">
              Login Alerts
            </h2>
            <div className="pr-24">
              <ControlledSwitches
                checked={user?.settings?.loginAlerts ?? true}
                onChange={handleLoginAlertsChange}
              />
            </div>
          </div>
          <p className="font-roboto text-sm w-fit ml-30 -mt-6 text-gray-300">
            Get notified when a login occurs from an unrecognized device or
            location.
          </p>
        </div>

        <h1 className="font-roboto font-bold text-xl pl-9 my-5 text-sky-200">
          Social
        </h1>
        <hr className="border-sky-400 my-1 w-[80%] mx-auto mask-x-from-0.5"></hr>

        {/* Blocked Accounts */}
        <div>
          <div
            className="flex justify-between items-center m-5 mt-10 mb-10 cursor-pointer"
            onClick={() => setClickBlockedAccounts(true)}
          >
            <h2 className="font-roboto font-normal w-fit ml-25 text-gray-100">
              Blocked Accounts
            </h2>
            <div className="flex items-center gap-[8px] mr-22 group">
              <p className="font-normal text-amber-400/70 group-hover:text-amber-400 transition-colors">View Blocked</p>
              <ChevronRightIcon className="text-amber-400 group-hover:text-amber-300 rounded-2xl transition-colors" />
            </div>
          </div>
          <p className="font-roboto text-sm w-fit ml-30 -mt-9 text-gray-300">
            Manage accounts you have blocked from interacting with you.
          </p>
        </div>

        <h1 className="font-roboto font-bold text-xl pl-9 my-5 text-sky-200">
          Advanced
        </h1>
        <hr className="border-sky-400 my-1 w-[80%] mx-auto mask-x-from-0.5"></hr>

        {/* Recovery Email */}
        <div>
          <div
            className="flex justify-between items-center m-5 mt-10 mb-10 cursor-pointer"
            onClick={() => setClickChangeRecoveryEmail(true)}
          >
            <h2 className="font-roboto font-normal w-fit ml-25 text-gray-100">
              Recovery Email
            </h2>
            <div className="flex items-center gap-[8px] mr-22 group">
              <p className="font-normal text-amber-400/70 group-hover:text-amber-400 transition-colors">
                {user?.settings?.recoveryEmail || "Not specified"}
              </p>
              <ChevronRightIcon className="text-amber-400 group-hover:text-amber-300 rounded-2xl transition-colors" />
            </div>
          </div>
          <p className="font-roboto text-sm w-fit ml-30 -mt-9 text-gray-300">
            Add a recovery email to reset your password if you forget it.
          </p>
        </div>

        {/* Change Password */}
        <div>
          <div
            className="flex justify-between items-center m-5 mt-10 mb-10 cursor-pointer"
            onClick={() => setClickChangePassword(true)}
          >
            <h2 className="font-roboto font-normal w-fit ml-25 text-gray-100">
              Change Password
            </h2>
            <div className="flex items-center gap-[8px] mr-22 group">
              <ChevronRightIcon className="text-amber-400 group-hover:text-amber-300 rounded-2xl transition-colors" />
            </div>
          </div>
          <p className="font-roboto text-sm w-fit ml-30 -mt-9 text-gray-300">
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
