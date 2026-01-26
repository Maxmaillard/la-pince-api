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
}
//function update 

updateTransaction = async (req, res) => {
    try {
        // ID de la transaction
        const  id = req.params.id;
         // ID de l'utilisateur connecté
        const user_id = req.user.user_id;    
//recupere les donner envoyer par le front
      const amount = req.body.amount;
      const date = req.body.date;
      const description = req.body.description;
      const id_category = req.body.id_category;


        // Vérifier si la transaction existe et appartient à l'utilisateur
        const transaction = await Expense.findOne({
            where: {
                id_expense: id,
                id_user: user_id
            }
        });

        if (!transaction) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: "Transaction introuvable"
            });
        }

        // Mise à jour des champs (seulement ceux envoyés)
        if (amount !== undefined) transaction.amount = amount;
        if (date !== undefined) transaction.date = date;
        if (description !== undefined) transaction.description = description; 
        if (id_category !== undefined) transaction.id_category = id_category;
        await transaction.save();

        return res.status(StatusCodes.OK).json({
             message: "Transaction mise à jour avec succès", transaction
             });

    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Erreur lors de la mise à jour de la transaction"
        });
    }
}
//function pour supprimer une depense
deleteTransaction = async (req, res) => {
    try {
         // ID de la transaction
        const id = req.params.id;
        // ID de l'utilisateur connecté
        const user_id = req.user.user_id;

        // Vérifier si la transaction existe et appartient à l'utilisateur
        const transaction = await Expense.findOne({
            where: {
                id_expense: id,
                id_user: user_id
            }
        });

        if (!transaction) {
            return res.status(404).json({ error: "Transaction introuvable" });
        }

        // Suppression
        await transaction.destroy();

        return res.status(200).json({
            message: "Transaction supprimée avec succès"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erreur lors de la suppression de la transaction"
        });
    }
};





};

    

const transactionController = new TransactionController();
export default transactionController;
