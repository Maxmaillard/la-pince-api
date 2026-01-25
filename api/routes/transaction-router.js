import { Router } from "express";
import { authenticate } from "../middlewares/index.js";
import transactionController from "../controllers/transaction-controller.js";

const router = Router();

// Dashboard
router.get("/dashboard", authenticate, transactionController.getDashboard);
// New transaction 
router.post("/new-transaction", authenticate,transactionController.createTransaction);
router.get("/transaction/:id", authenticate,transactionController.getTransactionById);
// Update transaction 
 router.put("/transaction/:id", authenticate,transactionController.updateTransaction);



export default router;
