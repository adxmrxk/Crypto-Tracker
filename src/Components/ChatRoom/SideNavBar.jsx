import React from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";

const SideNavBar = () => {
  return (
    <div>
      <div className="bg-gray-400 z-50 absolute h-screen left-0 w-[75px] hover:w-[275px] transition-all duration-250">
        <h1>Side Nav Bar</h1>
        <div className="w-[100px] hover:w-[275px] transition-all duration-250  h-screen flex items-center justify-center ml-6">
          <FaChevronCircleRight className="w-[16px] h-[16px]" />
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
