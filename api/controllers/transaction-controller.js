import { Expense, Category} from "../models/index.js";
import { StatusCodes } from "http-status-codes";

class TransactionController {

    // function qui récupère le tableau de bord de l'utilisateur connecté
getDashboard = async (req, res) => {
    // On récupère l'ID de l'utilisateur depuis le token
    const { user_id } = req.user;

    try {
        // On récupère toutes les dépenses de cet utilisateur 
        // On inclut la catégorie associée (name + color)
        

        const expenses = await Expense.findAll({
            where: { id_user: user_id },
            include: {
                model: Category,
                as: "category",                 
                attributes: ["name", "color"]
            },
            //trier par date décroissante (les plus récentes en premier)
            
            order: [["date", "DESC"]]
        });
//  calcule le total dépensé en additionnant chaque montant
        const totalSpent = expenses.reduce( (sum, e) => sum + parseFloat(e.amount), 0 );

        return res.status(StatusCodes.OK).json({
            //  renvoie le total + l'historique complet
            total_spent: totalSpent,
            history: expenses
        });

    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Erreur lors de la récupération du dashboard"
        });
    }
};

    
    };

    

const transactionController = new TransactionController();
export default transactionController;
