import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircle, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../features/auth/AuthSlice";

const DropdownMenu = ({ onLogout }) => {
  const darkMode = useSelector((state) => state.ui.darkMode);

  return (
    <div
      className={`absolute right-0 top-5 mt-2 w-44 rounded-lg shadow-lg z-50 overflow-hidden transition-colors duration-300
        ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-200 text-black"
        }`}>
      <ul className="flex flex-col">
        <Link to="/ProfilePage">
          <li
            onClick={() => {}}
            className={`px-4 py-2 cursor-pointer transition-colors ${
              darkMode
                ? "hover:bg-gray-700 active:bg-gray-600"
                : "hover:bg-gray-100 active:bg-gray-200"
            }`}>
            Profile
          </li>
        </Link>
        <Link to="/SettingsPage">
          <li
            onClick={() => {}}
            className={`px-4 py-2 cursor-pointer transition-colors ${
              darkMode
                ? "hover:bg-gray-700 active:bg-gray-600"
                : "hover:bg-gray-100 active:bg-gray-200"
            }`}>
            Settings
          </li>
        </Link>
        <li
          onClick={onLogout}
          className={`px-4 py-2 cursor-pointer transition-colors ${
            darkMode
              ? "hover:bg-gray-700 active:bg-gray-600"
              : "hover:bg-gray-100 active:bg-gray-200"
          }`}>
          Logout
        </li>
      </ul>
    </div>
  );
};

const TopbarMobile = ({ toggleDropdown, dropdownOpen, onLogout }) => {
  const darkMode = useSelector((state) => state.ui.darkMode);
  const themeColor = useSelector((state) => state.ui.themeColor);
  const user = useSelector(selectUser);

  return (
    <div
      className={`w-full transition-all duration-300 px-4 py-3 flex justify-between items-center sticky top-0 md:hidden z-[200] 
        ${darkMode ? "bg-gray-900 text-white" : "text-white"}`}
      style={!darkMode ? { backgroundColor: themeColor } : {}}>
      <div className="text-xl font-bold tracking-wide">
        <Link to="/">EdvironPay</Link>
      </div>
      <div className="flex items-center gap-5 relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition">
          <UserCircle size={26} />
          <span className="hidden sm:block font-medium">
            {user?.name || "User"}
          </span>
          <ChevronDown className="text-gray-300" size={18} />
        </button>
        {dropdownOpen && <DropdownMenu onLogout={onLogout} />}
      </div>
    </div>
  );
};

const TopbarDesktop = ({ toggleDropdown, dropdownOpen, onLogout }) => {
  const darkMode = useSelector((state) => state.ui.darkMode);
  const themeColor = useSelector((state) => state.ui.themeColor);
  const user = useSelector(selectUser);

  return (
    <div
      className={`w-full transition-all duration-300 px-4 py-3 justify-between items-center sticky top-0 hidden md:flex
        ${darkMode ? "bg-gray-900 text-white" : "text-white"}`}
      style={!darkMode ? { backgroundColor: themeColor } : {}}>
      <div className="text-xl font-bold tracking-wide flex flex-row justify-between items-center w-full max-w-[10rem]">
        <Link to="/">EdvironPay</Link>
      </div>
      <div className="flex items-center gap-5 relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition">
          <UserCircle size={26} />
          <span className="hidden sm:block font-medium">
            {user?.name || "User"}
          </span>
          <ChevronDown className="text-gray-300" size={18} />
        </button>
        {dropdownOpen && <DropdownMenu onLogout={onLogout} />}
      </div>
    </div>
  );
};

export default function Topbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    setDropdownOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <>
      <TopbarMobile
        toggleDropdown={toggleDropdown}
        dropdownOpen={dropdownOpen}
        onLogout={handleLogout}
      />
      <TopbarDesktop
        toggleDropdown={toggleDropdown}
        dropdownOpen={dropdownOpen}
        onLogout={handleLogout}
      />
    </>
  );
}
