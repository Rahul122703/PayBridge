import { createSlice } from "@reduxjs/toolkit";

// ✅ Try to load from localStorage first
const storedUser = JSON.parse(localStorage.getItem("authUser"));

const initialState = {
  user: storedUser ? storedUser.user : null,
  isLoggedIn: storedUser ? true : false,
  role: storedUser ? storedUser.role : null,
  activeTab: "login",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ✅ Store details & set login state
    login: (state, action) => {
      const { message, name, email, role, token } = action.payload;
      const userData = { name, email, role, token, message };

      state.user = userData;
      state.isLoggedIn = true;
      state.role = role;

      // ✅ Save to localStorage
      localStorage.setItem(
        "authUser",
        JSON.stringify({ user: userData, role })
      );
    },

    // ✅ Clear user data & reset login state
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.role = null;

      // ✅ Remove from localStorage
      localStorage.removeItem("authUser");
    },

    // ✅ Manage active tab (login/signup toggle)
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

// ✅ Export actions
export const { login, logout, setActiveTab } = authSlice.actions;

// ✅ Export reducer
export default authSlice.reducer;

// ✅ Selectors for accessing state
export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectRole = (state) => state.auth.role;
export const selectActiveTab = (state) => state.auth.activeTab;
