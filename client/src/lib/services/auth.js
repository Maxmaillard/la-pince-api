const API_URL = 'http://localhost:3000/api';

export const authService = {
    // INSCRIPTION
    async register(firstName, lastName, email, password) {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                first_name: firstName, 
                last_name: lastName, 
                email, 
                password 
            })
        });
        return response.json();
    },

    // CONNEXION
    async login(email, password) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok && data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    },

    // INFOS UTILISATEUR
    async getMe() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    },

    // SUPPRESSION COMPTE
    // client/src/lib/services/auth.js

// client/src/lib/services/auth.js

// client/src/lib/services/auth.js

async deleteAccount() {
    try {
        const user = await authService.getMe(); 
        const userId = user.id_user; 

        if (!userId) throw new Error("ID utilisateur introuvable.");

        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || "Erreur lors de la suppression");
        }

        //On vérifie si la réponse a du contenu avant de parser
        if (response.status === 204 || response.headers.get("content-length") === "0") {
            return { success: true };
        }

        return await response.json().catch(() => ({ success: true }));

    } catch (err) {
        console.error("Erreur dans deleteAccount:", err.message);
        return { error: err.message };
    }
},

    // DASHBOARD
    async getDashboard() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/dashboard`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    },
    // NEW PASSWORD
   async updatePassword(newPassword) {
    try {
        const user = await authService.getMe();
        const userId = user.id_user; // On utilise l'id récupéré
        const token = localStorage.getItem('token');

        // On tape sur la route que l'on vient de créer : /api/users/:id
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ password: newPassword })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || "Échec de la mise à jour");
        }

        return await response.json();
    } catch (err) {
        return { error: err.message };
    }
}
};


