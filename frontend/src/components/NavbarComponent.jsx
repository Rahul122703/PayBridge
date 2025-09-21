import { useState } from "react";
import { Link } from "react-router-dom";
import DarkModeToggleComponent from "./DarkModeToggleComponent";

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 shadow-md transition">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">
          <Link to="/">EdvironPay</Link>
        </h1>
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}>
      
          <div className="w-6 h-0.5 bg-gray-900 dark:bg-gray-100 mb-1"></div>
          <div className="w-6 h-0.5 bg-gray-900 dark:bg-gray-100 mb-1"></div>
          <div className="w-6 h-0.5 bg-gray-900 dark:bg-gray-100"></div>
        </button>
        <div className="hidden sm:flex sm:items-center gap-6">
          <Link
            to="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            About
          </Link>
          <Link
            to="/login"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Authenticate
          </Link>

          <DarkModeToggleComponent />
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden flex flex-col px-4 pb-4 gap-3">
          <Link
            to="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            About
          </Link>
          <Link
            to="/login"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Authenticate
          </Link>
          <DarkModeToggleComponent />
        </div>
      )}
    </nav>
  );
};

export default NavbarComponent;
