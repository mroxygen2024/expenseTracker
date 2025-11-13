import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { getExpenses } from "../services/expenses";
import { useExpenseStore } from "../store/useExpenseStore";

const Dashboard: React.FC = () => {
  const { setExpenses } = useExpenseStore();

  useEffect(() => {
    (async () => {
      const data = await getExpenses();
      setExpenses(data);
    })();
  }, [setExpenses]);

  return (
    <div className="min-h-screen bg-[#f6f9fa]">
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        <ExpenseForm />
        <ExpenseList />
      </div>
    </div>
  );
};

export default Dashboard;
