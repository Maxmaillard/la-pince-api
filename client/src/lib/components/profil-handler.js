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

export function initPasswordUpdate() {
    const passwordForm = document.querySelector('.form-password');

    if (passwordForm) {
        passwordForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Récupération des champs via name (plus robuste que les classes ici)
            const formData = new FormData(passwordForm);
            const newPass = formData.get('new_password');
            const confirmPass = formData.get('confirm_password');

            // 1. Validation côté client
            if (newPass !== confirmPass) {
                alert("Les mots de passe ne correspondent pas !");
                return;
            }

            if (newPass.length < 6) {
                alert("Le mot de passe doit faire au moins 6 caractères.");
                return;
            }

            try {
                const result = await authService.updatePassword(newPass);
                
                if (result.error) {
                    alert("Erreur : " + result.error);
                } else {
                    alert("Mot de passe mis à jour avec succès !");
                    passwordForm.reset(); // On vide le formulaire
                }
            } catch (err) {
                console.error(err);
                alert("Une erreur technique est survenue.");
            }
        });
    }
}