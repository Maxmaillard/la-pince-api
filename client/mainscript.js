document.addEventListener('DOMContentLoaded', () => {
    //SÉLECTION DES ÉLÉMENTS
    const mainTitle = document.getElementById('main-title');
    const navButtons = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    //FONCTION DE NAVIGATION
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            //nettoyage du texte du bouton (on enlève les espaces et on récupère le texte sans l'icône)
            const text = button.innerText.trim();
            
            //mise à jour du titre principal
            mainTitle.textContent = text.toUpperCase();

            //gestion de l'état "actif" sur les boutons de la sidebar
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            //LOGIQUE D'AFFICHAGE DES PAGES
            //on cache toutes les sections d'abord
            sections.forEach(sec => sec.classList.add('hidden'));

            //on affiche la section correspondante selon le texte contenu dans le bouton
            if (text.includes("Dashboard")) {
                document.getElementById('page-dashboard').classList.remove('hidden');
            } 
            else if (text.includes("Profil")) {
                document.getElementById('page-profil').classList.remove('hidden');
            } 
            else if (text.includes("groupes")) {
                document.getElementById('page-groupes').classList.remove('hidden');
            }
            else if (text.includes("Informations")) {
                document.getElementById('page-informations').classList.remove('hidden');
            }
        });
    });

    // SUPPRESSION TRANSACTION (wip)
//     const transactionsContainer = document.querySelector('.transactions-container');
    
//     if (transactionsContainer) {
//         transactionsContainer.addEventListener('click', (e) => {
//             if (e.target.classList.contains('delete-icon')) {
//                 const row = e.target.closest('.transaction-item');
//                 row.style.opacity = '0';
//                 row.style.transform = 'translateX(20px)';
//                 setTimeout(() => row.remove(), 300);
//             }
//         });
//     }
});