import { useState, useContext, createContext } from "react";
import { UserContext } from "../SkeletonPage";
import React from "react";
import ButtonComponent from "../../Components/ButtonComponent";
import { motion } from "framer-motion";
import ClickableChips from "../../Components/ClickableChips";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ControlledSwitches from "../../Components/ControlledSwitches";
import { createRoot } from "react-dom/client";
import LabelBottomNavigation from "../../Components/LabelBottomNavigation";
import Footer from "../../Components/Shared/Footer";
import { set } from "mongoose";
import ChangeEmail from "../../Components/Settings/ChangeEmail";
import ChangeUsername from "../../Components/Settings/ChangeUsername";
import ChangeGender from "../../Components/Settings/ChangeGender";

function AccountSettingsPage() {
  const { user, setUser } = useContext(UserContext);
  const [clickChangeEmail, setClickChangeEmail] = useState(false);
  const [clickChangeUsername, setClickChangeUsername] = useState(false);
  const [clickChangeGender, setClickChangeGender] = useState(false);

  return (
    <div>
      {clickChangeEmail ? (
        <ChangeEmail
          clickChangeEmail={clickChangeEmail}
          setClickChangeEmail={setClickChangeEmail}
        ></ChangeEmail>
      ) : null}
      {clickChangeUsername ? (
        <ChangeUsername
          clickChangeUsername={clickChangeUsername}
          setClickChangeUsername={setClickChangeUsername}
        ></ChangeUsername>
      ) : null}
      {clickChangeGender ? (
        <ChangeGender
          clickChangeGender={clickChangeGender}
          setClickChangeGender={setClickChangeGender}
        ></ChangeGender>
      ) : null}

      <div className={`${clickChangeEmail ? "" : ""}`}>
        <div className="rounded-md w-[100%] h-auto relative top-4 p-3">
          <h1 className="font-roboto font-bold text-xl my-5">General</h1>
          <hr className="border-gray-600 my-1 w-[80%] mx-auto mask-x-from-0.5"></hr>
          {/* Email */}
          <div className="flex justify-between items-center m-5 mt-10 mb-10">
            <h2 className="font-roboto font-normal w-[60px] pl-25">Email</h2>
            <div
              className="flex items-center gap-[8px] mr-22 cursor-pointer group"
              onClick={() => {
                setClickChangeEmail(!clickChangeEmail);
              }}
            >
              <p className="font-normal">{user.email}</p>
              <ChevronRightIcon className="group-hover:bg-gray-600/20 rounded-2xl" />
            </div>
          </div>

          {/* Username */}
          <div
            className="flex justify-between items-center m-5 mt-10 mb-10"
            onClick={() => {
              setClickChangeUsername(true);
            }}
          >
            <div>
              <h2 className="font-roboto font-normal w-[60px] pl-25">
                Username
              </h2>
              <p className="font-roboto text-sm w-fit ml-25">Test</p>
            </div>
            <div className="flex items-center gap-[8px] mr-22 cursor-pointer group">
              <p className="font-normal">{user.username}</p>
              <ChevronRightIcon className="group-hover:bg-gray-600/20 rounded-2xl" />
            </div>
          </div>

          {/* DisplayName */}
          <div
            className="flex justify-between items-center m-5 mt-10 mb-10"
            onClick={() => {
              setClickChangeUsername(true);
            }}
          >
            <div className="">
              <h2 className="font-roboto font-normal w-[60px] pl-25 text-nowrap">
                Display Name
              </h2>
              <p className="font-roboto text-sm w-fit ml-25">Test</p>
            </div>
            <div className="flex items-center gap-[8px] mr-22 cursor-pointer group">
              <p className="font-normal">{user.username}</p>
              <ChevronRightIcon className="group-hover:bg-gray-600/20 rounded-2xl" />
            </div>
          </div>

          {/* Profile Picture */}
          <div
            className="flex justify-between items-center m-5 mt-10 mb-10"
            onClick={() => {
              setClickChangeUsername(true);
            }}
          >
            <h2 className="font-roboto font-normal w-[120px] pl-25 text-nowrap">
              Profile Picture
            </h2>
            <div className="flex items-center gap-[8px] mr-22 cursor-pointer group">
              <p className="font-normal">{user.username}</p>
              <ChevronRightIcon className="group-hover:bg-gray-600/20 rounded-2xl" />
            </div>
          </div>
          {/* Gender */}
          <div
            className="flex justify-between items-center m-5 mt-10 mb-10"
            onClick={() =>
              console.log(setClickChangeGender(!clickChangeGender))
            }
          >
            <h2 className="font-roboto font-normal w-[60px] pl-25">Gender</h2>
            <div className="flex items-center gap-[8px] mr-22 cursor-pointer group">
              <p className="font-normal">
                {user?.gender ? user.gender : "Not specified"}
              </p>
              <ChevronRightIcon className="group-hover:bg-gray-600/20 rounded-2xl" />
            </div>
          </div>
          <h1 className="font-roboto font-bold text-xl my-5">
            Account Authorization
          </h1>
          <hr className="border-gray-600 my-1 w-[80%] mx-auto mask-x-from-0.5"></hr>
          {/* Google */}
          <div className="mb-10">
            <div className="flex justify-between items-center m-5 mt-10">
              <h2 className="font-roboto font-normal w-[60px] pl-25">Google</h2>
              <div className="pr-24">
                <ClickableChips
                  text="Connect"
                  varientType="outlined"
                ></ClickableChips>
              </div>
            </div>
            <p className="font-roboto text-sm w-fit ml-30 -mt-6">
              Connect to log in to CryptoScope with your Google account
            </p>
          </div>

          <h1 className="font-roboto font-bold text-xl my-5">Advanced</h1>
          <hr className="border-gray-600 my-1 w-[80%] mx-auto mask-x-from-0.5"></hr>
          {/* Delete */}
          <div
            className="flex justify-between items-center m-5 mt-10 mb-10"
            onClick={() => console.log("Delete Account")}
          >
            <h2 className="font-roboto font-normal w-fit ml-25">
              Delete Account
            </h2>
            <div className="flex items-center gap-[8px] mr-22 cursor-pointer group">
              <p className="font-normal">Delete</p>
              <ChevronRightIcon className="group-hover:bg-gray-600/20 rounded-2xl" />
            </div>
          </div>
          <Footer />
          <LabelBottomNavigation></LabelBottomNavigation>
        </div>
      </div>
    </div>
  );
}

export default AccountSettingsPage;
