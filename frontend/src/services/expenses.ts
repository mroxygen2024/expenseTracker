import api from "./api";

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export const getExpenses = async () => {
  const res = await api.get<Expense[]>("/expenses");
  return res.data;
};

export const createExpense = async (expense: Partial<Expense>) => {
  const res = await api.post<Expense>("/expenses", expense);
  return res.data;
};

export const deleteExpense = async (id: string) => {
  const res = await api.delete(`/expenses/${id}`);
  return res.data;
};
