import React from "react";
import { NavbarComponent, FooterComponent } from "../src/components";

export const LandingLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <NavbarComponent />
    <main className="flex-1">{children}</main>
    <FooterComponent />
  </div>
);
