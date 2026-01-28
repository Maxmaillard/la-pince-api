/**
 * Script de gestion de l'application "La Pince"
 * Gère la navigation, le Dark Mode, les transactions et le graphique dynamique.
 */


// import dans l'orde de : fonctionnalitées de navigation de la spa, darkmode, check permettant de rediriger vers la page de connexion si non connecté 
import { transactionService } from '../services/transactions.js';
import { handleNavigation } from './navigation.js';
import { initTheme } from './theme.js';
import { checkAccess } from '../utils/guard.js';
import { initPasswordUpdate, initProfileHandler, loadUserData } from './profil-handler.js';

checkAccess();
document.addEventListener('DOMContentLoaded', () => {
    // 🔥 Mapping ID → Nom de catégorie 
    const CATEGORY_MAP = {
        1: "DIVERS",
        2: "LOYER", 
        3: "ALIMENTATION", 
        4: "LOISIRS",
        5: "EPARGNE" 
        };
    

    /* ============================================================
       1. SÉLECTION DES ÉLÉMENTS DU DOM
       ============================================================ */
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

        handleNavigation()

    /* ============================================================
       3. GESTION DU THÈME (DARK MODE) & LOCALSTORAGE
       ============================================================ */
   
        initTheme()

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
    // 🔥 CHARGEMENT DES TRANSACTIONS AU DÉMARRAGE
async function loadTransactions() {
    const data = await transactionService.getAll();

    data.forEach(exp => {
        const typeClass = exp.amount >= 0 ? 'pos' : 'neg';
        const formattedAmount = exp.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });

        const row = document.createElement('div');
        row.classList.add('transaction-item');
        row.dataset.id = exp.id_expense;

        row.innerHTML = `
            <span class="label">${exp.description}</span>
            <div class="actions">
                <span class="amount ${typeClass}"
                    data-val="${Math.abs(exp.amount)}"
                    data-cat="${exp.id_category}">
                    ${formattedAmount}
                </span>
                <div class="icon-group">
                    <i class="fa-solid fa-pen-to-square edit-icon"></i>
                    <i class="fa-solid fa-trash delete-icon"></i>
                </div>
            </div>
        `;

        transactionsContainer.appendChild(row);
    });
}

loadTransactions();


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
    transactionForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        const name = document.getElementById('t-name').value;
        const amount = parseFloat(document.getElementById('t-amount').value);
        const category = document.getElementById('t-category').value;
        const date = document.getElementById('t-date').value;


        const typeClass = amount >= 0 ? 'pos' : 'neg';
        const formattedAmount = amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
// A. CAS DE LA MODIFICATION
if (editingRow) {
    const amountSpan = editingRow.querySelector('.amount');
    const oldVal = parseFloat(amountSpan.dataset.val);
    const oldCat = amountSpan.dataset.cat;
    const wasNegative = amountSpan.classList.contains('neg');
    const sign = wasNegative ? -1 : 1;

    // Retirer l'ancienne valeur du graphique
    updateChartData(oldCat, -oldVal, sign);

    // Mise à jour DOM
    editingRow.querySelector('.label').innerText = name;
    amountSpan.innerText = formattedAmount;
    amountSpan.className = `amount ${typeClass}`;
    amountSpan.dataset.val = Math.abs(amount);
    amountSpan.dataset.cat = category.toUpperCase();

    // Ajouter la nouvelle valeur au graphique
    updateChartData(category, Math.abs(amount), amount);

} else {

    // B. CAS DE L'AJOUT AVEC API
 const created = await transactionService.create({
    description: name,
    amount: amount,
    date: date,              
    id_category: parseInt(category)
   
});
console.log("Réponse API :", created);

    if (created.error) {
        alert("Erreur : " + created.error);
        return;
    }

    // Ajout DOM
    const newTransaction = document.createElement('div');
    newTransaction.classList.add('transaction-item');
   newTransaction.dataset.id = created.transaction.id_expense;



    newTransaction.innerHTML = `
    <span class="label">${created.transaction.description}</span> 
    <div class="actions">
        <span class="amount ${typeClass}" 
            data-val="${Math.abs(created.transaction.amount)}"
            data-cat="${created.transaction.id_category}">
            ${created.transaction.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
        </span>
        <div class="icon-group">
            <i class="fa-solid fa-pen-to-square edit-icon"></i>
            <i class="fa-solid fa-trash delete-icon"></i>
        </div>
    </div>
`;


    transactionsContainer.prepend(newTransaction);

  updateChartData(
    CATEGORY_MAP[created.transaction.id_category],
    Math.abs(created.transaction.amount),
    created.transaction.amount
);



} 


// Fermeture modale + reset
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

   /* ============================================================
       9. PARAMETRE PROFIL
       ============================================================ */ 
       initProfileHandler();
       loadUserData();
       initPasswordUpdate();
});

