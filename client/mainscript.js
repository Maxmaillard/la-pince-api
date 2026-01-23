document.addEventListener('DOMContentLoaded', () => {
    // --- SÉLECTION DES ÉLÉMENTS ---
    const mainTitle = document.getElementById('main-title');
    const navButtons = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const darkModeToggle = document.getElementById('dark-mode');
    const addBtn = document.querySelector('.add-transaction');
    const modal = document.getElementById('modal-transaction');
    const closeBtn = document.getElementById('close-modal');
    const transactionForm = document.getElementById('transaction-form');
    const transactionsContainer = document.querySelector('.transactions-container');

    //Variables pour la gestion de la modification
    let editingRow = null; 
    const modalTitle = document.querySelector('.modal-header h2');
    const submitBtn = document.getElementById('btn-submit-modal');

    // --- NAVIGATION ---
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const text = button.innerText.trim();
            mainTitle.textContent = text.toUpperCase();
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            sections.forEach(sec => sec.classList.add('hidden'));

            if (text.includes("Dashboard")) document.getElementById('page-dashboard').classList.remove('hidden');
            else if (text.includes("Profil")) document.getElementById('page-profil').classList.remove('hidden');
            else if (text.includes("groupes")) document.getElementById('page-groupes').classList.remove('hidden');
            else if (text.includes("Informations")) document.getElementById('page-informations').classList.remove('hidden');
        });
    });

    // --- GESTION DARK MODE ---
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        if(darkModeToggle) darkModeToggle.checked = true;
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- LE GRAPHIQUE DONUT ---
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['DIVERS', 'LOYER', 'ALIMENTATION', 'LOISIRS', 'EPARGNE'],
            datasets: [{
                label: 'Dépenses',
                data: [0, 0, 0, 0, 0],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                borderWidth: 0,
                hoverOffset: 20
            }]
        },
        options: {
            responsive: true,
            layout: { padding: 30 },
            plugins: { legend: { display: false } }
        }
    });

    //Fonction d'aide pour mettre à jour le graphique (uniquement pour les négatifs)
    function updateChartData(category, value, originalAmount) {
        if (originalAmount < 0) {
            const catIndex = myChart.data.labels.indexOf(category.toUpperCase());
            if (catIndex !== -1) {
                myChart.data.datasets[0].data[catIndex] += value;
                if (myChart.data.datasets[0].data[catIndex] < 0) myChart.data.datasets[0].data[catIndex] = 0;
                myChart.update();
            }
        }
    }

    // --- GESTION MODALE ---
    //Reset du mode ajout lors du clic sur le bouton "+"
    addBtn.addEventListener('click', () => {
        editingRow = null;
        //On remet le titre par défaut pour un ajout
        if(modalTitle) modalTitle.innerText = "Nouvelle Transaction"; 
        if(submitBtn) submitBtn.innerText = "Ajouter";
        transactionForm.reset();
        modal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    window.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

    // --- AJOUT & MODIFICATION TRANSACTION ---
    transactionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('t-name').value;
        const amount = parseFloat(document.getElementById('t-amount').value);
        const category = document.getElementById('t-category').value;

        const typeClass = amount >= 0 ? 'pos' : 'neg';
        const formattedAmount = amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });

        //Logique de MODIFICATION
        if (editingRow) {
            const amountSpan = editingRow.querySelector('.amount');
            const oldVal = parseFloat(amountSpan.dataset.val);
            const oldCat = amountSpan.dataset.cat;
            //On récupère le signe original pour savoir si c'était une dépense
            const wasNegative = amountSpan.classList.contains('neg');
            const sign = wasNegative ? -1 : 1;

            // Retirer l'ancienne valeur du graphique si c'était une dépense
            updateChartData(oldCat, -oldVal, sign);

            // Mise à jour visuelle de la ligne existante
            editingRow.querySelector('.label').innerText = name;
            amountSpan.innerText = formattedAmount;
            amountSpan.className = `amount ${typeClass}`;
            amountSpan.dataset.val = Math.abs(amount);
            amountSpan.dataset.cat = category.toUpperCase();

            // Ajouter la nouvelle valeur si c'est une dépense
            updateChartData(category, Math.abs(amount), amount);

        } else {
            // --- LOGIQUE D'AJOUT ---
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

            transactionsContainer.prepend(newTransaction);
            //Mise à jour graphique uniquement si négatif
            updateChartData(category, Math.abs(amount), amount);
        }

        modal.classList.remove('active');
        transactionForm.reset();
    });

    // --- CLICS SUR LA LISTE (SUPPRESSION & MODIFICATION) ---
    transactionsContainer.addEventListener('click', (e) => {
        
        //Logique de MODIFICATION (Ouverture modale)
        if (e.target.classList.contains('edit-icon')) {
            editingRow = e.target.closest('.transaction-item');
            const amountSpan = editingRow.querySelector('.amount');

            //Correction Bug Zéros - On utilise data-val et on remet le signe
            const isNeg = amountSpan.classList.contains('neg');
            const rawVal = parseFloat(amountSpan.dataset.val);
            
            document.getElementById('t-name').value = editingRow.querySelector('.label').innerText;
            document.getElementById('t-amount').value = isNeg ? -rawVal : rawVal;
            document.getElementById('t-category').value = amountSpan.dataset.cat;

            //On change le titre de la modale pour la modification
            if(modalTitle) modalTitle.innerText = "Modifier la transaction";
            if(submitBtn) submitBtn.innerText = "Enregistrer";
            modal.classList.add('active');
        }

        // --- SUPPRESSION TRANSACTION ---
        if (e.target.classList.contains('delete-icon')) {
            const row = e.target.closest('.transaction-item');
            const amountSpan = row.querySelector('.amount');

            const valToRemove = parseFloat(amountSpan.dataset.val);
            const catToRemove = amountSpan.dataset.cat;
            //On vérifie si c'était négatif pour le graphique
            const wasNeg = amountSpan.classList.contains('neg');
            const sign = wasNeg ? -1 : 1;

            //Mise à jour du graphique si c'était une dépense
            updateChartData(catToRemove, -valToRemove, sign);

            // TRANSITION DOUCE
            row.classList.add('removing');
            setTimeout(() => {
                row.remove();
            }, 400);
        }
    });
});

// Bouton sidebar pour Mobile
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {sidebar.classList.toggle('active')});
} 

// Fermer la sidebar quand on clique sur un menu sur mobile
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
        }
    });
});