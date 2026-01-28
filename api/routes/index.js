import { Router } from "express";
import authRouter from "./auth-router.js";
import userRouter from "./user-router.js";
import * as mistralController from '../controllers/mistral-controller.js';

import transactionRouter from "./transaction-router.js";


const router = Router();
router.use("/auth", authRouter);
router.use("/users", userRouter);

router.use("/", transactionRouter);

// Route POST pour le chat
router.post('/chat/ask', mistralController.chatWithAI);

export default router;
