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
}
// CREATE NEW TRANSACTION
 createTransaction = async (req, res) => {
    try {
        // On récupère l'utilisateur connecté (grâce au middleware authenticate)
        const { user_id } = req.user;

 const amount = req.body.amount;  // Montant de la transaction
const date = req.body.date;       // Date de la transaction
const description = req.body.description;  // Description optionnelle
const id_category = req.body.id_category;   // Catégorie associée

        // Vérification simple : tous les champs doivent être présents
        if (!amount || !date || !id_category) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "Les champs amount, date et id_category sont obligatoires"
            });
        }

        // Création de la transaction
        const newTransaction = await Expense.create({
            amount,
            date,
            description: description || null, 
            id_user: user_id,
            id_category
        });

        return res.status(StatusCodes.CREATED).json({
            message: "Transaction créée avec succès",
            transaction: newTransaction
        });

    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Erreur lors de la création de la transaction"
        });
    }
}
//function qui récupere une transaction exact grace a son id
getTransactionById = async (req, res) => {
    try {
        // On cherche dans la base une transaction qui correspond 
        
        const id = req.params.id;      // ID de la transaction
        const user_id = req.user.user_id; // ID de l'utilisateur connecté
        const transaction = await Expense.findOne({
            where: {
                id_expense: id,
                id_user: user_id
            },
            include: {
                model: Category,
                as: "category",
                attributes: ["name", "color"]
            }
        });
// Si aucune transaction n'a été trouvée (id inexistant ou transaction d'un autre utilisateur)


        if (!transaction) {
            return res.status(404).json({ error: "Transaction introuvable" });
        }

        return res.status(200).json(transaction);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur serveur" });
    }
};



};

    

const transactionController = new TransactionController();
export default transactionController;
