import React, { useContext } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { UserContext } from "../../Pages/SkeletonPage";
import { FaChevronDown } from "react-icons/fa";

const CONTENT_LANGUAGES = [
  "English (CA)",
  "English (US)",
  "English (UK)",
  "English",
  "Spanish",
  "Portuguese",
  "German",
  "French",
  "Italian",
  "Dutch",
  "Estonian",
  "Maltese",
  "Hindi",
  "Japanese",
  "Korean",
  "Chinese",
  "Indonesian",
  "Filipino",
  "Thai",
  "Arabic",
  "Hebrew",
  "Zulu",
  "Swahili"
];

const ChangeContentLanguage = ({ clickChangeContentLanguage, setClickChangeContentLanguage }) => {
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newContentLanguage = e.target.elements.newContentLanguage.value;

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/settings/changeContentLanguage/${user._id}`,
        { contentLanguage: newContentLanguage }
      );
      const updatedUser = res.data;
      setUser(updatedUser);
      setClickChangeContentLanguage(false);
    } catch (error) {
      alert("Failed to update content language. Please try again.");
    }
  };

  const handleClose = () => setClickChangeContentLanguage(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-sm bg-black/40">
      <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 w-full max-w-md rounded-xl p-6 shadow-2xl ring-1 ring-gray-500/40 transition-transform duration-200 scale-100 hover:scale-[1.01]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-xl text-gray-100 tracking-wide">
            Change Content Language
          </h1>
          <X
            size={20}
            className="cursor-pointer text-gray-300 hover:text-white transition"
            onClick={handleClose}
          />
        </div>

        <p className="text-gray-300/90 mb-6 -mt-3 text-sm text-left">
          Select the language for external content such as articles and news.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="relative">
            <select
              name="newContentLanguage"
              defaultValue={user?.settings?.contentLanguage || ""}
              className="w-full outline-none appearance-none bg-slate-500/50 text-gray-100 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:bg-slate-600 transition"
              required
            >
              <option value="" disabled hidden>
                Select a language
              </option>
              {CONTENT_LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <FaChevronDown
              size={11}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="bg-slate-500/40 hover:bg-slate-500/60 cursor-pointer text-gray-200 px-5 py-2 rounded-2xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-400 to-purple-500 text-white cursor-pointer font-semibold px-6 py-2 rounded-2xl hover:opacity-90 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeContentLanguage;