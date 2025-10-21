import { useState } from "react";
import React from "react";
import ButtonComponent from "../../Components/ButtonComponent";
import { motion } from "framer-motion";
import ClickableChips from "../../Components/ClickableChips";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ControlledSwitches from "../../Components/ControlledSwitches";
import Footer from "../../Components/Footer";
import LabelBottomNavigation from "../../Components/LabelBottomNavigation";

const NotificationsPage = () => {
  return (
    <div className="rounded-md w-[100%] h-auto relative top-4 p-3">
      <h1 className="font-roboto font-bold text-xl my-5 pl-9">Messages</h1>
      <hr className="border-gray-400 my-1 w-[80%] mx-auto"></hr>

      <div className="flex justify-between items-center m-5 mt-10 mb-10">
        <h2 className="font-roboto font-normal w-[200px] pl-25 whitespace-nowrap">
          Chat Messages
        </h2>
        <div
          className="flex items-center gap-[8px] mr-22 cursor-pointer group"
          onClick={() => {}}
        >
          <p className="font-normal">adamrak12345@gmail.com</p>
          <ChevronRightIcon className="group-hover:bg-gray-600/20 rounded-2xl" />
        </div>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center m-5 mt-8">
          <h2 className="font-roboto font-normal w-[380px] text-left ml-25">
            Mention of username
          </h2>
          <div
            className="flex items-center gap-[8px] mr-22 cursor-pointer group"
            onClick={() => {}}
          >
            <p className="font-normal">adamrak12345@gmail.com</p>
            <ChevronRightIcon className="group-hover:bg-gray-600/20 rounded-2xl" />
          </div>
        </div>
        <p className="font-roboto text-sm w-fit ml-30 -mt-6">
          Secure your CryptoScope account with two-factor authentication
        </p>
      </div>

      <h1 className="font-roboto font-bold text-xl pl-9 my-5">Market Trends</h1>
      <hr className="border-gray-400 my-1 w-[80%] mx-auto"></hr>

      <div className="mb-10">
        <div className="flex justify-between items-center m-5 mt-10">
          <h2 className="font-roboto font-normal w-[60px] pl-25 whitespace-nowrap">
            Coin Alerts
          </h2>
          <div
            className="flex items-center gap-[8px] mr-22 cursor-pointer group"
            onClick={() => {}}
          >
            <p className="font-normal">adamrak12345@gmail.com</p>
            <ChevronRightIcon className="group-hover:bg-gray-600/20 rounded-2xl" />
          </div>
        </div>
        <p className="font-roboto text-sm w-fit ml-30 -mt-5">
          Connect to log in to CryptoScope with your Google account
        </p>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center m-5 mt-8">
          <h2 className="font-roboto font-normal w-[60px] pl-25 whitespace-nowrap">
            Trending Coins
          </h2>
          <div className="flex items-center gap-[8px] mr-22 cursor-pointer group">
            <div className="mr-2">
              <ControlledSwitches></ControlledSwitches>
            </div>
          </div>
        </div>
        <p className="font-roboto text-sm w-fit ml-30 -mt-5">
          Connect to log in to CryptoScope with your Apple account
        </p>
      </div>

      <h1 className="font-roboto font-bold text-xl pl-9 my-5">Activity</h1>
      <hr className="border-gray-400 my-1 w-[80%] mx-auto"></hr>

      <div className="mb-10">
        <div className="flex justify-between items-center m-5 mt-8">
          <h2 className="font-roboto font-normal w-[380px] text-left ml-25">
            Comments on posts
          </h2>
          <div
            className="flex items-center gap-[8px] mr-22 cursor-pointer group"
            onClick={() => {}}
          >
            <p className="font-normal">adamrak12345@gmail.com</p>
            <ChevronRightIcon className="group-hover:bg-gray-600/20 rounded-2xl" />
          </div>
        </div>
        <p className="font-roboto text-sm w-fit ml-30 -mt-6">
          Secure your CryptoScope account with two-factor authentication
        </p>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center m-5 mt-8">
          <h2 className="font-roboto font-normal w-[380px] text-left ml-25">
            Upvotes on posts
          </h2>
          <div
            className="flex items-center gap-[8px] mr-22 cursor-pointer group"
            onClick={() => {}}
          >
            <p className="font-normal">adamrak12345@gmail.com</p>
            <ChevronRightIcon className="group-hover:bg-gray-600/20 rounded-2xl" />
          </div>
        </div>
        <p className="font-roboto text-sm w-fit ml-30 -mt-6">
          Secure your CryptoScope account with two-factor authentication
        </p>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center m-5 mt-8">
          <h2 className="font-roboto font-normal w-[380px] text-left ml-25">
            New followers
          </h2>
          <div
            className="flex items-center gap-[8px] mr-22 cursor-pointer group"
            onClick={() => {}}
          >
            <p className="font-normal">adamrak12345@gmail.com</p>
            <ChevronRightIcon className="group-hover:bg-gray-600/20 rounded-2xl" />
          </div>
        </div>
        <p className="font-roboto text-sm w-fit ml-30 -mt-6">
          Secure your CryptoScope account with two-factor authentication
        </p>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center m-5 mt-8">
          <h2 className="font-roboto font-normal w-[380px] text-left ml-25">
            Replies to comments
          </h2>
          <div
            className="flex items-center gap-[8px] mr-22 cursor-pointer group"
            onClick={() => {}}
          >
            <p className="font-normal">adamrak12345@gmail.com</p>
            <ChevronRightIcon className="group-hover:bg-gray-600/20 rounded-2xl" />
          </div>
        </div>
        <p className="font-roboto text-sm w-fit ml-30 -mt-6">
          Secure your CryptoScope account with two-factor authentication
        </p>
      </div>

      <h1 className="font-roboto font-bold text-xl pl-9 my-5">
        Delivery Preferences
      </h1>
      <hr className="border-gray-400 my-1 w-[80%] mx-auto"></hr>

      <div
        className="flex justify-between items-center m-5 mt-10 mb-10"
        onClick={() => console.log("Delete Account")}
      >
        <h2 className="font-roboto font-normal w-fit ml-25">Delete Account</h2>
        <div className="flex items-center gap-[8px] mr-22 cursor-pointer group">
          <p className="font-normal">Delete</p>
          <ChevronRightIcon className="group-hover:bg-gray-600/20 rounded-2xl" />
        </div>
      </div>

      <Footer />
      <LabelBottomNavigation></LabelBottomNavigation>
    </div>
  );
};

export default NotificationsPage;
