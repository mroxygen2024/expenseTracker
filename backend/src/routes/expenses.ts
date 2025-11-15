import express from "express";
import {
  addExpense,
  getExpenses,
  deleteExpense,
} from "../controllers/expenseController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();


router.use(authenticate);
router.post("/", addExpense);
router.get("/", getExpenses);
router.delete("/:id", deleteExpense);

export default router;
