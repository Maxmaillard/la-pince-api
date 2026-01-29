const API_URL = 'http://localhost:3000/api';

export const transactionService = {
    // Récupérer toutes les transactions de l'utilisateur
    async getAll() {
        const token = localStorage.getItem('token');

        const res = await fetch(`${API_URL}/transactions`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return res.json();
    },

    // Créer une nouvelle transaction
    async create(data) {
        const token = localStorage.getItem('token');

        const res = await fetch(`${API_URL}/transactions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        return res.json();
    },

    // Modifier une transaction
    async update(id, data) {
        const token = localStorage.getItem('token');

        const res = await fetch(`${API_URL}/transactions/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        return res.json();
    },

    // Supprimer une transaction
    async delete(id) {
        const token = localStorage.getItem('token');

        const res = await fetch(`${API_URL}/transactions/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (res.status === 204) { return { success: true }; }

        return res.json();
    }
};
