import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserCircle, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

/* --------------------- DROPDOWN MENU --------------------- */
const DropdownMenu = ({ dropdownRef }) => {
  const darkMode = useSelector((state) => state.ui.darkMode);

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 top-5 mt-2 w-44 rounded-lg shadow-lg z-50 overflow-hidden transition-colors duration-300
        ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-200 text-black"
        }`}>
      <ul className="flex flex-col">
        <Link to="/ProfilePage">
          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer">
            Profile
          </li>
        </Link>
        <Link to="/SettingsPage">
          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer">
            Settings
          </li>
        </Link>
        <li
          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
          onClick={() => toast.success("Logged out successfully")}>
          Logout
        </li>
      </ul>
    </div>
  );
};

/* --------------------- MOBILE TOPBAR --------------------- */
const TopbarMobile = ({ toggleDropdown, dropdownOpen, dropdownRef }) => {
  const darkMode = useSelector((state) => state.ui.darkMode);

  return (
    <div
      className={`w-full transition-all duration-300 px-4 py-3 flex justify-between items-center sticky top-0 md:hidden z-[200] 
        ${
          darkMode ? "bg-gray-900 text-white" : "sidebar-gradient text-white"
        }`}>
      <div className="text-xl font-bold tracking-wide">
        <Link to="/">ShareBro</Link>
      </div>
      <div className="flex items-center gap-5 relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition">
          <UserCircle size={26} />
          <span className="hidden sm:block font-medium">Rahul</span>
          <ChevronDown className="text-gray-300" size={18} />
        </button>
        {dropdownOpen && <DropdownMenu dropdownRef={dropdownRef} />}
      </div>
    </div>
  );
};

/* --------------------- DESKTOP TOPBAR --------------------- */
const TopbarDesktop = ({ toggleDropdown, dropdownOpen, dropdownRef }) => {
  const darkMode = useSelector((state) => state.ui.darkMode);

  return (
    <div
      className={`w-full transition-all duration-300 px-4 py-3 flex justify-between items-center sticky top-0 hidden md:flex
        ${darkMode ? "bg-gray-900 text-white" : "bg-transparent text-white"}`}>
      <div className="text-xl font-bold tracking-wide">
        <Link to="/">ShareBro</Link>
      </div>
      <div className="flex items-center gap-5 relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition">
          <UserCircle size={26} />
          <span className="hidden sm:block font-medium">Rahul</span>
          <ChevronDown className="text-gray-300" size={18} />
        </button>
        {dropdownOpen && <DropdownMenu dropdownRef={dropdownRef} />}
      </div>
    </div>
  );
};

/* --------------------- MAIN TOPBAR WRAPPER --------------------- */
export default function Topbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <TopbarMobile
        toggleDropdown={toggleDropdown}
        dropdownOpen={dropdownOpen}
        dropdownRef={dropdownRef}
      />
      <TopbarDesktop
        toggleDropdown={toggleDropdown}
        dropdownOpen={dropdownOpen}
        dropdownRef={dropdownRef}
      />
    </>
  );
}
