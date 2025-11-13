import React from "react";
import Navbar from "../components/Navbar";
import ExpenseList from "../components/ExpenseList";
import ExpenseForm from "../components/ExpenseForm";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f6f9fa]">
      <Navbar />
      <div className="p-4 max-w-4xl mx-auto space-y-6">
        <ExpenseForm />
        <ExpenseList />
      </div>
    </div>
  );
};

export default Dashboard;
