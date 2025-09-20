import { createSlice } from "@reduxjs/toolkit";
import { Home, UserPlus, Settings, Lock, FileText } from "lucide-react";
import { FiMoon, FiSun } from "react-icons/fi";
import { FaExchangeAlt, FaCreditCard } from "react-icons/fa";

const initialNavItems = [
  {
    label: "Home",
    route: "/home",
    icon: Home,
    isButton: false,
  },
  {
    label: "Transactions",
    route: "/transactions",
    icon: FaExchangeAlt,
    isButton: false,
  },
  {
    label: "Payment",
    route: "/payments",
    icon: FaCreditCard,
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
    themeColor: "#155DFC",
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

export const selectDarkMode = (state) => state.ui.darkMode;

// Optional selectors for sidebar and nav
export const selectCollapsed = (state) => state.ui.collapsed;
export const selectNavItems = (state) => state.ui.navItems;
export const selectThemeColor = (state) => state.ui.themeColor;
