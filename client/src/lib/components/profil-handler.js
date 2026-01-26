// client/src/lib/components/profile-handler.js
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