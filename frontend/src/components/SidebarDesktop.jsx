import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import NavList from "./NavList";
import LogoutButton from "./LogoutButton";
import { toggleCollapse } from "../features/UI/UISlice";

export default function SidebarDesktop() {
  const location = useLocation();
  const dispatch = useDispatch();

  const collapsed = useSelector((state) => state.ui.collapsed);
  const navItemsFromState = useSelector((state) => state.ui.navItems);
  const darkMode = useSelector((state) => state.ui.darkMode);
  const themeColor = useSelector((state) => state.ui.themeColor);

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
      className={`hidden md:flex h-screen pt-4 pl-4 pb-4 flex-col justify-between transition-all duration-300 shadow-lg
        ${collapsed ? "w-20" : "w-64"} 
        ${
          darkMode
            ? "bg-gray-900 text-gray-200 border-r border-gray-700"
            : "bg-gray-50 text-gray-900 border-r border-gray-200"
        }`}
      style={
        !darkMode
          ? { backgroundColor: themeColor || "#f3f4f6" } // fallback to light gray if no theme
          : {}
      }>
      {/* Nav List */}
      <NavList
        items={navItems}
        pathname={location.pathname}
        collapsed={collapsed}
      />

      {/* Logout Button */}
      <LogoutButton collapsed={collapsed} />
    </div>
  );
}
