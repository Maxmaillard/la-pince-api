import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { User } from "../models/user-model.js";


//VALIDATION du REGISTER 
export function validateRegister(req, res, next) {
    const schema = Joi.object({

        first_name: Joi.string()
        .min(2)
        .required(),
        last_name: Joi.string()
        .min(2).
        required(),
        email: Joi.string()
        .email()
        .required(),
        password: Joi.string()
        .min(8)
        .required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });

    next();
}

// VALIDATION DU  LOGIN
export function validateLogin(req, res, next) {
    const schema = Joi.object({
        email: Joi.string()
        .email()
        .required(),
        password: Joi.string()
        .min(8)
        .required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });

    next();
}

//  AUTHENTIFICATION
export function authenticate(req, res, next) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Token manquant ou invalide" });
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Token invalide ou expiré" });
    }
}