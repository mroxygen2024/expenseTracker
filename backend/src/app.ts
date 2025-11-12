import express from "express";
import dotenv from "dotenv";
// import prisma from "./utils/prismaClient.ts";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Expense Tracker Backend is running ✅");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
