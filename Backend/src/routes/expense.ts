import { Router } from "express";
import { AuthenticatedRequest, authenticateToken } from "../auth";
import { Expense } from "../db";
import { z } from "zod";
import { error } from "console";

const expenseRouter=Router();

const expenseZodSchema = z.object({
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .min(0.01, "Amount must be at least 0.01")
    .max(999999.99, "Amount must be less than or equal to 999999.99"),

  category: z.enum([
    "Food",
    "Rent",
    "Shopping",
    "Transport",
    "Entertainment",
    "Healthcare",
    "Utilities",
    "Other",
  ], {
    required_error: "Category is required",
  }),

  date: z.coerce.date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date format",
  }),

  paymentMethod: z.enum([
    "UPI",
    "Credit Card",
    "Debit Card",
    "Cash",
    "Net Banking",
  ], {
    required_error: "Payment method is required",
  }),

  description: z
    .string({
      required_error: "Description is required",
    })
    .min(1, "Description must be at least 1 character")
    .max(255, "Description must be at most 255 characters"),

  notes: z
    .string()
    .max(500, "Notes must be at most 500 characters")
    .optional(),

  userId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID")
    .optional(),
});
const updatedTaskSchema=z.object({
    amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .min(0.01, "Amount must be at least 0.01")
    .max(999999.99, "Amount must be less than or equal to 999999.99").optional(),

  category: z.enum([
    "Food",
    "Rent",
    "Shopping",
    "Transport",
    "Entertainment",
    "Healthcare",
    "Utilities",
    "Other",
  ], {
    required_error: "Category is required",
  }).optional(),

  date: z.coerce.date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date format",
  }).optional(),

  paymentMethod: z.enum([
    "UPI",
    "Credit Card",
    "Debit Card",
    "Cash",
    "Net Banking",
  ], {
    required_error: "Payment method is required",
  }).optional(),

  description: z
    .string({
      required_error: "Description is required",
    })
    .min(1, "Description must be at least 1 character")
    .max(255, "Description must be at most 255 characters").optional(),

  notes: z
    .string()
    .max(500, "Notes must be at most 500 characters")
    .optional(),

  userId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID")
    .optional(),

})


expenseRouter.post("/create", authenticateToken, async (req: AuthenticatedRequest, res): Promise<any> => {
  const userId = req.userId;
  const data = req.body;

  const parsed = expenseZodSchema.safeParse(data);

  if (!parsed.success) {
    return res.status(411).json({
      message: "Invalid Inputs",
      issues: parsed.error.issues, 
    });
  }

  const { amount, category, date, paymentMethod, description, notes } = parsed.data;

  try {
    const expense = await Expense.create({
      amount,
      category,
      date,
      paymentMethod,
      description,
      notes,
      userId,
    });

    return res.status(201).json({
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    console.error("Error while creating expense:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});
expenseRouter.put("/update/:id", authenticateToken, async (req: AuthenticatedRequest, res): Promise<any> => {
  const id = req.params.id;  
  const { amount, category, date, paymentMethod, description, notes } = req.body;

  // Validate with Zod
  const { success, error } = updatedTaskSchema.safeParse({
    amount,
    category,
    date,
    paymentMethod,
    description,
    notes,
  });

  if (!success) {
    return res.status(400).json({
      message: "Invalid expense data",
      issues: error.issues, 
    });
  }

  try {
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Update only defined fields
    if (amount !== undefined) expense.amount = amount;
    if (category !== undefined) expense.category = category;
    if (date !== undefined) expense.date = date;
    if (paymentMethod !== undefined) expense.paymentMethod = paymentMethod;
    if (description !== undefined) expense.description = description;
    if (notes !== undefined) expense.notes = notes;

    await expense.save();
    return res.status(200).json({
      message: "Expense updated successfully",
      updatedExpense: expense
    });

  } catch (err) {
    console.error("Error updating expense:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});
expenseRouter.get("/all", authenticateToken, async (req: AuthenticatedRequest, res): Promise<any> => {
  const userId = req.userId;

  try {
    const expenses = await Expense.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({ expenses });
  } catch (err) {
    console.error("Error fetching expenses:", err);
    return res.status(500).json({ message: "Failed to retrieve expenses" });
  }
});
expenseRouter.delete("/delete/:id", authenticateToken, async (req: AuthenticatedRequest, res): Promise<any> => {
  const userId = req.userId;
  const expenseId = req.params.id;

  try {
    const expense = await Expense.findOne({ _id: expenseId, userId });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found or unauthorized" });
    }

    await Expense.deleteOne({ _id: expenseId });

    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error("Error deleting expense:", err);
    return res.status(500).json({ message: "Failed to delete expense" });
  }
});

export default expenseRouter;