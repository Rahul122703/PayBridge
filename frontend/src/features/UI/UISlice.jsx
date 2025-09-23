import { createSlice } from "@reduxjs/toolkit";
import { Home } from "lucide-react";
import { FiMoon } from "react-icons/fi";
import { FaExchangeAlt, FaCreditCard } from "react-icons/fa";

const initialNavItems = [
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

    updateNavItemsByRole: (state, action) => {
      const role = action.payload;

      let newNavItems = [
        {
          label: "Toggle Dark Mode",
          icon: FiMoon,
          isButton: true,
          action: null,
        },
      ];

      if (role === "admin") {
        newNavItems = [
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
            label: "Toggle Dark Mode",
            icon: FiMoon,
            isButton: true,
            action: null,
          },
        ];
      } else if (role === "school") {
        newNavItems = [
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
      }

      state.navItems = newNavItems;
    },
  },
});

export const {
  toggleDarkMode,
  toggleCollapse,
  setNavItems,
  updateNavItemsByRole,
} = uiSlice.actions;

export default uiSlice.reducer;
export const selectDarkMode = (state) => state.ui.darkMode;
export const selectCollapsed = (state) => state.ui.collapsed;
export const selectNavItems = (state) => state.ui.navItems;
export const selectThemeColor = (state) => state.ui.themeColor;
