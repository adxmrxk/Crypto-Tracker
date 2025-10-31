import React from "react";
import { X } from "lucide-react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import { BsChevronDown } from "react-icons/bs";


const ChangeCountry = ({ clickChangeCountry, setClickChangeCountry }) => {

  const { user, setUser } = useContext(UserContext);

  const Countries = [
  "Canada",
  "America",
  "Mexico",
  "Brazil",
  "Argentina",
  "Colombia",
  "Chile",
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Switzerland",
  "Portugal",
  "Netherlands",
  "Estonia",
  "Malta",
  "India",
  "Japan",
  "South Korea",
  "Singapore",
  "Hong Kong",
  "Indonesia",
  "Philippines",
  "Thailand",
  "United Arab Emirates",
  "Saudi Arabia",
  "Israel",
  "Bahrain",
  "South Africa",
  "Nigeria",
  "Kenya",
  "Ghana",
  "Central African Republic",
  "Australia",
  "New Zealand"

]

  const handleSubmit = async (e) => {

    e.preventDefault();
    const newCountryValue = e.target.elements.newCountry.value; 


    const res = await axios.patch(`http://localhost:5000/api/settings/changeCountry/${user._id}`, {settings: {country: newCountryValue}});
    const updatedUser = res.data;
    setUser(updatedUser);
    setClickChangeCountry(!clickChangeCountry);

  };


  const handleClose = () => setClickChangeCountry(!clickChangeCountry);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-sm bg-black/40">
      <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 w-full max-w-md rounded-xl p-6 shadow-2xl ring-1 ring-gray-500/40 transition-transform duration-200 scale-100 hover:scale-[1.01]">
        
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-xl text-gray-100 tracking-wide">Change your Country</h1>
          <X size={20} className="cursor-pointer text-gray-300 hover:text-white transition" onClick={handleClose}/>
        </div>

        <p className="text-gray-300/90 mb-6 -mt-3 text-sm text-left w-[300px]">Please enter your new Country.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <select name = 'newCountry' defaultValue='' className="outline-none appearance-auto apperence bg-slate-500/50 text-gray-100 placeholder-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:bg-slate-600 transition" required placeholder="New Country">

             <option value="" disabled hidden>Select a country</option>
             {Countries.map((country, index) => (
               <option key = {index} type = "text">{country}</option>
              ))}
          </select>
          
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={handleClose} className="bg-slate-500/40 hover:bg-slate-500/60 cursor-pointer text-gray-200 px-5 py-2 rounded-2xl transition">Cancel</button>
            <button type="submit" className="bg-gradient-to-r from-blue-400 to-purple-500 text-white cursor-pointer font-semibold px-6 py-2 rounded-2xl hover:opacity-90 transition">Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeCountry;
