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

//selection du checkbox (ton input id="dark-mode")
const darkModeToggle = document.getElementById('dark-mode');

//Verif si user click sur le switch
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        document.body.classList.add('dark-theme');
        console.log("Mode sombre activé");
    } else {
        document.body.classList.remove('dark-theme');
        console.log("Mode sombre désactivé");
    }
});

// verif si darkmode est on/off
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    darkModeToggle.checked = true;
}

// stockage de l'info dans le localStorage
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    }
});


const ctx = document.getElementById('myChart');

const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['DIVERS', 'LOYER', 'ALIMENTATION', 'LOISIRS', 'EPARGNE'],
        datasets: [{
            label: 'Dépenses',
            data: [10, 10, 10, 10, 10],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF'
            ],
            borderWidth: 0,
            hoverOffset: 10
        }]
    },
    options: {
        responsive: true,
        layout: {
            padding: 20
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

// Interaction bouton ajouter transaction 
const addBtn = document.querySelector('.add-transaction');
const modal = document.getElementById('modal-transaction');
const closeBtn = document.getElementById('close-modal');

addBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

const transactionForm = document.getElementById('transaction-form');
const transactionsContainer = document.querySelector('.transactions-container');

transactionForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    //Récupération des valeurs
    const name = document.getElementById('t-name').value;
    const amount = parseFloat(document.getElementById('t-amount').value);
    
    //Déterminer si c'est positif ou négatif pour le style
    const typeClass = amount >= 0 ? 'pos' : 'neg';
    const formattedAmount = amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });

    //Création du HTML de la nouvelle ligne
    const newTransaction = document.createElement('div');
    newTransaction.classList.add('transaction-item');
    
    newTransaction.innerHTML = `
        <span class="label">${name}</span> 
        <div class="actions">
            <span class="amount ${typeClass}">${formattedAmount}</span>
            <div class="icon-group">
                <i class="fa-solid fa-pen-to-square edit-icon"></i>
                <i class="fa-solid fa-trash delete-icon"></i>
            </div>
        </div>
    `;

    //Ajouter au début de la liste (prepend)
    transactionsContainer.prepend(newTransaction);

    //Fermer la modale et vider le formulaire
    modal.classList.remove('active');
    transactionForm.reset();
});

    // SUPPRESSION TRANSACTION
    if (transactionsContainer) {
        transactionsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-icon')) {
                const row = e.target.closest('.transaction-item');
                row.style.opacity = '0';
                row.style.transform = 'translateX(20px)';
                setTimeout(() => row.remove(), 300);
            }
        });
    }
});