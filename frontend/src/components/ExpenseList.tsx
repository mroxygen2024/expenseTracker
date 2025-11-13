import React from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { deleteExpense } from "../services/expenses";

const ExpenseList: React.FC = () => {
  const { expenses, removeExpense } = useExpenseStore();

  const handleDelete = async (id: string) => {
    await deleteExpense(id);
    removeExpense(id);
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-bold mb-2">Expenses</h2>
      {expenses.length === 0 && <p>No expenses yet.</p>}
      <ul>
        {expenses.map((e) => (
          <li key={e.id} className="flex justify-between p-2 border-b">
            <span>{e.title} - ${e.amount}</span>
            <button
              onClick={() => handleDelete(e.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
