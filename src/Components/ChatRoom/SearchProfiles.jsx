import React from "react";
import { FiSearch } from "react-icons/fi";

function SearchProfiles() {
  return (
    <div className="border-2 border-purple-600 h-[75px] w-[890px] py-3 px-4 ml-71 flex items-center">
      <form className="w-full">
        <div className="relative w-full">
          {/* Icon */}
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500 text-xl pointer-events-none" />

          {/* Input */}
          <input
            type="text"
            placeholder="Search profiles..."
            className="w-full h-[45px] pl-10 pr-3 rounded-md outline-none"
          />
        </div>
      </form>
    </div>
  );
}

export default SearchProfiles;
