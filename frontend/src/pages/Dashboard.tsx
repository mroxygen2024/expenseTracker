import React from "react";
import ExpenseList from "../components/ExpenseList";
import ExpenseForm from "../components/ExpenseForm";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0d4f66]">
      <div className="p-4 max-w-4xl mx-auto space-y-6">
        <ExpenseForm />
        <ExpenseList />
      </div>
    </div>
  );
};

export default Dashboard;
