import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import NavList from "./NavList";
import LogoutButton from "./LogoutButton";
import {
  toggleCollapse,
  selectNavItems,
  selectDarkMode,
  selectThemeColor,
} from "../features/ui/uISlice";
import { selectCollapsed } from "../features/ui/uISlice";
import { selectUser } from "../features/auth/AuthSlice";
import { updateNavItemsByRole } from "../features/ui/uISlice";

export default function SidebarDesktop() {
  const location = useLocation();
  const dispatch = useDispatch();
  const collapsed = useSelector(selectCollapsed);
  const navItemsFromState = useSelector(selectNavItems);
  const darkMode = useSelector(selectDarkMode);
  const themeColor = useSelector(selectThemeColor);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user?.role) {
      dispatch(updateNavItemsByRole(user.role));
    }
  }, [user, dispatch]);

  const navItems = [
    {
      label: collapsed ? "Expand Sidebar" : "Collapse Sidebar",
      icon: collapsed ? PanelLeftOpen : PanelLeftClose,
      action: () => dispatch(toggleCollapse()),
      isButton: true,
    },
    ...navItemsFromState,
  ];

  return (
    <div
      className={`hidden md:flex h-screen pt-4 pl-4 pb-4 flex-col justify-between transition-all duration-300
        ${collapsed ? "w-20" : "w-60"} 
        ${darkMode ? "bg-gray-900 text-gray-200" : "text-white"}`}
      style={!darkMode ? { backgroundColor: themeColor } : {}}>
      <NavList
        items={navItems}
        pathname={location.pathname}
        collapsed={collapsed}
      />
      <LogoutButton collapsed={collapsed} />
    </div>
  );
}
