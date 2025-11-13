import React from "react";
import { Button } from "@/components/ui/button";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  note?: string;
}

interface ExpenseDetailsProps {
  expense: Expense;
  onClose: () => void;
}

const ExpenseDetails: React.FC<ExpenseDetailsProps> = ({ expense, onClose }) => {
  return (
    <div className="max-w-md w-full bg-white/10 border border-white/20 rounded-lg p-4 shadow-md text-white">
      <h2 className="text-2xl font-semibold mb-4 text-white">Expense Details</h2>
      <p className="mb-2"><strong>Title:</strong> {expense.title}</p>
      <p className="mb-2"><strong>Amount:</strong> ${expense.amount}</p>
      <p className="mb-2"><strong>Category:</strong> {expense.category}</p>
      <p className="mb-2"><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
      <p className="mb-2"><strong>Note:</strong> {expense.note || "No note provided."}</p>

      <Button
        onClick={onClose}
        className="mt-4 w-full bg-black text-[#0a3242] hover:bg-gray-200 font-semibold"
      >
        Close
      </Button>
    </div>
  );
};

export default ExpenseDetails;
