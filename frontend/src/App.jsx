import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import LandingRoutes from "../LandingRoutes";
import AdminRoutes from "../AdminRoutes";
import SchoolRoutes from "../SchoolRoutes";

import { selectIsLoggedIn, selectRole } from "./features/auth/AuthSlice";
import { selectDarkMode } from "./features/ui/uISlice";
const App = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const role = useSelector(selectRole);
  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        {!isLoggedIn && <Route path="/*" element={<LandingRoutes />} />}

        {isLoggedIn && role === "admin" && (
          <Route path="/*" element={<AdminRoutes />} />
        )}
        {isLoggedIn && role === "school" && (
          <Route path="/*" element={<SchoolRoutes />} />
        )}

        {isLoggedIn && (
          <Route path="/*" element={<Navigate to="/dashboard" replace />} />
        )}
      </Routes>

      <Toaster />
    </Router>
  );
};

export default App;
