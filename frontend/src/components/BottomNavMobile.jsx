import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../features/ui/uISlice";

export default function BottomNavMobile() {
  const location = useLocation();
  const navItems = useSelector((state) => state.ui.navItems);
  const darkMode = useSelector((state) => state.ui.darkMode);
  const dispatch = useDispatch();
  const themeColor = useSelector((state) => state.ui.themeColor);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full h-[4rem] flex justify-around items-center md:hidden z-50 border-t rounded-tr-2xl rounded-tl-2xl overflow-x-auto no-scrollbar
        ${
          darkMode
            ? "bg-gray-900 border-gray-700 text-gray-200"
            : "border-blue-700 text-white"
        }`}
      style={!darkMode ? { backgroundColor: themeColor } : {}}>
      {navItems.map((item, idx) => {
        const isActive = location.pathname === item.route;
        const Icon = item.icon;

      
        if (item.isButton && item.label.toLowerCase().includes("dark")) {
          return (
            <button
              key={idx}
              onClick={() => dispatch(toggleDarkMode())}
              className={`flex flex-col items-center text-xs gap-1 min-w-[4rem] transition-colors
                ${
                  darkMode
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-blue-200 hover:text-white"
                }`}>
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        }

    
        return (
          <Link
            key={idx}
            to={item.route}
            className={`flex flex-col items-center text-xs gap-1 min-w-[4rem] transition-colors
              ${
                isActive
                  ? "text-white"
                  : darkMode
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-blue-200 hover:text-white"
              }`}>
            <Icon className="w-5 h-5" />
            <span className="text-[10px]">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
