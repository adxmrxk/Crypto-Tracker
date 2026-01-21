import React, { useContext, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { UserContext } from "../../Pages/SkeletonPage";

const FONT_SIZES = [
  { value: "0.75rem", label: "Extra Small", preview: "Aa" },
  { value: "0.875rem", label: "Small", preview: "Aa" },
  { value: "1rem", label: "Default", preview: "Aa" },
  { value: "1.125rem", label: "Large", preview: "Aa" },
  { value: "1.25rem", label: "Extra Large", preview: "Aa" },
  { value: "1.5rem", label: "2X Large", preview: "Aa" },
  { value: "2rem", label: "3X Large", preview: "Aa" },
  { value: "2.5rem", label: "4X Large", preview: "Aa" }
];

const ChangeFontSize = ({ clickChangeFontSize, setClickChangeFontSize }) => {
  const { user, setUser } = useContext(UserContext);
  const [selectedSize, setSelectedSize] = useState(user?.settings?.fontSize || "1rem");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/settings/changeFontSize/${user._id}`,
        { fontSize: selectedSize }
      );
      const updatedUser = res.data;
      setUser(updatedUser);
      setClickChangeFontSize(false);
    } catch (error) {
      alert("Failed to update font size. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => setClickChangeFontSize(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-sm bg-black/40">
      <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 w-full max-w-md rounded-xl p-6 shadow-2xl ring-1 ring-gray-500/40 transition-transform duration-200 scale-100 hover:scale-[1.01]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-xl text-gray-100 tracking-wide">
            Change Font Size
          </h1>
          <X
            size={20}
            className="cursor-pointer text-gray-300 hover:text-white transition"
            onClick={handleClose}
          />
        </div>

        <p className="text-gray-300/90 mb-6 -mt-3 text-sm text-left">
          Choose your preferred font size for better readability.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-2">
            {FONT_SIZES.map((size) => (
              <button
                key={size.value}
                type="button"
                onClick={() => setSelectedSize(size.value)}
                className={`flex items-center justify-between p-3 rounded-lg border transition ${
                  selectedSize === size.value
                    ? "border-blue-500 bg-blue-500/20"
                    : "border-gray-600 bg-slate-500/30 hover:bg-slate-500/50"
                }`}
              >
                <span className="text-gray-200 text-sm">{size.label}</span>
                <span
                  className="text-gray-100 font-medium"
                  style={{ fontSize: size.value }}
                >
                  {size.preview}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4 p-3 bg-slate-500/30 rounded-lg">
            <p className="text-gray-400 text-xs mb-2">Preview:</p>
            <p className="text-gray-100" style={{ fontSize: selectedSize }}>
              The quick brown fox jumps over the lazy dog.
            </p>
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
              disabled={isSaving}
              className="bg-gradient-to-r from-blue-400 to-purple-500 text-white cursor-pointer font-semibold px-6 py-2 rounded-2xl hover:opacity-90 transition disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeFontSize;