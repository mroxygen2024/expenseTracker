import { create } from "zustand";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  userId?: string;
  createdAt?: string;
}

interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  setExpenses: (expenses: Expense[]) => void;
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  setError: (message: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  expenses: [],
  loading: false,
  error: null,

  setExpenses: (expenses) => set({ expenses }),
  addExpense: (expense) =>
    set((state) => ({ expenses: [expense, ...state.expenses] })),
  removeExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((e) => e.id !== id),
    })),
  setError: (message) => set({ error: message }),
  setLoading: (loading) => set({ loading }),
}));
