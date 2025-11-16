import express from "express";
import {
  addExpense,
  getExpenses,
  deleteExpense,
} from "../controllers/expenseController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     summary: Add a new expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - category
 *               - date
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 50.75
 *               category:
 *                 type: string
 *                 example: "Food"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-02-01"
 *               note:
 *                 type: string
 *                 example: "Lunch with friends"
 *     responses:
 *       201:
 *         description: Expense created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, addExpense);

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Get all expenses of the logged-in user
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of expenses
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, getExpenses);

/**
 * @swagger
 * /api/expenses/{id}:
 *   delete:
 *     summary: Delete an expense by ID
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Expense ID
 *         schema:
 *           type: string
 *           example: "67af5c53b02e23a49ba12345"
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Expense not found
 */
router.delete("/:id", authenticate, deleteExpense);

export default router;
