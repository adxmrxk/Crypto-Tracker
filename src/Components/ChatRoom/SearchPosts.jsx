import React, { useState } from "react";
import { Search } from "lucide-react";

function SearchPosts() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-700/50 text-white pl-12 pr-4 py-3 rounded-xl border border-slate-600 focus:border-amber-500 focus:outline-none placeholder-gray-400"
        />
      </div>
    </div>
  );
}

export default SearchPosts;
