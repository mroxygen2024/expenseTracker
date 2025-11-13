import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const { user} = useAuthStore();
  const handleLogout = () => {
    logout();
    navigate("/"); // navigate to home or login page
  };

  return (
    <nav className="bg-[#0f6b8a] text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        myExpense
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="font-medium">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-[#0a3242] hover:bg-[#08303b] px-4 py-1 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-[#0f6b8a] px-4 py-1 rounded font-medium hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-[#0f6b8a] px-4 py-1 rounded font-medium hover:bg-gray-100 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
