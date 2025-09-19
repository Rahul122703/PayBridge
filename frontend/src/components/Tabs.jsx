
import React from "react";

import { selectActiveTab, setActiveTab } from "../features/auth/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
const Tabs = () => {
  const activeTab = useSelector(selectActiveTab);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between mb-6 border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={() => {
          dispatch(setActiveTab("login"));
        }}
        className={`w-1/2 py-2 text-lg font-semibold transition-colors duration-200 ${
          activeTab === "login"
            ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400"
            : "text-gray-500 dark:text-gray-400"
        }`}>
        Login
      </button>
      <button
        onClick={() => dispatch(setActiveTab("signup"))}
        className={`w-1/2 py-2 text-lg font-semibold transition-colors duration-200 ${
          activeTab === "signup"
            ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400"
            : "text-gray-500 dark:text-gray-400"
        }`}>
        Sign Up
      </button>
    </div>
  );
};

export default Tabs;
