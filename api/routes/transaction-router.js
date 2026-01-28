import { Router } from "express";
import { authenticate } from "../middlewares/index.js";
import transactionController from "../controllers/transaction-controller.js";

const router = Router();

// Récupérer toutes les transactions
router.get("/transactions", authenticate, transactionController.getAllTransactions);

// Créer une transaction
router.post("/transactions", authenticate, transactionController.createTransaction);

// Récupérer une transaction par ID
router.get("/transactions/:id", authenticate, transactionController.getTransactionById);

// Modifier une transaction
router.put("/transactions/:id", authenticate, transactionController.updateTransaction);

// Supprimer une transaction
router.delete("/transactions/:id", authenticate, transactionController.deleteTransaction);

export default router;
