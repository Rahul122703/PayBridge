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
      className={`hidden md:flex h-screen p-4 flex-col justify-between transition-all duration-300 border border-none
        ${collapsed ? "w-20" : "w-60"} 
        ${darkMode ? "bg-gray-900 text-gray-200" : "bg-[#7785EE] text-white"}`}>
      <NavList
        items={navItems}
        pathname={location.pathname}
        collapsed={collapsed}
      />
      <LogoutButton collapsed={collapsed} />
    </div>
  );
}
