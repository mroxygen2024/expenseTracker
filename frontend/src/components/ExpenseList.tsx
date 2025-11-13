import React, { useEffect, useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { getExpenses, deleteExpense } from "../services/expenses";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import ExpenseDetails from "./ExpenseDetails"
import type { Expense } from "./ExpenseDetails";

const ExpenseList: React.FC = () => {
  const { expenses, setExpenses, removeExpense, loading, setLoading, setError, error } = useExpenseStore();
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
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-3 text-white">Expenses</h2>

        <div className="bg-[#0a3242] rounded shadow-md p-3 space-y-2">
          {loading ? (
            <p className="text-white/80 text-center py-4">Loading expenses...</p>
          ) : error ? (
            <p className="text-red-500 text-center py-4">{error}</p>
          ) : expenses.length === 0 ? (
            <p className="text-white/80 text-center py-4">No expenses yet.</p>
          ) : (
            <ul>
              {expenses.map((e) => (
                <li
                  key={e.id}
                  className="flex justify-between items-center p-3 border border-[#ffffff/20] rounded cursor-pointer hover:bg-[#0f6b8a]/20 transition"
                  onClick={() => setSelectedExpense(e)}
                >
                  <div>
                    <p className="font-medium text-white">{e.title}</p>
                    <p className="text-sm text-white/80">
                      ${e.amount} • {e.category} • {new Date(e.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDelete(e.id);
                    }}
                    className="bg-white text-[#0a3242] hover:bg-gray-200 font-semibold py-1 px-3 rounded"
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {selectedExpense && (
        <ExpenseDetails expense={selectedExpense} onClose={() => setSelectedExpense(null)} />
      )}
    </>
  );
};

export default ExpenseList;
