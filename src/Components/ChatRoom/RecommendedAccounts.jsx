import React, { useContext, useState } from "react";
import { UserContext } from "../../Pages/SkeletonPage";

function RecommendedAccounts() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="border-2 border-red-400 h-[650px] flex flex-col gap-3">
      <h1 className="text-lg font-semibold text-gray-200 mb-5">
        Recommended Accounts
      </h1>
      <div className="flex flex-row gap-25 items-center mb-2">
        <div className="flex flex-row">
          <div className="bg-gradient-to-br to-gray-400 via-gray-300 from-gray-200 w-[45px] h-[45px] rounded-full flex justify-center items-center text-2xl">
            <h1 className="text-[20px]">
              {user?.profilePicture !== ""
                ? user?.profilePicture
                : user?.username.slice(0, 2).toUpperCase()}
            </h1>
          </div>
          <div className="flex flex-col ml-1">
            <h1 className="text-md">{user?.displayName}</h1>
            <h1 className="text-sm">@{user?.username}</h1>
          </div>
        </div>
        <div className="flex items-center h-fit gap-2 bg-slate-700 px-2 py-1 rounded-sm hover:bg-slate-600 transition">
          <h1 className="text-sm text-gray-200">+</h1>
          <button className="text-sm text-gray-200">Follow</button>
        </div>
      </div>
      <div className="flex flex-row gap-25 items-center mb-2">
        <div className="flex flex-row">
          <div className="bg-gradient-to-br to-gray-400 via-gray-300 from-gray-200 w-[45px] h-[45px] rounded-full flex justify-center items-center text-2xl">
            <h1 className="text-[20px]">
              {user?.profilePicture !== ""
                ? user?.profilePicture
                : user?.username.slice(0, 2).toUpperCase()}
            </h1>
          </div>
          <div className="flex flex-col ml-1">
            <h1 className="text-md">{user?.displayName}</h1>
            <h1 className="text-sm">@{user?.username}</h1>
          </div>
        </div>
        <div className="flex items-center h-fit gap-2 bg-slate-700 px-2 py-1 rounded-sm hover:bg-slate-600 transition">
          <h1 className="text-sm text-gray-200">+</h1>
          <button className="text-sm text-gray-200">Follow</button>
        </div>
      </div>
      <div className="flex flex-row gap-25 items-center mb-2">
        <div className="flex flex-row">
          <div className="bg-gradient-to-br to-gray-400 via-gray-300 from-gray-200 w-[45px] h-[45px] rounded-full flex justify-center items-center text-2xl">
            <h1 className="text-[20px]">
              {user?.profilePicture !== ""
                ? user?.profilePicture
                : user?.username.slice(0, 2).toUpperCase()}
            </h1>
          </div>
          <div className="flex flex-col ml-1">
            <h1 className="text-md">{user?.displayName}</h1>
            <h1 className="text-sm">@{user?.username}</h1>
          </div>
        </div>
        <div className="flex items-center h-fit gap-2 bg-slate-700 px-2 py-1 rounded-sm hover:bg-slate-600 transition">
          <h1 className="text-sm text-gray-200">+</h1>
          <button className="text-sm text-gray-200">Follow</button>
        </div>
      </div>
      <div className="flex flex-row gap-25 items-center mb-2">
        <div className="flex flex-row">
          <div className="bg-gradient-to-br to-gray-400 via-gray-300 from-gray-200 w-[45px] h-[45px] rounded-full flex justify-center items-center text-2xl">
            <h1 className="text-[20px]">
              {user?.profilePicture !== ""
                ? user?.profilePicture
                : user?.username.slice(0, 2).toUpperCase()}
            </h1>
          </div>
          <div className="flex flex-col ml-1">
            <h1 className="text-md">{user?.displayName}</h1>
            <h1 className="text-sm">@{user?.username}</h1>
          </div>
        </div>
        <div className="flex items-center h-fit gap-2 bg-slate-700 px-2 py-1 rounded-sm hover:bg-slate-600 transition">
          <h1 className="text-sm text-gray-200">+</h1>
          <button className="text-sm text-gray-200">Follow</button>
        </div>
      </div>
      <div className="flex flex-row gap-25 items-center mb-2">
        <div className="flex flex-row">
          <div className="bg-gradient-to-br to-gray-400 via-gray-300 from-gray-200 w-[45px] h-[45px] rounded-full flex justify-center items-center text-2xl">
            <h1 className="text-[20px]">
              {user?.profilePicture !== ""
                ? user?.profilePicture
                : user?.username.slice(0, 2).toUpperCase()}
            </h1>
          </div>
          <div className="flex flex-col ml-1">
            <h1 className="text-md">{user?.displayName}</h1>
            <h1 className="text-sm">@{user?.username}</h1>
          </div>
        </div>
        <div className="flex items-center h-fit gap-2 bg-slate-700 px-2 py-1 rounded-sm hover:bg-slate-600 transition">
          <h1 className="text-sm text-gray-200">+</h1>
          <button className="text-sm text-gray-200">Follow</button>
        </div>
      </div>
      <div className="flex flex-row gap-25 items-center mb-2">
        <div className="flex flex-row">
          <div className="bg-gradient-to-br to-gray-400 via-gray-300 from-gray-200 w-[45px] h-[45px] rounded-full flex justify-center items-center text-2xl">
            <h1 className="text-[20px]">
              {user?.profilePicture !== ""
                ? user?.profilePicture
                : user?.username.slice(0, 2).toUpperCase()}
            </h1>
          </div>
          <div className="flex flex-col ml-1">
            <h1 className="text-md">{user?.displayName}</h1>
            <h1 className="text-sm">@{user?.username}</h1>
          </div>
        </div>
        <div className="flex items-center h-fit gap-2 bg-slate-700 px-2 py-1 rounded-sm hover:bg-slate-600 transition">
          <h1 className="text-sm text-gray-200">+</h1>
          <button className="text-sm text-gray-200">Follow</button>
        </div>
      </div>
      <div className="flex flex-row gap-25 items-center mb-2">
        <div className="flex flex-row">
          <div className="bg-gradient-to-br to-gray-400 via-gray-300 from-gray-200 w-[45px] h-[45px] rounded-full flex justify-center items-center text-2xl">
            <h1 className="text-[20px]">
              {user?.profilePicture !== ""
                ? user?.profilePicture
                : user?.username.slice(0, 2).toUpperCase()}
            </h1>
          </div>
          <div className="flex flex-col ml-1">
            <h1 className="text-md">{user?.displayName}</h1>
            <h1 className="text-sm">@{user?.username}</h1>
          </div>
        </div>
        <div className="flex items-center h-fit gap-2 bg-slate-700 px-2 py-1 rounded-sm hover:bg-slate-600 transition">
          <h1 className="text-sm text-gray-200">+</h1>
          <button className="text-sm text-gray-200">Follow</button>
        </div>
      </div>
      <div className="flex flex-row gap-25 items-center mb-2">
        <div className="flex flex-row">
          <div className="bg-gradient-to-br to-gray-400 via-gray-300 from-gray-200 w-[45px] h-[45px] rounded-full flex justify-center items-center text-2xl">
            <h1 className="text-[20px]">
              {user?.profilePicture !== ""
                ? user?.profilePicture
                : user?.username.slice(0, 2).toUpperCase()}
            </h1>
          </div>
          <div className="flex flex-col ml-1">
            <h1 className="text-md">{user?.displayName}</h1>
            <h1 className="text-sm">@{user?.username}</h1>
          </div>
        </div>
        <div className="flex items-center h-fit gap-2 bg-slate-700 px-2 py-1 rounded-sm hover:bg-slate-600 transition">
          <h1 className="text-sm text-gray-200">+</h1>
          <button className="text-sm text-gray-200">Follow</button>
        </div>
      </div>
    </div>
  );
}

export default RecommendedAccounts;
