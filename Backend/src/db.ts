import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  throw new Error("MONGO_URL not found in environment variables.");
}

mongoose.connect(mongoUrl)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));



const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0.01,
    max: 999999.99,
  },
  category: {
    type: String,
    required: true,
    enum: ["Food", "Rent", "Shopping", "Transport", "Entertainment", "Healthcare", "Utilities", "Other"],
  },
  date: {
    type: Date,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["UPI", "Credit Card", "Debit Card", "Cash", "Net Banking"],
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  notes: {
    type: String,
    maxlength: 500,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user2',
  },
}, { timestamps: true });


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
}, { timestamps: true });
const categoryList = [
  "Food",
  "Rent",
  "Shopping",
  "Transport",
  "Entertainment",
  "Healthcare",
  "Utilities",
  "Other",
];

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    month: {
      type: Number, 
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    budgets: {
      type: Map,
      of: {
        type: Number,
        min: 0,
      },
      validate: {
        validator: (v: Map<string, number>) =>
          Array.from(v.keys()).every((key) => categoryList.includes(key)),
        message: "Invalid category in budgets",
      },
    },
  },
  { timestamps: true }
);

budgetSchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });

export const Budget = mongoose.model("Budget", budgetSchema);
export const Expense = mongoose.model("Expense", expenseSchema);
export const user2 = mongoose.model("user2", userSchema);
