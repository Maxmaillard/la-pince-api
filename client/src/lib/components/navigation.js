// client/src/lib/components/navigation.js

export function handleNavigation() {
    const navButtons = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const mainTitle = document.getElementById('main-title');
    const logoutBtn = document.querySelector('.btn-logout');
    
    // récupère le container vide qu'on a mis dans le HTML
    const adminContainer = document.getElementById('admin-nav-container');

    // 1. ROUTAGE SPA (Dashboard, Profil, etc.)
    navButtons.forEach(button => {
        if (button.classList.contains('btn-logout')) return;

        button.addEventListener('click', () => {
            const text = button.innerText.trim();
            
            // On update le titre de la page dynamiquement
            if (mainTitle) mainTitle.textContent = text.toUpperCase();
            
            // Gestion de la classe active sur les boutons
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // On cache toutes les sections avant d'afficher la bonne
            sections.forEach(sec => sec.classList.add('hidden'));

            const sectionMap = {
                "Dashboard": "page-dashboard",
                "Profil": "page-profil",
                "Conseils": "page-groupes",
                "Informations": "page-informations"
            };

            for (const [key, id] of Object.entries(sectionMap)) {
                if (text.includes(key)) {
                    const target = document.getElementById(id);
                    if (target) target.classList.remove('hidden');
                    break;
                }
            }
        });
    });

    // 2. LOGOUT
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // On clean le storage et on renvoie au login
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        });
    }

    // 3. SÉCURITÉ : AFFICHAGE DU BOUTON ADMIN
    // On récupère le token pour voir qui est connecté
    const token = localStorage.getItem('token');
    
    if (token && adminContainer) {
        try {
            // décode le payload du JWT (le milieu du token) pour chopper le rôle
            const payload = JSON.parse(atob(token.split('.')[1]));

            // Si admin dans le token, on lui injecte son bouton
            if (payload.role === 'admin') {
                adminContainer.innerHTML = `
                    <button class="nav-item admin-link" onclick="window.location.href='admin.html'">
                        <i class="fa-solid fa-user-shield"></i> Administration
                    </button>
                `;
            }
        } catch (error) {
            // Si le token est corrompu ou mal formaté, on log l'erreur discrètement
            console.error("Erreur lors du check admin :", error);
        }
    }
}