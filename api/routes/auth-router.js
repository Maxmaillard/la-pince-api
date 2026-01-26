import { Router } from "express";
import authController from "../controllers/auth-controller.js";
import { validateRegister,authenticate,validateLogin } from "../middlewares/index.js";

const router = Router();
//register validation des champ +controller 
router.post("/register",validateRegister, authController.register);
//validate login
router.post("/login", validateLogin,authController.login);
router.get("/me", authenticate, authController.getLoggedUserInfos);


export default router;