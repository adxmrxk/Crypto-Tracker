import { useState, useContext } from "react";
import React from "react";
import ButtonComponent from "../../Components/ButtonComponent";
import { motion } from "framer-motion";
import ClickableChips from "../../Components/ClickableChips";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ControlledSwitches from "../../Components/ControlledSwitches";
import Footer from "../../Components/Shared/Footer";
import LabelBottomNavigation from "../../Components/LabelBottomNavigation";
import { UserContext } from "../SkeletonPage";

const AccountSecurityPage = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const { user, setUser } = useContext(UserContext);

  return (
    <div className="rounded-md w-[100%] h-auto relative top-4 p-3">
      <h1 className="font-roboto font-bold text-xl my-5 pl-9">
        Account Security
      </h1>
      <hr className="border-gray-400 my-1 w-[80%] mx-auto"></hr>

      {/* Two-factor Authentication */}
      <div>
        <div className="flex justify-between items-center m-5 mt-8">
          <h2 className="font-roboto font-normal w-[380px]">
            Two-factor authentication
          </h2>
          <div className="pr-24">
            <ControlledSwitches></ControlledSwitches>
          </div>
        </div>
        <p className="font-roboto text-sm w-fit ml-30 -mt-6">
          Secure your CryptoScope account with two-factor authentication
        </p>
      </div>

      {/* Log In Activity */}
      <div>
        <div className="flex justify-between items-center m-5 mt-8">
          <h2 className="font-roboto font-normal text-left ml-25 w-[380px]">
            Recent Logins
          </h2>
          <div className="flex items-center gap-[8px] mr-22 cursor-pointer group">
            <p className="font-normal">View Logins</p>
            <ChevronRightIcon className="group-hover:bg-gray-600/20 rounded-2xl" />
          </div>
        </div>
        <p className="font-roboto text-sm w-fit ml-30 -mt-6">
          View your recent login devices and locations.
        </p>
      </div>

      {/* Login Alerts */}
      <div className="mb-10">
        <div className="flex justify-between items-center m-5 mt-8">
          <h2 className="font-roboto font-normal text-left ml-25 w-[380px]">
            Login Alerts
          </h2>
          <div className="pr-24">
            <ControlledSwitches></ControlledSwitches>
          </div>
        </div>
        <p className="font-roboto text-sm w-fit ml-30 -mt-6">
          Get notified when a login occurs from an unrecognized device or
          location.
        </p>
      </div>

      <h1 className="font-roboto font-bold text-xl pl-9 my-5">Social</h1>
      <hr className="border-gray-600 my-1 w-[80%] mx-auto mask-x-from-0.5"></hr>

      <div className="mb-10">
        <div className="flex justify-between items-center m-5 mt-8">
          <h2 className="font-roboto font-normal text-left ml-25 w-[380px]">
            Direct Messages
          </h2>
          <div className="pr-24">
            <ControlledSwitches></ControlledSwitches>
          </div>
        </div>
        <p className="font-roboto text-sm w-fit ml-30 -mt-6">
          Get notified when a login occurs from an unrecognized device or
          location.
        </p>
      </div>

      <div>
        <div
          className="flex justify-between items-center m-5 mt-10 mb-10"
          onClick={() => console.log("Gender Changed")}
        >
          <h2 className="font-roboto font-normal w-fit ml-25">
            Blocked Accounts
          </h2>
          <div className="flex items-center gap-[8px] mr-22 cursor-pointer group">
            <p className="font-normal">adamrak239@gmail.com</p>
            <ChevronRightIcon className="group-hover:bg-gray-600/20 rounded-2xl" />
          </div>
        </div>
        <p className="font-roboto text-sm w-fit ml-30 -mt-9">
          Secure your CryptoScope account with two-factor authentication
        </p>
      </div>

      <h1 className="font-roboto font-bold text-xl pl-9 my-5">Advanced</h1>
      <hr className="border-gray-600 my-1 w-[80%] mx-auto mask-x-from-0.5"></hr>

      {/* Recovery */}
      <div>
        <div
          className="flex justify-between items-center m-5 mt-10 mb-10"
          onClick={() => console.log("Gender Changed")}
        >
          <h2 className="font-roboto font-normal w-fit ml-25">
            Recovery Email
          </h2>
          <div className="flex items-center gap-[8px] mr-22 cursor-pointer group">
            <p className="font-normal">
              {user?.settings?.recoveryEmail
                ? user.settings.recoveryEmail
                : "Not specified"}
            </p>
            <ChevronRightIcon className="group-hover:bg-gray-600/20 rounded-2xl" />
          </div>
        </div>
        <p className="font-roboto text-sm w-fit ml-30 -mt-9">
          Secure your CryptoScope account with two-factor authentication
        </p>
      </div>

      {/* Change Password */}
      <div
        className="flex justify-between items-center m-5 mt-10 mb-10"
        onClick={() => console.log("Email Changed")}
      >
        <h2 className="font-roboto font-normal w-fit ml-25">Change Password</h2>
        <div className="flex items-center gap-[8px] mr-22 cursor-pointer group">
          <ChevronRightIcon className="group-hover:bg-gray-600/20 rounded-2xl" />
        </div>
      </div>

      <Footer />
      <LabelBottomNavigation></LabelBottomNavigation>
    </div>
  );
};

export default AccountSecurityPage;
