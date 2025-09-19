import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiMoon, FiSun } from "react-icons/fi";
import { toggleDarkMode } from "../features/ui/uISlice";
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


  const activeClasses = darkMode
    ? "bg-[#2D285A] text-[#7C6BF6] shadow-md" 
    : "bg-white text-[#7C6BF6] shadow-md"; 

  const inactiveClasses = darkMode
    ? "text-[#7C6BF6] hover:bg-[#1F1A4D] hover:text-[#7C6BF6]"
    : "text-[#E0E7FF] hover:bg-[#0F48B8] hover:text-[#E0E7FF]";


  if (isButton && label.toLowerCase().includes("dark")) {
    return (
      <button
        onClick={() => dispatch(toggleDarkMode())}
        className={`w-full ${baseClasses} ${
          darkMode
            ? "bg-[#2D285A] text-[#7C6BF6] hover:bg-[#1F1A4D]"
            : "bg-transparent text-[#E0E7FF] hover:bg-[#0F48B8]"
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
