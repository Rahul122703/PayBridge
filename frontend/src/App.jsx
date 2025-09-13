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

const App = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const role = useSelector(selectRole);

  return (
    <Router>
      <Routes>
        {/* ---------------- Landing routes always accessible for guests ---------------- */}
        {!isLoggedIn && <Route path="/*" element={<LandingRoutes />} />}

        {/* ---------------- Authenticated routes based on role ---------------- */}
        {isLoggedIn && role === "admin" && (
          <Route path="/*" element={<AdminRoutes />} />
        )}
        {isLoggedIn && role === "school" && (
          <Route path="/*" element={<SchoolRoutes />} />
        )}

        {/* ---------------- Fallback for logged-in users trying to access landing routes ---------------- */}
        {isLoggedIn && (
          <Route path="/*" element={<Navigate to="/dashboard" replace />} />
        )}
      </Routes>

      <Toaster />
    </Router>
  );
};

export default App;
