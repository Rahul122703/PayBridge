import React, { useState } from "react";

const LoginSignUpPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="h-[80vh]  flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <div className="w-full sm:w-full md:max-w-md p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        {/* Tabs */}
        <div className="flex justify-between mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("login")}
            className={`w-1/2 py-2 text-lg font-semibold transition-colors duration-200 ${
              activeTab === "login"
                ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400"
            }`}>
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`w-1/2 py-2 text-lg font-semibold transition-colors duration-200 ${
              activeTab === "signup"
                ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400"
            }`}>
            Sign Up
          </button>
        </div>

        {/* Form */}
        {activeTab === "login" ? (
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors duration-200">
              Login
            </button>
          </form>
        ) : (
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors duration-200">
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignUpPage;
