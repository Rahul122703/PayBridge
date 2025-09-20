import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, TopBar } from "../src/components";
import { useSelector } from "react-redux";
import { selectThemeColor, selectDarkMode } from "../src/features/ui/uISlice";

export const DashboardLayout = () => {
  const themeColor = useSelector(selectThemeColor);
  const darkMode = useSelector(selectDarkMode);

  return (
    <div
      className="flex h-screen dark:bg-gray-900 dark:text-white transition-colors duration-300"
      style={!darkMode ? { backgroundColor: themeColor || "#08088F" } : {}}>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="flex-1 overflow-y-auto md:h-[50vh] rounded-2xl p-4 dark:bg-gray-800 bg-white border border-none">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
