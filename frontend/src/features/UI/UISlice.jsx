import { createSlice } from "@reduxjs/toolkit";
import { Home, UserPlus, Settings, Lock, FileText } from "lucide-react";

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
];

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    darkMode: false,
    collapsed: false,
    navItems: initialNavItems,
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
