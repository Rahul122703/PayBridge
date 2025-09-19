
import React, { useState } from "react";

import { Tabs, LoginForm, SignupForm } from "../components";

import { selectActiveTab, setActiveTab } from "../features/auth/AuthSlice";
import { useSelector } from "react-redux";

const LoginSignUpPage = () => {
  const activeTab = useSelector(selectActiveTab);
  return (
    <div className="h-[95vh] flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <div className="w-full sm:w-full md:max-w-md p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        <Tabs />

        {activeTab === "login" ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

export default LoginSignUpPage;
