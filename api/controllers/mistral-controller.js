import mistralService from '../utils/mistral-service.js';

/**
 * Controller pour gérer les échanges avec Mistral AI
 * 
 */
export const chatWithAI = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question || question.trim() === "") {
            return res.status(400).json({ error: "Le message ne peut pas être vide." });
        }

        const answer = await mistralService.askFinance(question);
        
        res.json({ 
            success: true, 
            answer: answer 
        });

    } catch (error) {
        console.error("Controller Error (Mistral):", error);
        res.status(500).json({ 
            success: false, 
            message: "Erreur lors de la communication avec l'IA." 
        });
    }
};