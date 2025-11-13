import React, { useEffect, useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { getExpenses, deleteExpense } from "../services/expenses";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ExpenseDetails from "./ExpenseDetails"
import type { Expense } from "./ExpenseDetails";

const ExpenseList: React.FC = () => {
  const {
    expenses,
    setExpenses,
    removeExpense,
    loading,
    setLoading,
    setError,
    error,
  } = useExpenseStore();

  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      try {
        const data: Expense[] = await getExpenses();
        setExpenses(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          toast.error(err.message);
        } else {
          setError("Failed to fetch expenses");
          toast.error("Failed to fetch expenses");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [setExpenses, setLoading, setError]);

  const handleDelete = async (id: string) => {
    try {
      await deleteExpense(id);
      removeExpense(id);
      toast.success("Expense deleted successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Failed to delete expense");
    }
  };

  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-4">Loading expenses...</p>
          ) : error ? (
            <p className="text-center py-4 text-red-500">{error}</p>
          ) : expenses.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No expenses yet.</p>
          ) : (
            <ul>
              {expenses.map((e) => (
                <li
                  key={e.id}
                  className="flex justify-between items-center p-3 border-b hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => setSelectedExpense(e)}
                >
                  <div>
                    <p className="font-medium">{e.title}</p>
                    <p className="text-sm text-gray-600">
                      ${e.amount} • {e.category} •{" "}
                      {new Date(e.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    onClick={(event) => {
                      event.stopPropagation(); // prevent modal open on delete
                      handleDelete(e.id);
                    }}
                    variant="destructive"
                    size="sm"
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {selectedExpense && (
        <ExpenseDetails
          expense={selectedExpense}
          onClose={() => setSelectedExpense(null)}
        />
      )}
    </>
  );
};

export default ExpenseList;
