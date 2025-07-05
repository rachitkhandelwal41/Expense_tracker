import express from "express";
import cors from "cors";
import rootRouter from "./routes";

const app = express();


// Handle preflight requests
app.options("*", cors({
  origin: ["https://expense-tracker2-two.vercel.app", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
