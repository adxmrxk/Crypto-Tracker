import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import Messages from "../../Assets/Messages.png";
import Create from "../../Assets/Create.png";

//https://dribbble.com/shots/26376426-Metamint-Stock-Market-Dashboard-UI
const HomePannel = () => {
  const { user, setUser } = useContext(UserContext);

  const [selectedDate, setSelectedDate] = useState("");
  const [overAllUp, setOverAllUp] = useState(1500);

  return (
    <div className="w-[80%] mx-auto">
      <div className="flex flex-col border-2 mt-5">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-semibold text-gray-800 text-left mb-3">
            {user?.username}
          </h1>
          <ul className="flex flex-row gap-5 items-center cursor-pointer">
            <li>
              <img
                className="w-[28px] h-[28px] cursor-pointer"
                src={Messages}
              />
            </li>
            <li>
              <img className="w-[26px] h-[26px]" src={Create} />
            </li>
          </ul>
        </div>
        <div className="flex flex-row border-2 mb-5"></div>
        <div className="border-4 flex justify-start border-red-200 w-[625px] h-[400px]">
          <h1>Portfolio Chart</h1>
        </div>
      </div>
    </div>
  );
};

export default HomePannel;
