import { createSlice } from "@reduxjs/toolkit";

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
  
    login: (state, action) => {
      const { message, name, email, role, token } = action.payload;
      const userData = { name, email, role, token, message };

      state.user = userData;
      state.isLoggedIn = true;
      state.role = role;

    
      localStorage.setItem(
        "authUser",
        JSON.stringify({ user: userData, role })
      );
    },


    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.role = null;

      localStorage.removeItem("authUser");
    },

    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});


export const { login, logout, setActiveTab } = authSlice.actions;


export default authSlice.reducer;


export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.user.token;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectRole = (state) => state.auth.role;
export const selectActiveTab = (state) => state.auth.activeTab;
