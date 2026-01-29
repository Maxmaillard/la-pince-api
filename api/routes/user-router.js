import { Router } from "express";
import { authenticate } from "../middlewares/index.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { userController } from "../controllers/user-controller.js";


const router = Router();

router.get("/", authenticate, userController.getAll);

 //supprimer un utlisateur 
 router.delete("/:id", authenticate, userController.delete);

// Modifier un utilisateur
router.put("/:id", authenticate, userController.update);
// api/routes/user-router.js
router.patch("/:id/role", authenticate, isAdmin, userController.updateRole);

export default router;