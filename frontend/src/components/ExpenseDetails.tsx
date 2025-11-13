import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define the Expense type
export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  note?: string;
}

// Props type for this component
interface ExpenseDetailsProps {
  expense: Expense | null;
  onClose: () => void;
}

const ExpenseDetails: React.FC<ExpenseDetailsProps> = ({ expense, onClose }) => {
  if (!expense) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <Card className="w-96 bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Expense Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">
            <strong>Title:</strong> {expense.title}
          </p>
          <p className="mb-2">
            <strong>Amount:</strong> ${expense.amount}
          </p>
          <p className="mb-2">
            <strong>Category:</strong> {expense.category || "N/A"}
          </p>
          <p className="mb-2">
            <strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}
          </p>
          <p className="mb-2">
            <strong>Note:</strong> {expense.note || "No note provided."}
          </p>

          <Button
            onClick={onClose}
            className="mt-4 w-full bg-gray-800 text-white"
          >
            Close
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseDetails;
