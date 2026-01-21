import React from "react";
import { Outlet } from "react-router-dom";
import SettingsNavigationBar from "../Components/SettingsNavigationBar";

const SettingsPage = () => {
  return (
    <div>
      <SettingsNavigationBar />
      <Outlet />
    </div>
  );
};

export default SettingsPage;
