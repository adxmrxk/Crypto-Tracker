import { useState, useContext } from "react";
import { UserContext } from "../SkeletonPage";
import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ControlledSwitches from "../../Components/ControlledSwitches";
import Footer from "../../Components/Shared/Footer";
import LabelBottomNavigation from "../../Components/LabelBottomNavigation";
import ChangeCountry from "../../Components/Settings/ChangeCountry";
import ChangeCurrency from "../../Components/Settings/ChangeCurrency";
import ChangedisplayLanguage from "../../Components/Settings/ChangeDisplayLanguage";
import ChangeContentLanguage from "../../Components/Settings/ChangeContentLanguage";
import ChangeFontSize from "../../Components/Settings/ChangeFontSize";
import axios from "axios";

const DisplayAndThemePage = () => {
  const { user, setUser } = useContext(UserContext);

  const [clickChangeCountry, setClickChangeCountry] = useState(false);
  const [clickChangeCurrency, setClickChangeCurrency] = useState(false);
  const [clickChangedisplayLanguage, setClickChangedisplayLanguage] = useState(false);
  const [clickChangeContentLanguage, setClickChangeContentLanguage] = useState(false);
  const [clickChangeFontSize, setClickChangeFontSize] = useState(false);

  const handleScreenReaderChange = async (checked) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/settings/changeScreenReader/${user._id}`,
        { screenReaderSupport: checked }
      );
      setUser(res.data);
    } catch (error) {
      console.error("Failed to update screen reader setting");
    }
  };

  const handleAnimationsChange = async (checked) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/settings/changeAnimations/${user._id}`,
        { animations: checked }
      );
      setUser(res.data);
    } catch (error) {
      console.error("Failed to update animations setting");
    }
  };

  const getFontSizeLabel = (fontSize) => {
    const labels = {
      "0.75rem": "Extra Small",
      "0.875rem": "Small",
      "1rem": "Default",
      "1.125rem": "Large",
      "1.25rem": "Extra Large",
      "1.5rem": "2X Large",
      "2rem": "3X Large",
      "2.5rem": "4X Large"
    };
    return labels[fontSize] || "Default";
  };

  return (
    <div>
      {clickChangeCountry && (
        <ChangeCountry
          clickChangeCountry={clickChangeCountry}
          setClickChangeCountry={setClickChangeCountry}
        />
      )}
      {clickChangeCurrency && (
        <ChangeCurrency
          clickChangeCurrency={clickChangeCurrency}
          setClickChangeCurrency={setClickChangeCurrency}
        />
      )}
      {clickChangedisplayLanguage && (
        <ChangedisplayLanguage
          clickChangedisplayLanguage={clickChangedisplayLanguage}
          setClickChangedisplayLanguage={setClickChangedisplayLanguage}
        />
      )}
      {clickChangeContentLanguage && (
        <ChangeContentLanguage
          clickChangeContentLanguage={clickChangeContentLanguage}
          setClickChangeContentLanguage={setClickChangeContentLanguage}
        />
      )}
      {clickChangeFontSize && (
        <ChangeFontSize
          clickChangeFontSize={clickChangeFontSize}
          setClickChangeFontSize={setClickChangeFontSize}
        />
      )}

      <div className="rounded-md w-[100%] h-auto relative top-4 p-3">
        <h1 className="font-roboto font-bold text-xl my-5 pl-9 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">Region</h1>
        <hr className="border-amber-500/30 my-1 w-[80%] mx-auto mask-x-from-0.5"></hr>

        {/* Country */}
        <div>
          <div className="flex justify-between items-center m-5 mt-10 mb-10">
            <h2 className="font-roboto font-normal w-fit ml-25 text-gray-100">Country</h2>
            <div
              className="flex items-center gap-[8px] mr-22 cursor-pointer group"
              onClick={() => setClickChangeCountry(!clickChangeCountry)}
            >
              <p className="font-normal text-amber-400 group-hover:text-amber-300 transition-colors drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">{user?.settings?.country}</p>
              <ChevronRightIcon className="text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
            </div>
          </div>
          <p className="font-roboto text-sm w-fit ml-30 -mt-9 text-gray-400">
            Set your location for regional content and services.
          </p>
        </div>

        {/* Currency */}
        <div>
          <div className="flex justify-between items-center m-5 mt-10 mb-10">
            <h2 className="font-roboto font-normal w-fit ml-25 text-gray-100">Currency</h2>
            <div
              className="flex items-center gap-[8px] mr-22 cursor-pointer group"
              onClick={() => setClickChangeCurrency(!clickChangeCurrency)}
            >
              <p className="font-normal text-amber-400 group-hover:text-amber-300 transition-colors drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">{user?.settings?.currency}</p>
              <ChevronRightIcon className="text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
            </div>
          </div>
          <p className="font-roboto text-sm w-fit ml-30 -mt-9 text-gray-400">
            Choose how prices and values are displayed.
          </p>
        </div>

        {/* Display Language */}
        <div>
          <div
            className="flex justify-between items-center m-5 mt-10 mb-10"
          >
            <h2 className="font-roboto font-normal w-fit ml-25 text-gray-100">Display Language</h2>
            <div
              className="flex items-center gap-[8px] mr-22 cursor-pointer group"
              onClick={() => setClickChangedisplayLanguage(!clickChangedisplayLanguage)}
            >
              <p className="font-normal text-amber-400 group-hover:text-amber-300 transition-colors drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">{user?.settings?.displayLanguage}</p>
              <ChevronRightIcon className="text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
            </div>
          </div>
          <p className="font-roboto text-sm w-fit ml-30 -mt-9 text-gray-400">
            Defines the language used on CryptoScope's interface.
          </p>
        </div>

        {/* Content Language */}
        <div>
          <div
            className="flex justify-between items-center m-5 mt-10 mb-10"
          >
            <h2 className="font-roboto font-normal w-fit ml-25 text-gray-100">Content Language</h2>
            <div
              className="flex items-center gap-[8px] mr-22 cursor-pointer group"
              onClick={() => setClickChangeContentLanguage(!clickChangeContentLanguage)}
            >
              <p className="font-normal text-amber-400 group-hover:text-amber-300 transition-colors drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">{user?.settings?.contentLanguage}</p>
              <ChevronRightIcon className="text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
            </div>
          </div>
          <p className="font-roboto text-sm w-fit ml-30 -mt-9 text-gray-400">
            Controls the language of outside content such as articles.
          </p>
        </div>

        <h1 className="font-roboto font-bold text-xl pl-9 my-5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">Accessibility</h1>
        <hr className="border-amber-500/30 my-1 w-[80%] mx-auto mask-x-from-0.5"></hr>

        {/* Font Size */}
        <div>
          <div
            className="flex justify-between items-center m-5 mt-10 mb-10"
          >
            <h2 className="font-roboto font-normal w-fit ml-25 text-gray-100">Font Size</h2>
            <div
              className="flex items-center gap-[8px] mr-22 cursor-pointer group"
              onClick={() => setClickChangeFontSize(!clickChangeFontSize)}
            >
              <p className="font-normal text-amber-400 group-hover:text-amber-300 transition-colors drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">{getFontSizeLabel(user?.settings?.fontSize)}</p>
              <ChevronRightIcon className="text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
            </div>
          </div>
          <p className="font-roboto text-sm w-fit ml-30 -mt-9 text-gray-400">
            Controls the size of the font across pages.
          </p>
        </div>

        {/* Screen Reader */}
        <div>
          <div className="flex justify-between items-center m-5 mt-10 mb-10">
            <h2 className="font-roboto font-normal w-fit ml-25 text-gray-100">Screen Reader Support</h2>
            <div className="flex items-center gap-[8px] mr-22 cursor-pointer group">
              <div className="mr-2">
                <ControlledSwitches
                  checked={user?.settings?.screenReaderSupport || false}
                  onChange={handleScreenReaderChange}
                />
              </div>
            </div>
          </div>
          <p className="font-roboto text-sm w-fit ml-30 -mt-9 text-gray-400">
            Adds extra descriptions for compatibility with screen readers.
          </p>
        </div>

        <h1 className="font-roboto font-bold text-xl pl-9 my-5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">Appearance</h1>
        <hr className="border-amber-500/30 my-1 w-[80%] mx-auto mask-x-from-0.5"></hr>

        {/* Animations */}
        <div>
          <div className="flex justify-between items-center m-5 mt-10 mb-10">
            <h2 className="font-roboto font-normal w-fit ml-25 text-gray-100">Animations</h2>
            <div className="pr-24">
              <ControlledSwitches
                checked={user?.settings?.animations ?? true}
                onChange={handleAnimationsChange}
              />
            </div>
          </div>
          <p className="font-roboto text-sm w-fit ml-30 -mt-9 text-gray-400">
            Enable or disable motion effects across the app.
          </p>
        </div>

        <Footer />
        <LabelBottomNavigation />
      </div>
    </div>
  );
};

export default DisplayAndThemePage;
