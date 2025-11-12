import { Request, Response } from "express";
import { prisma } from "../utils/db.js";
import { z } from "zod";

const expenseSchema = z.object({
  title: z.string(),
  amount: z.number().positive(),
  category: z.string(),
  date: z.string(),
});

// CREATE
export const addExpense = async (req: Request, res: Response) => {
  try {
    const { title, amount, category, date } = expenseSchema.parse(req.body);
    const userId = (req as any).userId;

    const expense = await prisma.expense.create({
      data: { title, amount, category, date: new Date(date), userId },
    });

    res.status(201).json(expense);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL
export const getExpenses = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const expenses = await prisma.expense.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(expenses);
  } catch {
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};

// DELETE
export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.expense.delete({ where: { id } });
    res.json({ message: "Expense deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete expense" });
  }
};
