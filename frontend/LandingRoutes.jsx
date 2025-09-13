import React from "react";
import { Routes, Route } from "react-router-dom";
import { LandingLayout } from "./layouts/LandingLayout";
import {
  FirstPage,
  LoginSignUpPage,
  AboutPage,
  PageNotFound,
} from "./src/pages/index";
const LandingRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <LandingLayout>
          <FirstPage />
        </LandingLayout>
      }
    />
    <Route
      path="/login"
      element={
        <LandingLayout>
          <LoginSignUpPage />
        </LandingLayout>
      }
    />
    <Route
      path="/about"
      element={
        <LandingLayout>
          <AboutPage />
        </LandingLayout>
      }
    />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

export default LandingRoutes;
