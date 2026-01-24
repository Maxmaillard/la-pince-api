import argon2 from "argon2";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { User } from "../models/user-model.js";
import { BaseController } from "./base-controller.js";


class AuthController extends BaseController {
    constructor() {
        super(User);
        this.resourceName = "User";
    }

    // INSCRIPTION
    register = async (req, res) => {
        const { first_name, last_name, email, password } = req.body;

        try {
            // Vérifier si l'utilisateur existe déjà
            const existingUser = await this.model.findOne({ where: { email } });
            if (existingUser) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    error: "Cet email est déjà utilisé"
                });
            }

            // Hash du mot de passe avec argon2
            const hash = await argon2.hash(password);

            // Hash alternatif avec bcrypt 
            //const hash2 = await bcrypt.hash(password, 10);

            // Création de l'utilisateur
            const user = await this.model.create({
                  // On stock uniquement la version hashé du mot de passe en base de donnée.
                // JAMAIS le mot de passe en clair.
                first_name,
                last_name,
                email,
                password: hash
            });

            return res.status(StatusCodes.CREATED).json({
                message: "Compte créé avec succès",
                user
            });

        } catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Internal server error"
            });
        }
    };

    // CONNEXION
    login = async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await this.model.findOne({ where: { email } });

            if (!user) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    error: "User not found."
                });
            }

            // Vérification du mot de passe
            const match = await argon2.verify(user.password, password);

            if (!match) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    error: "Invalid username or password"
                });
            }

            // Génération du token JWT
            // Si le mot de passe en clair et le mot de passe hashé matchent grâce à la méthode verify d'argon2
            // Je crée un json web token, qui me permettra de stocker l'utilisateur connecté dans une chaine de caractère chiffré
            const token = jwt.sign(
                { user_id: user.id_user },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );

            return res.status(StatusCodes.OK).json({
                message: "Connexion réussie",
                token
            });

        } catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Internal Server Error"
            });
        }
    };

    // INFOS UTILISATEUR CONNECTÉ
    getLoggedUserInfos = async (req, res) => {
        // Récupéré du JWT l'id de l'utilisateur
        const { user_id } = req.user;

        try {

            // Grâce à son ID, on récupère l'utilisateur complet
            const user = await this.model.findByPk(user_id, {
                attributes: ["id_user", "first_name", "last_name", "email"],
               
            });
// Si on ne trouve pas de user associé à l'id
            if (!user) {
                 // On renvoit une 404
                return res.status(StatusCodes.NOT_FOUND).json({
                    error: "Utilisateur introuvable"
                });
            }
// Si tout se passe bien, on renvois l'objet user au front.
            return res.status(StatusCodes.OK).json(user);

        } catch (error) {
 // Si jamais il y a une exception, une erreur inattendue, alors on renvoit une 500
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Erreur interne du serveur"
            });
        }
    };
}

const authController = new AuthController();
export default authController;