// client/src/lib/components/navigation.js
export function handleNavigation() {

    const navButtons = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const mainTitle = document.getElementById('main-title');

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const text = button.innerText.trim();
                
                // Mise à jour du titre de la barre supérieure
                mainTitle.textContent = text.toUpperCase();
                
                // Gestion visuelle des boutons (classe active)
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Masquage de toutes les sections avant d'afficher la bonne
                sections.forEach(sec => sec.classList.add('hidden'));
    
                // Routage interne simple
                if (text.includes("Dashboard")) document.getElementById('page-dashboard').classList.remove('hidden');
                else if (text.includes("Profil")) document.getElementById('page-profil').classList.remove('hidden');
                else if (text.includes("groupes")) document.getElementById('page-groupes').classList.remove('hidden');
                else if (text.includes("Informations")) document.getElementById('page-informations').classList.remove('hidden');
            });
        });
    }