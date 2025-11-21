import React from "react";
import LabelBottomNavigation from "../Components/LabelBottomNavigation";
import HomePannel from "../Components/Home/HomePannel";

const HomePage = () => {
  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
      <HomePannel></HomePannel>

      <LabelBottomNavigation></LabelBottomNavigation>
    </div>
  );
};

export default HomePage;
