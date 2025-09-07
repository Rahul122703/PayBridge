import { Link } from "react-router-dom";
import { DarkModeToggleComponent } from ".";

const NavbarComponent = () => {
  return (
    <nav className="sticky top-0 bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white p-4 shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 transition">
      <h1 className="text-xl font-bold text-center sm:text-left">My App</h1>

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
        <DarkModeToggleComponent />
      </div>
    </nav>
  );
};

export default NavbarComponent;
