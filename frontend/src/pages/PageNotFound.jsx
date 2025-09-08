import React from "react";

import { NavbarComponent } from "../components";

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <NavbarComponent />

      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center">404 - Page Not Found</h1>
      </div>
    </div>
  );
};

export default PageNotFound;
