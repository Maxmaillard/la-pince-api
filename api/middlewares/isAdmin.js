import { StatusCodes } from "http-status-codes";

export const isAdmin = (req, res, next) => {
    // 1. On récupère l'utilisateur injecté par le middleware 'authenticate'
    const user = req.user;

    // 2. On vérifie si l'utilisateur existe et s'il a le rôle admin
    if (user && user.role === 'admin') {
        // C'est un admin, on passe à la suite (le contrôleur)
        next();
    } else {
        // C'est un intrus ou un simple user, on bloque avec une 403 (Forbidden)
        return res.status(StatusCodes.FORBIDDEN).json({ 
            error: "Accès refusé : privilèges administrateur requis." 
        });
    }
};