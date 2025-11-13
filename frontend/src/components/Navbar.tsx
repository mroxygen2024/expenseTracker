import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  return (
    <nav className="bg-primary text-white p-4 flex justify-between">
      <h1 className="font-bold">Expense Tracker</h1>
      <div>
        {user && <span className="mr-4">{user}</span>}
        <button onClick={logout} className="bg-accent1 px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
