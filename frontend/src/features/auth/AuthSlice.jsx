import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  userLevel: null,
  activeTab: "login",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    setActiveTab: (state, action) => {
      console.log("action.payload");
      console.log(action.payload);
      state.activeTab = action.payload;
    },
  },
});

export const { login, logout, setActiveTab } = authSlice.actions;
export default authSlice.reducer;

export const selectActiveTab = (state) => state.auth.activeTab;
