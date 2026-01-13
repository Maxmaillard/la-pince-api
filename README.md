# Projet LaPince

LaPince est une Web-application de gestion de finances personnelles. ( comme Revolut, Emma-app,  bunq,  bankin’, N26, Linxo, Wise ) qui servira à suivre en temps réel nos dépenses, à planifier nos futures dépenses et à mettre des limites à celles-ci, la possibilité d’ajouter des gens à un groupe de gestion de finance.

## La cible de l'appli

- Jeunes Adultes.
- Famille.
- Étudiants.
- Tavailleurs independants .

### Langues

- Français
- Anglais

### Modéle et Comptabilités

- Modèle Eco : 100% Gratuit.
- Compatibilités : Mobile First, adaptation aux navigateurs les plus utilisés.

### L'arborescence de l'application

- Page d’accueil (presentation de l’app, possibilité de s’inscrire ou de se connecter, mise en avant de l’app) connexion/inscription.
- Page principale.

## 🛠️ Technologies utilisées

### Generales

- **GIT et Github**( pour le versionning et le travail de groupe).
- **VScode** (editeur de code)
  
### Frontend

- **Html**
- **CSS**
- **JS**
- **Svelte**
  
### Backend

- **Node.js**
- **Express**
- **Sequelize** (ORM)
- **PostgreSQL**
- **Joi** (validation des données)
- **dotenv** (gestion des variables d'environnement)
- **API:Rest**(faire appel a un api)

### API

- [Conversion automatique de devise](https://www.exchangerate-api.com/) (exchangerate-api)


## User Stories
___
|  En tant que ... | Je veux ... | Afin de ...| Priorité |
|---    |:-:    |:-:    |:-: |
|Visiteur|m'inscrire| créer un compte personnel et accéder aux services de l'application | MVP
|Visiteur|me connecter|accéder à mon espace sécurisé et retrouver mes données sauvegardées| MVP
|Visiteur|Voir la page d'accueil|comprendre la valeur ajoutée de l'outil et ses fonctionnalités principales| MVP
|Utilisateur|Consulter l'historique de mes dépenses|suivre l'évolution de mon budget et visualiser mon solde restant| MVP
|Utilisateur|Ajouter une depense| enregistrer mes flux financiers en temps réel| MVP
|Utilisateur|Modifier une depense| corriger une erreur de saisie ou mettre à jour les détails d'un achat| MVP
|Utilisateur|supprimer une depense| retirer une transaction erronée ou annulée de mon historique| MVP
|Utilisateur|creer une categorie de depense| organiser ma comptabilité de manière personnalisée (Loisirs, Alimentation...)| V2
|Utilisateur|affecter une dépense à une catégorie | Trier mes depenses pour obtenir une analyse plus précise de mon budget | V2
|Utilisateur|creer un groupe de depense| mutualiser la gestion de frais communs (colocation, voyage, couple) | V2
|Utilisateur|ajouter des membres dans le groupe de depense | collaborer en temps réel sur un budget partagé avec d'autres utilisateurs | V2
|Utilisateur|exclure des gens du groupe de depense|mettre fin à la gestion commune des frais avec une personne spécifique| V2
|Utilisateur|modifier les information du groupe de depense| mettre à jour le nom, l'icône ou les dates liées à un projet de groupe| MVP
|Utilisateur|fixer des plafonds au depenses (personnel ou groupe )| être alerté en cas de dépassement de budget (individuel ou collectif)| MVP / V2 
|Utilisateur|signaler un dysfonctionnement| transmettre un bug aux administrateurs pour améliorer la stabilité de l'app| V2
|Administrateur|supprimer un compte utilisateur| modérer la plateforme et supprimer les profils inactifs ou frauduleux | MVP
|Administrateur|consulter les signalements| centraliser les retours techniques pour faciliter la maintenance corrective | V2
