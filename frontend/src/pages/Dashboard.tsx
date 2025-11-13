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
    <div className="min-h-screen bg-accent2">
      <Navbar />
      <div className="p-4 max-w-4xl mx-auto">
        <ExpenseForm />
        <ExpenseList />
      </div>
    </div>
  );
};

export default Dashboard;
