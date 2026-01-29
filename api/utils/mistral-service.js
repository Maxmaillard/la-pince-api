import { Mistral } from '@mistralai/mistralai';

class MistralService {
    constructor() {
        // Vérifier la clé API
        if (!process.env.MISTRAL_API_KEY) {
            console.error("❌ MISTRAL_API_KEY manquante dans le .env");
        }
        this.client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
    }

    async askFinance(question) {
        try {
            const response = await this.client.chat.complete({
                model: "mistral-small-latest",
                messages: [
                    { 
                        role: "system", 
                        content: "Tu es un expert en finance pour l'app 'La Pince'. Réponds de manière concise." 
                    },
                    { role: "user", content: question }
                ]
            });
            return response.choices[0].message.content;
        } catch (error) {
            console.error("Mistral Service Error:", error);
            throw error;
        }
    }
}


export default new MistralService();