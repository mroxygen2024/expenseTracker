import React, { useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { createExpense } from "../services/expenses";

const ExpenseForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const { addExpense } = useExpenseStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense = await createExpense({ title, amount });
    addExpense(newExpense);
    setTitle("");
    setAmount(0);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Add Expense</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
};

export default ExpenseForm;
