import { authService } from '../services/auth.js';

export function initProfileHandler() {
    const deleteBtn = document.getElementById('btn-delete-account');

    if (deleteBtn) {
        deleteBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            const confirmFirst = confirm("Supprimer définitivement votre compte ?");
            if (!confirmFirst) return;

            try {
                const response = await authService.deleteAccount();
                
                if (response.error) {
                    alert("Erreur : " + response.error);
                } else {
                    alert("Compte supprimé.");
                    localStorage.removeItem('token');
                    window.location.href = 'register.html';
                }
            } catch (err) {
                console.error(err);
                alert("Une erreur technique est survenue.");
            }
        });
    }
}

export async function loadUserData() {
    try {
        const user = await authService.getMe();

        if (user && !user.error) {
            // Sélection des éléments
            const lastNameElem = document.getElementById('profile-last-name');
            const firstNameElem = document.getElementById('profile-first-name');
            const emailElem = document.getElementById('profile-email');
            const mainTitle = document.getElementById('main-title');

            // Injection des données
            if (lastNameElem) lastNameElem.textContent = user.last_name;
            if (firstNameElem) firstNameElem.textContent = user.first_name;
            if (emailElem) emailElem.textContent = user.email;

            // Mise à jour du titre du Dashboard (Optionnel)
            if (mainTitle && user.first_name) {
                mainTitle.textContent = `BONJOUR ${user.first_name.toUpperCase()}`;
            }
        }
    } catch (err) {
        console.error("Erreur lors du chargement des données profil:", err);
    }
}