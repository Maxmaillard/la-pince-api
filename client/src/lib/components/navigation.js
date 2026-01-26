// client/src/lib/components/navigation.js

export function handleNavigation() {
    const navButtons = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const mainTitle = document.getElementById('main-title');
    const logoutBtn = document.querySelector('.btn-logout');

    // 1. GESTION DU ROUTAGE INTERNE (SPA)
    navButtons.forEach(button => {
        // On ignore le bouton logout pour le changement de section
        if (button.classList.contains('btn-logout')) return;

        button.addEventListener('click', () => {
            const text = button.innerText.trim();
            
            // UI : Titre et classe active
            if (mainTitle) mainTitle.textContent = text.toUpperCase();
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Affichage de la section
            sections.forEach(sec => sec.classList.add('hidden'));

            const sectionMap = {
                "Dashboard": "page-dashboard",
                "Profil": "page-profil",
                "groupes": "page-groupes",
                "Informations": "page-informations"
            };

            // On cherche si le texte du bouton correspond à une clé de notre map
            for (const [key, id] of Object.entries(sectionMap)) {
                if (text.includes(key)) {
                    const target = document.getElementById(id);
                    if (target) target.classList.remove('hidden');
                    break;
                }
            }
        });
    });

    // 2. GESTION DE LA DÉCONNEXION
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // On nettoie et on dégage
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        });
    }
}