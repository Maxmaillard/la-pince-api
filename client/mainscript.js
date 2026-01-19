document.addEventListener('DOMContentLoaded', () => {
    const mainTitle = document.getElementById('main-title');
    const navButtons = document.querySelectorAll('.nav-item');
    
    // On cible la zone que l'on veut afficher/masquer
    const dashboardContent = document.querySelector('.dashboard-card');

    // Au chargement, on peut décider de le masquer si on n'est pas sur dashboard
    // dashboardContent.classList.add('hidden'); 

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const text = button.innerText.trim();
            
            // 1. Changer le titre
            mainTitle.textContent = text.toUpperCase();

            // 2. Gérer l'affichage de la carte Dashboard
            // On vérifie si le texte du bouton contient "Dashboard"
            if (text.includes("Dashboard")) {
                dashboardContent.classList.remove('hidden');
            } else {
                dashboardContent.classList.add('hidden');
            }

            // 3. Style du bouton actif
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});