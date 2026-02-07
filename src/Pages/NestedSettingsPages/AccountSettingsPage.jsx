import { useState, useContext } from "react";
import { UserContext } from "../SkeletonPage";
import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LabelBottomNavigation from "../../Components/LabelBottomNavigation";
import Footer from "../../Components/Shared/Footer";
import ChangeEmail from "../../Components/Settings/ChangeEmail";
import ChangeUsername from "../../Components/Settings/ChangeUsername";
import ChangeGender from "../../Components/Settings/ChangeGender";
import ChangeDisplayName from "../../Components/Settings/ChangeDisplayName";
import ChangeProfilePicture from "../../Components/Settings/ChangeProfilePicture";
import DeleteAccount from "../../Components/Settings/DeleteAccount";

function AccountSettingsPage() {
  const { user, setUser } = useContext(UserContext);
  const [clickChangeEmail, setClickChangeEmail] = useState(false);
  const [clickChangeUsername, setClickChangeUsername] = useState(false);
  const [clickChangeDisplayName, setClickChangeDisplayName] = useState(false);
  const [clickChangeProfilePicture, setClickChangeProfilePicture] = useState(false);
  const [clickChangeGender, setClickChangeGender] = useState(false);
  const [clickDeleteAccount, setClickDeleteAccount] = useState(false);

  return (
    <div>
      {clickChangeEmail && (
        <ChangeEmail
          clickChangeEmail={clickChangeEmail}
          setClickChangeEmail={setClickChangeEmail}
        />
      )}
      {clickChangeUsername && (
        <ChangeUsername
          clickChangeUsername={clickChangeUsername}
          setClickChangeUsername={setClickChangeUsername}
        />
      )}
      {clickChangeDisplayName && (
        <ChangeDisplayName
          clickChangeDisplayName={clickChangeDisplayName}
          setClickChangeDisplayName={setClickChangeDisplayName}
        />
      )}
      {clickChangeProfilePicture && (
        <ChangeProfilePicture
          clickChangeProfilePicture={clickChangeProfilePicture}
          setClickChangeProfilePicture={setClickChangeProfilePicture}
        />
      )}
      {clickChangeGender && (
        <ChangeGender
          clickChangeGender={clickChangeGender}
          setClickChangeGender={setClickChangeGender}
        />
      )}
      {clickDeleteAccount && (
        <DeleteAccount
          clickDeleteAccount={clickDeleteAccount}
          setClickDeleteAccount={setClickDeleteAccount}
        />
      )}

      <div className="rounded-md w-[100%] h-auto relative top-4 p-3">
        <h1 className="font-roboto font-bold text-xl my-5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">General</h1>
        <hr className="border-amber-500/30 my-1 w-[80%] mx-auto mask-x-from-0.5"></hr>

        {/* Email */}
        <div className="flex justify-between items-center m-5 mt-10 mb-10">
          <h2 className="font-roboto font-normal w-[60px] pl-25 text-gray-100">Email</h2>
          <div
            className="flex items-center gap-[8px] mr-22 cursor-pointer group"
            onClick={() => setClickChangeEmail(!clickChangeEmail)}
          >
            <p className="font-normal text-amber-400 group-hover:text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)] transition-colors">{user?.email}</p>
            <ChevronRightIcon className="text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
          </div>
        </div>

        {/* Username */}
        <div>
          <div
            className="flex justify-between items-center m-5 mt-10 mb-10 cursor-pointer"
            onClick={() => setClickChangeUsername(true)}
          >
            <div>
              <h2 className="font-roboto font-normal w-[60px] pl-25 text-gray-100">Username</h2>
              <p className="font-roboto text-sm w-fit ml-25 text-gray-400">Your unique identifier used for mentions and your profile URL.</p>
            </div>
            <div className="flex items-center gap-[8px] mr-22 group">
              <p className="font-normal text-amber-400 group-hover:text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)] transition-colors">{user?.username}</p>
              <ChevronRightIcon className="text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
            </div>
          </div>
        </div>

        {/* Display Name */}
        <div>
          <div
            className="flex justify-between items-center m-5 mt-10 mb-10 cursor-pointer"
            onClick={() => setClickChangeDisplayName(true)}
          >
            <div>
              <h2 className="font-roboto font-normal w-[60px] pl-25 text-nowrap text-gray-100">Display Name</h2>
              <p className="font-roboto text-sm w-fit ml-25 text-gray-400">The name shown on your profile and posts. Can be different from your username.</p>
            </div>
            <div className="flex items-center gap-[8px] mr-22 group">
              <p className="font-normal text-amber-400 group-hover:text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)] transition-colors">{user?.displayName || user?.username}</p>
              <ChevronRightIcon className="text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
            </div>
          </div>
        </div>

        {/* Profile Picture */}
        <div
          className="flex justify-between items-center m-5 mt-10 mb-10 cursor-pointer"
          onClick={() => setClickChangeProfilePicture(true)}
        >
          <h2 className="font-roboto font-normal w-[120px] pl-25 text-nowrap text-gray-100">Profile Picture</h2>
          <div className="flex items-center gap-[8px] mr-22 group">
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <p className="font-normal text-amber-400 group-hover:text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)] transition-colors">Not set</p>
            )}
            <ChevronRightIcon className="text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
          </div>
        </div>

        {/* Gender */}
        <div
          className="flex justify-between items-center m-5 mt-10 mb-10 cursor-pointer"
          onClick={() => setClickChangeGender(!clickChangeGender)}
        >
          <h2 className="font-roboto font-normal w-[60px] pl-25 text-gray-100">Gender</h2>
          <div className="flex items-center gap-[8px] mr-22 group">
            <p className="font-normal text-amber-400 group-hover:text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)] transition-colors">
              {user?.gender ? user.gender : "Not specified"}
            </p>
            <ChevronRightIcon className="text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
          </div>
        </div>

        <h1 className="font-roboto font-bold text-xl my-5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">Advanced</h1>
        <hr className="border-amber-500/30 my-1 w-[80%] mx-auto mask-x-from-0.5"></hr>

        {/* Delete Account */}
        <div>
          <div
            className="flex justify-between items-center m-5 mt-10 mb-10 cursor-pointer"
            onClick={() => setClickDeleteAccount(true)}
          >
            <h2 className="font-roboto font-normal w-fit ml-25 text-gray-100">Delete Account</h2>
            <div className="flex items-center gap-[8px] mr-22 group">
              <p className="font-normal text-amber-400 group-hover:text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)] transition-colors">Delete</p>
              <ChevronRightIcon className="text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
            </div>
          </div>
          <p className="font-roboto text-sm w-fit ml-30 -mt-9 text-gray-400">
            Permanently remove your account and all data.
          </p>
        </div>

        <Footer />
        <LabelBottomNavigation />
      </div>
    </div>
  );
}

export default AccountSettingsPage;
