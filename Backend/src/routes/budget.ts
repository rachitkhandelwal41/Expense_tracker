import express from "express";

import { Budget, Expense } from "../db";
import { authenticateToken,AuthenticatedRequest } from "../auth";
import { z } from "zod";


const budgetRouter = express.Router();


// Save or Update Budget
const allowedCategories = [
  "Food",
  "Rent",
  "Shopping",
  "Transport",
  "Entertainment",
  "Healthcare",
  "Utilities",
  "Other",
]as const;

// Zod Schema
const budgetZodSchema = z.object({
  month: z
    .number({
      required_error: "Month is required",
      invalid_type_error: "Month must be a number",
    })
    .min(0)
    .max(11),
  year: z
    .number({
      required_error: "Year is required",
      invalid_type_error: "Year must be a number",
    })
    .min(2000),
  budgets: z.record(
    z.enum(allowedCategories),
    z.number({
      required_error: "Budget must be a number",
      invalid_type_error: "Budget must be a number",
    }).min(0, "Budget must be at least 0")
  ),
});

// POST /budget/set
budgetRouter.post("/set", authenticateToken, async (req:AuthenticatedRequest, res):Promise<any>=> {
  const userId = req.userId;

  const parsed = budgetZodSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid budget input",
      issues: parsed.error.issues,
    });
  }

  const { month, year, budgets } = parsed.data;

  try {
    const updated = await Budget.findOneAndUpdate(
      { userId, month, year },
      { $set: { budgets } },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      message: "Budget saved successfully",
      data: updated,
    });
  } catch (err) {
    console.error("Error saving budget:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// Get Budget for User (current month by default)
budgetRouter.get("/all", authenticateToken, async (req:AuthenticatedRequest, res):Promise<any> => {
  const userId = req.userId;
  const now = new Date();
  const month = Number(req.query.month ?? now.getMonth());
  const year = Number(req.query.year ?? now.getFullYear());

  try {
    const data = await Budget.findOne({ userId, month, year });
    res.status(200).json({ budgets: data?.budgets || {} });
  } catch (err) {
    console.error("Error fetching budget:", err);
    res.status(500).json({ message: "Failed to fetch budget" });
  }
});
budgetRouter.get("/alerts", authenticateToken, async (req: AuthenticatedRequest, res):Promise<any> => {
  const userId = req.userId;

  const now = new Date();
  const month = now.getMonth(); // 0-based
  const year = now.getFullYear();
  

  try {
    // Get all expenses for the current user & month
    const allExpenses = await Expense.find({ userId });

    const currentMonthExpenses = allExpenses.filter(exp => {
      const date = new Date(exp.date);
      console.log("Expense date:", exp.date, "Parsed:", new Date(exp.date), "Now:", new Date());
console.log("Comparing Month:", new Date(exp.date).getMonth(), "vs", month);
console.log("Expense category:", exp.category);

      return date.getMonth() === month && date.getFullYear() === year;
    });
    


    // Fetch user's budget for the current month
    const userBudget:any = await Budget.findOne({ userId, month, year });

    if (!userBudget) {
      return res.status(404).json({ message: "No budget set for this month" });
    }

    // Calculate total spent per category
    const categoryTotals: Record<string, number> = {};
    currentMonthExpenses.forEach((exp: any) => {
      if (!categoryTotals[exp.category]) categoryTotals[exp.category] = 0;
      categoryTotals[exp.category] += exp.amount;
    });

    // Compare with budgets
    const overBudgetDetails: any[] = [];

    const budgetsObject = userBudget.budgets instanceof Map
  ? Object.fromEntries(userBudget.budgets)
  : userBudget.budgets;

for (const [category, totalSpent] of Object.entries(categoryTotals)) {
  const budgetAmount = budgetsObject?.[category];

  if (budgetAmount !== undefined && budgetAmount !== null) {
    const percentUsed = (totalSpent / budgetAmount) * 100;

    if (percentUsed >= 80) {
      overBudgetDetails.push({
        category,
        budget: budgetAmount,
        spent: totalSpent,
        percentUsed: percentUsed.toFixed(2),
        status:
          percentUsed >= 100
            ? "Over budget"
            : "Near budget limit (80%)",
      });
    }
  }
}


    return res.status(200).json({
      alerts: overBudgetDetails,
    });
  } catch (err) {
    console.error("Error in /budget/alerts:", err);
    return res.status(500).json({ message: "Failed to compute budget alerts" });
  }
});


export default budgetRouter;
