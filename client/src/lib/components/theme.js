 export function initTheme() {
    const darkModeToggle = document.getElementById('dark-mode');
 
 // Vérification de la préférence enregistrée au chargement
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        if(darkModeToggle) darkModeToggle.checked = true;
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark'); // Sauvegarde du choix
            } else {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }
 }