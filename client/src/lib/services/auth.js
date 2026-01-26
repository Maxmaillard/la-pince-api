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

    // DASHBOARD
    async getDashboard() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/dashboard`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    }
};