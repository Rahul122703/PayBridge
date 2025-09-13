import React from "react";
import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { HomePage, PageNotFound } from "./src/pages/index";

const DashboardNotFound = () => (
  <div className="flex items-center justify-center h-full">
    <h1 className="text-2xl font-bold text-red-600">Page doesn’t exist</h1>
  </div>
);

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route path="home" element={<HomePage />} />
      <Route path="settings" element={<h1>Admin Settings</h1>} />
      <Route path="*" element={<DashboardNotFound />} />
    </Route>
  </Routes>
);
export default AdminRoutes;
