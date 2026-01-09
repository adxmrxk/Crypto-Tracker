import React from "react";
import { FiSearch } from "react-icons/fi";

function SearchProfiles() {
  return (
    <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-xs h-[75px] w-[890px] py-3 px-4 ml-71 flex items-center">
      <form className="w-full">
        <div className="relative w-full">
          {/* Icon */}
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50 text-xl pointer-events-none" />

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
