import { Link } from "react-router-dom";
import DarkModeToggleComponent from "./DarkModeToggleComponent";
const NavbarComponent = () => {
  return (
    <nav className="sticky top-0 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 p-4 shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 transition">
      <h1 className="text-2xl font-bold text-center sm:text-left">PayBridge</h1>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
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
          to="/contact"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition">
          Contact
        </Link>
        <DarkModeToggleComponent />
      </div>
    </nav>
  );
};

export default NavbarComponent;
