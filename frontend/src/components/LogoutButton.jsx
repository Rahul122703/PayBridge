import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
import { useSelector } from "react-redux";

const LogoutButton = ({ collapsed, isMobile }) => {
  const darkMode = useSelector((state) => state.ui.darkMode);

  return (
    <button
      onClick={() => toast.success("Logged out successfully")}
      className={`flex transition-colors duration-300 ${
        isMobile
          ? `flex-col text-xs gap-1 ${
              darkMode
                ? "text-gray-400 hover:text-white"
                : "text-blue-300 hover:text-white"
            }`
          : `items-center gap-3 py-3 px-4 rounded-xl ${
              darkMode
                ? "hover:bg-gray-700 text-gray-300"
                : "hover:bg-blue-800 text-gray-300"
            }`
      }`}>
      <LogOut className="w-5 h-5 flex-shrink-0" />
      {!collapsed && !isMobile && <span className="font-medium">Logout</span>}
    </button>
  );
};

export default LogoutButton;
