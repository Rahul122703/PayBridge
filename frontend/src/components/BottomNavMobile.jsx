import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleDarkMode,
  updateNavItemsByRole,
  selectNavItems,
  selectDarkMode,
  selectThemeColor,
} from "../features/ui/uISlice";
import { selectUser } from "../features/auth/AuthSlice";

export default function BottomNavMobile() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navItemsFromState = useSelector(selectNavItems);
  const darkMode = useSelector(selectDarkMode);
  const themeColor = useSelector(selectThemeColor);

 
  useEffect(() => {
    if (user?.role) {
      dispatch(updateNavItemsByRole(user.role));
    }
  }, [user, dispatch]);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full h-[4rem] flex justify-around items-center md:hidden z-50 border-t rounded-tr-2xl rounded-tl-2xl overflow-x-auto no-scrollbar
        ${
          darkMode
            ? "bg-gray-900 border-gray-700 text-gray-200"
            : "border-blue-700 text-white"
        }`}
      style={!darkMode ? { backgroundColor: themeColor } : {}}>
      {navItemsFromState.map((item, idx) => {
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
