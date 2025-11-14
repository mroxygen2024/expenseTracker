import { prisma } from "../utils/db.js";
import { z } from "zod";
const expenseSchema = z.object({
    amount: z.number().positive(),
    category: z.string(),
    date: z.string().optional(),
    note: z.string().optional(),
});
// CREATE
export const addExpense = async (req, res) => {
    try {
        const { amount, category, date, note } = expenseSchema.parse(req.body);
        const userId = req.userId;
        const expense = await prisma.expense.create({
            data: { amount, category, date: new Date(date), userId, note, },
        });
        res.status(201).json(expense);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// GET ALL
export const getExpenses = async (req, res) => {
    try {
        const userId = req.userId;
        const expenses = await prisma.expense.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
        res.json(expenses);
    }
    catch {
        res.status(500).json({ message: "Failed to fetch expenses" });
    }
};
// DELETE
export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.expense.delete({ where: { id } });
        res.json({ message: "Expense deleted" });
    }
    catch {
        res.status(500).json({ message: "Failed to delete expense" });
    }
};
