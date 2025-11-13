import React, { useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { createExpense } from "../services/expenses";
import toast from "react-hot-toast";

const ExpenseForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const { addExpense } = useExpenseStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !amount || !category || !date) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      const newExpense = await createExpense({
        title,
        amount: Number(amount),
        category,
        date,
        note,
      });
      addExpense(newExpense);
      toast.success("Expense added successfully!");

      // Reset form
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
      setNote("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create expense");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-white p-4 rounded shadow-md"
    >
      <h2 className="text-lg font-semibold mb-3">Add Expense</h2>

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

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded w-full mb-2"
        required
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded w-full mb-2"
        required
      />

      <textarea
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="border p-2 rounded w-full mb-2 resize-none"
        rows={3}
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
