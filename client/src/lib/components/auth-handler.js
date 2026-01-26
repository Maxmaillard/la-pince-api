/**
 * Handler dédié à l'authentification (Login / Register)
 */
import { authService } from '../services/auth.js';

document.addEventListener('DOMContentLoaded', () => {
    
    /* ============================================================
       1. GESTION DE LA CONNEXION (login.html)
       ============================================================ */
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            const res = await authService.login(email, password);
            
            if (res.token) {
                // Succès : le token est déjà stocké par authService.login
                window.location.href = 'main.html';
            } else {
                alert(res.error || "Identifiants incorrects");
            }
        });
    }

    /* ============================================================
       2. GESTION DE L'INSCRIPTION (register.html)
       ============================================================ */
    const registerForm = document.querySelector('#register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // On récupère le form
            const firstName = document.getElementById('first_name').value;
            const lastName = document.getElementById('last_name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const res = await authService.register(firstName, lastName, email, password);
            
            if (res.user) {
                alert("Compte créé avec succès ! Connecte-toi.");
                window.location.href = 'login.html';
            } else {
                alert(res.error || "Erreur lors de l'inscription");
            }
        });
    }
});