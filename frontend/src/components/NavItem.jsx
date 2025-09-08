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
    "flex items-center gap-3 py-3 px-4 rounded-l-xl transition-colors duration-300";

  // Colors tuned for parent bg #1E1B44
  const activeClasses = "bg-white text-[#7C6BF6] shadow-md"; // highlighted background
  const inactiveClasses =
    "text-[#7C6BF6] hover:bg-[#2D285A] hover:text-[#7C6BF6]"; // transparent until hover

  // If it's the dark mode toggle button
  if (isButton && label.toLowerCase().includes("dark")) {
    return (
      <button
        onClick={() => dispatch(toggleDarkMode())}
        className={`w-full ${baseClasses} ${
          darkMode
            ? "bg-[#2D285A] text-[#7C6BF6]"
            : "bg-transparent text-[#7C6BF6] hover:bg-[#2D285A]"
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

  // Normal button (not link)
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

  // Normal link
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
