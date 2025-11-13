import React, { useEffect } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import type { Expense } from "../store/useExpenseStore";
import { getExpenses, deleteExpense } from "../services/expenses";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      try {
        const data: Expense[] = await getExpenses();
        setExpenses(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch expenses");
        toast.error(err.message || "Failed to fetch expenses");
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
    } catch (err: any) {
      toast.error(err.message || "Failed to delete expense");
    }
  };

  return (
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
                className="flex justify-between items-center p-3 border-b hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-medium">{e.title}</p>
                  <p className="text-sm text-gray-600">
                    ${e.amount} • {e.category} • {new Date(e.date).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  onClick={() => handleDelete(e.id)}
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
  );
};

export default ExpenseList;
