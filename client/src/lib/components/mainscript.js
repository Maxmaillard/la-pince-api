/**
 * Script de gestion de l'application "La Pince"
 * Gère la navigation, le Dark Mode, les transactions et le graphique dynamique.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ============================================================
       1. SÉLECTION DES ÉLÉMENTS DU DOM
       ============================================================ */
    const mainTitle = document.getElementById('main-title');
    const navButtons = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const darkModeToggle = document.getElementById('dark-mode');
    
    // Éléments liés aux transactions
    const addBtn = document.querySelector('.add-transaction');
    const modal = document.getElementById('modal-transaction');
    const closeBtn = document.getElementById('close-modal');
    const transactionForm = document.getElementById('transaction-form');
    const transactionsContainer = document.querySelector('.transactions-container');

    // Variables d'état pour la modification (Editing)
    let editingRow = null; 
    const modalTitle = document.querySelector('.modal-header h2');
    const submitBtn = document.getElementById('btn-submit-modal');

    /* ============================================================
       2. SYSTÈME DE NAVIGATION (SPA Style)
       ============================================================ */
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

    /* ============================================================
       3. GESTION DU THÈME (DARK MODE) & LOCALSTORAGE
       ============================================================ */
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

    /* ============================================================
       4. CONFIGURATION DU GRAPHIQUE (CHART.JS)
       ============================================================ */
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'doughnut', // Graphique de type "Donut"
        data: {
            labels: ['DIVERS', 'LOYER', 'ALIMENTATION', 'LOISIRS', 'EPARGNE'],
            datasets: [{
                label: 'Dépenses',
                data: [0, 0, 0, 0, 0], // Valeurs initiales à zéro
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                borderWidth: 0,
                hoverOffset: 20
            }]
        },
        options: {
            responsive: true,
            layout: { padding: 30 },
            plugins: { legend: { display: false } } // Légende masquée pour le style
        }
    });

    /**
     * Met à jour les données du graphique dynamiquement
     * @param {string} category - La catégorie concernée
     * @param {number} value - La valeur absolue à ajouter/retirer
     * @param {number} originalAmount - Le montant réel (pour vérifier le signe)
     */
    function updateChartData(category, value, originalAmount) {
        // Le graphique ne traite que les dépenses (montants négatifs)
        if (originalAmount < 0) {
            const catIndex = myChart.data.labels.indexOf(category.toUpperCase());
            if (catIndex !== -1) {
                myChart.data.datasets[0].data[catIndex] += value;
                // Sécurité pour ne pas avoir de données négatives sur le donut
                if (myChart.data.datasets[0].data[catIndex] < 0) myChart.data.datasets[0].data[catIndex] = 0;
                myChart.update(); // Rafraîchit l'affichage du graphique
            }
        }
    }

    /* ============================================================
       5. GESTION DE LA MODALE (AJOUT / MODIFICATION)
       ============================================================ */
    // Ouverture pour un nouvel ajout
    addBtn.addEventListener('click', () => {
        editingRow = null; // Reset du mode édition
        if(modalTitle) modalTitle.innerText = "Nouvelle Transaction"; 
        if(submitBtn) submitBtn.innerText = "Ajouter";
        transactionForm.reset();
        modal.classList.add('active');
    });

    // Fermetures de la modale
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    window.addEventListener('click', (e) => { 
        if (e.target === modal) modal.classList.remove('active'); 
    });

    /* ============================================================
       6. LOGIQUE DE SOUMISSION DU FORMULAIRE
       ============================================================ */
    transactionForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        const name = document.getElementById('t-name').value;
        const amount = parseFloat(document.getElementById('t-amount').value);
        const category = document.getElementById('t-category').value;

        const typeClass = amount >= 0 ? 'pos' : 'neg';
        const formattedAmount = amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });

        // A. CAS DE LA MODIFICATION
        if (editingRow) {
            const amountSpan = editingRow.querySelector('.amount');
            const oldVal = parseFloat(amountSpan.dataset.val);
            const oldCat = amountSpan.dataset.cat;
            const wasNegative = amountSpan.classList.contains('neg');
            const sign = wasNegative ? -1 : 1;

            // Retirer l'ancienne valeur du graphique (si c'était une dépense)
            updateChartData(oldCat, -oldVal, sign);

            // Mise à jour visuelle du texte et des attributs data
            editingRow.querySelector('.label').innerText = name;
            amountSpan.innerText = formattedAmount;
            amountSpan.className = `amount ${typeClass}`;
            amountSpan.dataset.val = Math.abs(amount);
            amountSpan.dataset.cat = category.toUpperCase();

            // Ajouter la nouvelle valeur au graphique (si c'est une dépense)
            updateChartData(category, Math.abs(amount), amount);

        } else {
            // B. CAS DE L'AJOUT SIMPLE
            const newTransaction = document.createElement('div');
            newTransaction.classList.add('transaction-item');
            
            newTransaction.innerHTML = `
                <span class="label">${name}</span> 
                <div class="actions">
                    <span class="amount ${typeClass}" 
                        data-val="${Math.abs(amount)}" 
                        data-cat="${category.toUpperCase()}">${formattedAmount}</span>
                    <div class="icon-group">
                        <i class="fa-solid fa-pen-to-square edit-icon"></i>
                        <i class="fa-solid fa-trash delete-icon"></i>
                    </div>
                </div>
            `;

            transactionsContainer.prepend(newTransaction); // Ajoute en haut de liste
            updateChartData(category, Math.abs(amount), amount);
        }

        modal.classList.remove('active');
        transactionForm.reset();
    });

    /* ============================================================
       7. ÉCOUTEUR DÉLÉGUÉ (CLICS SUR LES LIGNES DE TRANSACTION)
       ============================================================ */
    transactionsContainer.addEventListener('click', (e) => {
        
        // --- Action : MODIFICATION (Pré-remplissage du formulaire) ---
        if (e.target.classList.contains('edit-icon')) {
            editingRow = e.target.closest('.transaction-item');
            const amountSpan = editingRow.querySelector('.amount');

            const isNeg = amountSpan.classList.contains('neg');
            const rawVal = parseFloat(amountSpan.dataset.val);
            
            document.getElementById('t-name').value = editingRow.querySelector('.label').innerText;
            document.getElementById('t-amount').value = isNeg ? -rawVal : rawVal;
            document.getElementById('t-category').value = amountSpan.dataset.cat;

            // Mise à jour de l'UI de la modale
            if(modalTitle) modalTitle.innerText = "Modifier la transaction";
            if(submitBtn) submitBtn.innerText = "Enregistrer";
            modal.classList.add('active');
        }

        // --- Action : SUPPRESSION ---
        if (e.target.classList.contains('delete-icon')) {
            const row = e.target.closest('.transaction-item');
            const amountSpan = row.querySelector('.amount');

            const valToRemove = parseFloat(amountSpan.dataset.val);
            const catToRemove = amountSpan.dataset.cat;
            const wasNeg = amountSpan.classList.contains('neg');
            const sign = wasNeg ? -1 : 1;

            // Retrait de la dépense du graphique
            updateChartData(catToRemove, -valToRemove, sign);

            // Animation de sortie avant suppression réelle du DOM
            row.classList.add('removing');
            setTimeout(() => {
                row.remove();
            }, 400); // Délai correspondant à la transition CSS
        }
    });

    /* ============================================================
       8. RESPONSIVE & MENU MOBILE
       ============================================================ */
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    } 

    // Fermeture automatique de la sidebar après un clic menu sur mobile
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
            }
        });
    });
});