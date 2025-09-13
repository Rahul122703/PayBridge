import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, TopBar } from "../src/components";

export const DashboardLayout = () => (
  <div className="flex min-h-screen bg-white dark:bg-gray-900 dark:text-white transition">
    <Sidebar />
    <div className="flex flex-col flex-1">
      <TopBar />
      <main className="flex-1 overflow-y-auto md:h-[50vh] rounded-2xl p-4 bg-white dark:bg-gray-800">
        <Outlet />
      </main>
    </div>
  </div>
);
