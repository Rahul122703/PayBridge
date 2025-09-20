import React from "react";
import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { HomePage } from "./src/pages/index";
import SchoolPayPage from "./src/pages/SchoolPayPage";

const DashboardNotFound = () => (
  <div className="flex items-center justify-center h-full">
    <h1 className="text-2xl font-bold text-red-600">Page doesn’t exist</h1>
  </div>
);

const SchoolRoutes = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<HomePage />} />
      <Route path="classes" element={<h1>School Classes</h1>} />
      <Route path="dashboard" element={<h1>School Dashboard</h1>} />
      <Route path="payments" element={<SchoolPayPage />} />
      <Route path="*" element={<DashboardNotFound />} />
    </Route>
  </Routes>
);

export default SchoolRoutes;
