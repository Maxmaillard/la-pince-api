# Projet LaPince

LaPince est une Web-application de gestion de finances personnelles. ( comme Revolut, Emma-app,  bunq,  bankin’, N26, Linxo, Wise ) qui servira à suivre en temps réel nos dépenses, à planifier nos futures dépenses et à mettre des limites à celles-ci, la possibilité d’ajouter des gens à un groupe de gestion de finance.

## INSTALLATION DU PROJET  

### Cloner le dépôt  

- git clone git@github.com:O-clock-Falun/apo-LaPince.git
- cd la-pince

### Installer les dépendances du backend  

- cd api
- npm i

### Installer les dépendances du frontend  

- cd ../client
- npm i
  
### Configuration des variables d'environnement  

Créez un fichier .env dans le dossier api avec les clés suivantes :
  
- PORT=3000
- MISTRAL_API_KEY=votre_cle_mistral
- JWT_SECRET=votre_secret_jwt
- DATABASE_URL=postgres://user:password@localhost:5432/la_pince
  
### Initialisation de la base de données  

Exécutez les scripts de migration dans l'ordre pour préparer votre environnement :

- npm run create:tables # Création des tables PostgreSQL
- npm run seed:tables   # Injection des données de test
- npm run seed:admin    # Création du compte administrateur

### Lancement  

Si vous n'y êtes pas, rendez vous dans le dossier api  

- cd ../api
  
Puis lancez le serveur :  

- npm run dev

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

```
📱 Application
│
├── 🏠 Page d'accueil
│   └── App principale
│       └── 👤 Profil
│           ├── ℹ️ Mes infos
│           ├── 🏦 Mes banques
│           └── ⚙️ Mes paramètres
│
└       └── 🚨 Signalement
```

#### Detail arborescence
```
Application :  
    🏠 Page d'accueil : Presentation de la web application avec possibilité de s'inscrire ou de se connecter.  
        👤 Profil : Acces au sous menu contenant toutes les information de l'utilisateur  
            ℹ️ Mes infos : Infos de base (nom, prenom, email, mdp ...)
            🏦 Mes banques : la liste des banques connecter avec possibilité de les enlever
            ⚙️ Mes parametres : Langue, mode sombre, suppression de compte
        🚨 Signalement : Signalement d'un bug ou d'un probleme
```
### wireframe 
[voir les images utilitaires](./images-utilitaires/Images_wireframe.png)


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

## USER STORIES

### MVP

|  En tant que ... | Je veux ... | Afin de ...| Priorité |
|---    |:-:    |:-:    |:-: |
|Visiteur|m'inscrire| créer un compte personnel et accéder aux services de l'application | MVP
|Visiteur|me connecter|accéder à mon espace sécurisé et retrouver mes données sauvegardées| MVP
|Visiteur|Voir la page d'accueil|comprendre la valeur ajoutée de l'outil et ses fonctionnalités principales| MVP
|Utilisateur|Consulter l'historique de mes dépenses|suivre l'évolution de mon budget et visualiser mon solde restant| MVP
|Utilisateur|Ajouter une depense| enregistrer mes flux financiers en temps réel| MVP
|Utilisateur|Modifier une depense| corriger une erreur de saisie ou mettre à jour les détails d'un achat| MVP
|Utilisateur|supprimer une depense| retirer une transaction erronée ou annulée de mon historique| MVP
|Utilisateur|modifier les information du groupe de depense| mettre à jour le nom, l'icône ou les dates liées à un projet de groupe| MVP
|Utilisateur|fixer des plafonds au depenses (personnel ou groupe )| être alerté en cas de dépassement de budget (individuel ou collectif)| MVP
|Administrateur|supprimer un compte utilisateur| modérer la plateforme et supprimer les profils inactifs ou frauduleux | MVP

### V2

|  En tant que ... | Je veux ... | Afin de ...| Priorité |
|---    |:-:    |:-:    |:-: |
|Utilisateur|creer une categorie de depense| organiser ma comptabilité de manière personnalisée (Loisirs, Alimentation...)| V2
|Utilisateur|affecter une dépense à une catégorie | Trier mes depenses pour obtenir une analyse plus précise de mon budget | V2
|Utilisateur|creer un groupe de depense| mutualiser la gestion de frais communs (colocation, voyage, couple) | V2
|Utilisateur|ajouter des membres dans le groupe de depense | collaborer en temps réel sur un budget partagé avec d'autres utilisateurs | V2
|Utilisateur|exclure des gens du groupe de depense|mettre fin à la gestion commune des frais avec une personne spécifique| V2
|Utilisateur|signaler un dysfonctionnement| transmettre un bug aux administrateurs pour améliorer la stabilité de l'app| V2
|Administrateur|consulter les signalements| centraliser les retours techniques pour faciliter la maintenance corrective | V2



# API ENDPOINT

## 🏠 Page d'accueil :

**POST** /api/auth/login : - Connexion utilisateur  
                      - Body Email/mdp  
                      - Réponse : token d'authentification  

**POST** /api/auth/register : - Inscription nouvel utilisateur  
                          - Body : nom, prenom, email, mot de passe  
                          - Réponse : Compte créé + token d'authentification  

**POST** /api/auth/forgot-password : - Reinisialiser le mdp  
                                 - Body : email  


## 📱 Page principale : 

**GET** /api/dashboard : - Recupere le tableau de bord  
                     - Reponse : solde total, historique de depenses  

**POST** /api/new-transaction : - Crée une nouvelle transaction  
                            - Body : montant, categorie, description, date  

**GET** /api/transaction/:id : - Recupere les details d'une transation spécifique  
                           - params : id de la transaction  

**PUT** /api/transaction/:id : - mettre a jour une transaction existante  
                           - param : id de la transaction  
                           - body : Données a modifier (date, montant, description, categorie)  

**DELETE** /api/transaction/:id : - Supprime une transaction  
                              - param : l'id de la transaction  

## 👤 Profil :

### ℹ️ Mes infos :

**GET** /api/profile/infos : - Recupere les données utilisateur  
                         - Réponse : Données completes du profil  

**PUT** /api/profile/infos  : - Met a jour le profil utilisateur  
                          - Body : Données du profil a modifier  

### 🏦 Mes banques :

**GET** /api/profile/banks : - Recupere la liste des banques connectées  
                         - Reponse : Liste des comptes bancaires  

**POST** /api/profile/banks : - Ajouter une nouvelle banque  
                          - Body : information de la banque  

**GET** /api/profile/banks/:id : - Recupere les info d'une banque spécifique  
                             - params : id de la banque  

**DELETE** /api/profile/banks/:id : - supprime une connecion bancaire  
                                - params : id de la banque  

### ⚙️ Mes parametres

**GET** /api/profile/settings : - Recupere les parametres de l'utilisateur  
                            - Réponse : Configuration et preferences  

**PUT** /api/profile/settings : - met a jour les parametres  
                            - Body : parametres changé  

## 🚨 Signalement :

**POST** /api/reports : - Crée un nouveau signalement  
                    - Body : Details du signalement(type, description etc)  

**GET** /api/reports/:id : - Récupere les details d'un signalement spécifique  
                       - params : id du signalement  


