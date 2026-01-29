import { StatusCodes } from 'http-status-codes';
export class BaseController {
    constructor(model) {
        this.model = model;
    }

    // Récupérer tous les éléments
    getAll = async (req, res) => {
        try {
            const items = await this.model.findAll();
            res.json(items);
        } catch (error) {
            console.error(error);
            res.status(INTERNAL_SERVER_ERROR).json({ error: "Erreur serveur" });
        }
    };

    // Récupérer un élément par ID
    getOne = async (req, res) => {
        const { id } = req.params;

        try {
            const item = await this.model.findByPk(id);

            if (!item) {
                return res.status(StatusCodes.NOT_FOUND).json({ error: "Ressource introuvable" });
            }

            res.json(item);
        } catch (error) {
            console.error(error);
            res.status(INTERNAL_SERVER_ERROR).json({ error: "Erreur serveur" });
        }
    };
}