import React from "react";

const ChangeEmail = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div className="bg-gray-300 w-[450px] h-fit rounded-lg flex flex-col items-start p-3">
        <h1 className="font-semibold text-lg text-left">
          Change your email adress
        </h1>
        <p className="text-left w-[300px]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem eaque modi.
        </p>
        <form className="flex flex-col gap-2 mt-4">
          <input type="text" placeholder="Example@example.com" className="outline-0 border border-black rounded-md w-[423px] px-1"></input>
          <input
            type="text"
            placeholder="Confirm Email"
            className="outline-0 border border-black rounded-md px-1"
          ></input>
          <div className="flex flex-row justify-end p-1 gap-3">
            <button className="bg-blue-200 px-3 py-2 rounded-2xl">Cancel</button>
            <button type = "submit" className="bg-blue-400 px-3 py-2 rounded-2xl">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeEmail;
