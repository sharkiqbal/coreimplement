import React from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const LogoutButton = ({ isSidebarOpen }) => {
  const { signout } = useAuth();

  const handleLogout = async () => {
    await signout();
    window.location.href = "/admin-core-0004";
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all hover:scale-102"
    >
      <LogOut className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
      {isSidebarOpen && <span className="font-semibold">Logout</span>}
    </button>
  );
};

export default LogoutButton;
