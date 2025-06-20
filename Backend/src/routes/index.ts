import { Router } from "express";
import userRouter from "./user";
import expenseRouter from "./expense";
import budgetRouter from "./budget";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/user/expense",expenseRouter);
rootRouter.use("/user/budget",budgetRouter);

export default rootRouter;