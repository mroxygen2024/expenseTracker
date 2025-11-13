import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect after logout
  };

  return (
    <nav className="bg-[#0f6b8a] text-white p-4 flex flex-wrap justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        myExpense
      </Link>

      <div className="flex flex-wrap items-center gap-3 mt-2 sm:mt-0">
        {user ? (
          <>
            <span className="font-medium text-white">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-[#0a3242] hover:bg-[#08303b] px-4 py-1 rounded text-white font-medium transition"
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
