import { createSlice } from "@reduxjs/toolkit";
import { Home, UserPlus, Settings, Lock, FileText } from "lucide-react";
import { use } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useSelector } from "react-redux";

const initialNavItems = [
  {
    label: "Home",
    route: "/",
    icon: Home,
    isButton: false,
  },
  {
    label: "Add User",
    route: "/add-user",
    icon: UserPlus,
    isButton: false,
  },
  {
    label: "Settings",
    route: "/settings",
    icon: Settings,
    isButton: false,
  },
  {
    label: "Lock",
    route: "/lock",
    icon: Lock,
    isButton: false,
  },
  {
    label: "Files",
    route: "/files",
    icon: FileText,
    isButton: false,
  },
  {
    label: "Toggle Dark Mode",
    icon: FiMoon,
    isButton: true,
    action: null,
  },
];

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    darkMode: false,
    collapsed: false,
    navItems: initialNavItems,
    themeColor: "#1E1B44",
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleCollapse: (state) => {
      state.collapsed = !state.collapsed;
    },
    setNavItems: (state, action) => {
      state.navItems = action.payload;
    },
  },
});

export const { toggleDarkMode, toggleCollapse, setNavItems } = uiSlice.actions;
export default uiSlice.reducer;
