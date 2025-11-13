import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#0f6b8a] to-[#0a3242] overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-96 h-96 bg-white/10 rounded-full animate-pulse"></div>

      <div className="relative text-center z-10 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Take Control of Your Expenses
        </h1>
        <p className="text-white/80 text-lg md:text-xl mb-8">
          Track your spending, save smarter, and reach your financial goals.
        </p>

        <Link to="/register">
          <Button className="bg-white text-[#0f6b8a] px-8 py-3 text-lg font-semibold rounded-full hover:bg-gray-100 transition">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
