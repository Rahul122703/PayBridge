import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../features/UI/UISlice";
import { FiMoon, FiSun } from "react-icons/fi";

const NavItem = ({
  icon: Icon,
  label,
  route,
  isButton,
  onClick,
  collapsed,
}) => {
  const darkMode = useSelector((state) => state.ui.darkMode);
  const dispatch = useDispatch();

  const resolved = useResolvedPath(route);
  const match = useMatch({ path: resolved.pathname, end: true });
  const isActive = !!match;

  const baseClasses =
    "flex items-center gap-3 py-3 px-4 rounded-xl transition-colors duration-300";

  const activeClasses = darkMode
    ? "bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-lg"
    : "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg";

  const inactiveClasses = darkMode
    ? "hover:bg-gray-700 text-gray-300"
    : "hover:bg-blue-800 text-gray-300";

  // If it's the dark mode toggle button
  if (isButton && label.toLowerCase().includes("dark")) {
    return (
      <button
        onClick={() => dispatch(toggleDarkMode())}
        className={`w-full ${baseClasses} ${
          darkMode
            ? "bg-gray-700 text-white hover:bg-gray-600"
            : "bg-gray-300 text-gray-900 hover:bg-gray-400"
        } flex items-center gap-3`}>
        {darkMode ? (
          <FiSun className="w-5 h-5" />
        ) : (
          <FiMoon className="w-5 h-5" />
        )}
        {!collapsed && <span className="font-medium">{label}</span>}
      </button>
    );
  }

  // Normal button or link
  if (isButton) {
    return (
      <button
        onClick={onClick}
        className={`w-full ${baseClasses} ${inactiveClasses}`}>
        <Icon className="w-5 h-5 flex-shrink-0" />
        {!collapsed && <span className="font-medium">{label}</span>}
      </button>
    );
  }

  return (
    <Link
      to={route}
      className={`${baseClasses} ${
        isActive ? activeClasses : inactiveClasses
      }`}>
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!collapsed && <span className="font-medium">{label}</span>}
    </Link>
  );
};

export default NavItem;
