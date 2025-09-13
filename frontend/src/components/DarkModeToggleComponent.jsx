import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../features/ui/uISlice";
import { FiMoon, FiSun } from "react-icons/fi";

const DarkModeToggleComponent = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.ui.darkMode);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-colors duration-300
        ${
          darkMode
            ? "bg-gray-700 text-white hover:bg-gray-600"
            : "bg-gray-300 text-gray-900 hover:bg-gray-400"
        }`}>
      {darkMode ? (
        <FiSun className="text-lg" />
      ) : (
        <FiMoon className="text-lg" />
      )}
      <span className="hidden sm:inline"></span>
    </button>
  );
};

export default DarkModeToggleComponent;
