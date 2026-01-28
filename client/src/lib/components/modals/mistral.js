/**
 * Fonction pour envoyer une question financière à l'IA
 * Intègre le rendu Markdown pour une réponse structurée.
 */
export async function handleAIChat() {
    const inputField = document.querySelector('#ai-question-input');
    const chatDisplay = document.querySelector('#chat-window');
    const question = inputField.value.trim();

    if (!question) return;

    // 1. UI: Afficher la question de l'utilisateur
    chatDisplay.innerHTML += `
        <div class="user-bubble" style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 15px; margin-bottom: 15px; text-align: right; border-bottom-right-radius: 2px;">
            <strong style="display: block; font-size: 0.8em; opacity: 0.7;">Vous</strong>
            <span>${question}</span>
        </div>`;
    
    inputField.value = ''; 
    
    // 2. Affichage du loader (état "en attente")
    const loaderId = 'loader-' + Date.now();
    chatDisplay.innerHTML += `
        <div id="${loaderId}" class="ai-bubble" style="color: #4BC0C0; margin-bottom: 15px; padding: 12px; background: rgba(75, 192, 192, 0.1); border-radius: 15px; border-bottom-left-radius: 2px;">
            <em>La pince réfléchit...</em>
        </div>`;

    // Scroll automatique vers le bas
    chatDisplay.scrollTop = chatDisplay.scrollHeight;

    try {
        const API_URL = 'http://localhost:3000/api/chat/ask'; 

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ question })
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        const loader = document.getElementById(loaderId);

        if (data.success && loader) {
            // === CONVERSION MARKDOWN EN HTML ===
            // On utilise marked.parse() pour transformer le texte brut en HTML structuré
            const htmlAnswer = marked.parse(data.answer);

            loader.innerHTML = `
                <strong style="display: block; font-size: 0.8em; opacity: 0.7; color: #4BC0C0; margin-bottom: 5px;">La Pince</strong>
                <div class="ai-rendered-content">${htmlAnswer}</div>
            `; 
        } else if (loader) {
            loader.innerHTML = "⚠️ " + (data.message || "Erreur lors de la génération de la réponse.");
        }
    } catch (err) {
        console.error("Fetch error:", err);
        const loader = document.getElementById(loaderId);
        if (loader) loader.innerHTML = "❌ Erreur : Impossible de joindre le serveur API (Vérifiez le port 3000).";
    }

    // Scroll auto final une fois le texte injecté
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}