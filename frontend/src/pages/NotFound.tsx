import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f9fa]">
      <h1 className="text-6xl font-bold text-[#0a3242] mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>
      <Link to="/">
        <Button className="bg-[#0f6b8a] hover:bg-[#0a3242]">Go Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
