import { createSlice } from "@reduxjs/toolkit";
import { Home, UserPlus, Settings, Lock, FileText } from "lucide-react";
import { FiMoon, FiSun } from "react-icons/fi";

const initialNavItems = [
  {
    label: "Home",
    route: "/home",
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
    action: null, // You can assign this dynamically in the component
  },
];

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    darkMode: false,
    collapsed: false,
    navItems: initialNavItems,
    themeColor: "#155DFC",
  },
  reducers: {
    // ✅ Toggle Tailwind dark mode
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },

    // ✅ Toggle sidebar collapse
    toggleCollapse: (state) => {
      state.collapsed = !state.collapsed;
    },

    // ✅ Replace nav items dynamically if needed
    setNavItems: (state, action) => {
      state.navItems = action.payload;
    },
  },
});

// ✅ Export actions
export const { toggleDarkMode, toggleCollapse, setNavItems } = uiSlice.actions;

// ✅ Export reducer
export default uiSlice.reducer;

// ✅ Selector for dark mode (used in App.jsx)
export const selectDarkMode = (state) => state.ui.darkMode;

// Optional selectors for sidebar and nav
export const selectCollapsed = (state) => state.ui.collapsed;
export const selectNavItems = (state) => state.ui.navItems;
export const selectThemeColor = (state) => state.ui.themeColor;
