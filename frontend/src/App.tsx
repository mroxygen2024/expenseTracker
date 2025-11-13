// import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useAuthStore } from "./store/useAuthStore";

const App: React.FC = () => {
//  const checkAuth = useAuthStore((state) => state.checkAuth);
  const token = useAuthStore.getState().token; // get token from Zustand store
  // useEffect(() => {
  //   checkAuth();
  // }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
