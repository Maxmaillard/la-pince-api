# 📐 Convention HTML / CSS – Travail de groupe

Ce document définit les règles communes de **nommage**, de **structure** et de **bonnes pratiques** pour les pages HTML et CSS du projet.

👉 **Ces conventions doivent être respectées par tous les membres du groupe** afin d’assurer une cohérence globale du code.

---

## 🧱 1. Règles générales

- Nommage en **kebab-case** uniquement
- Utilisation des **classes CSS uniquement**
- ❌ Pas d’`id` (sauf cas exceptionnel et justifié)
- ❌ Pas de styles inline (`style=""`)
- Code lisible, indenté et commenté si nécessaire
- Une classe = un rôle précis

---

## 🧩 2. Convention de nommage (BEM simplifié)

Nous utilisons une **convention BEM simplifiée**, très répandue en milieu professionnel.

### 📌 Syntaxe

- block
- block__element
- block--modifier


### 🔍 Définition
- **block** : composant principal et autonome
- **element** : élément interne dépendant du bloc
- **modifier** : variation visuelle ou état du bloc/élément

---

### 🧪 Exemple HTML
```html
<section class="card">
  <h2 class="card__title">Titre</h2>
  <p class="card__text">Description</p>
  <a href="#" class="card__button card__button--primary">
    Voir plus
  </a>
</section>
```

### 🎨 Exemple CSS

.card {}  
.card__title {}  
.card__text {}  
.card__button {}  
.card__button--primary {}  

## 🧱 3. Blocs communs du projet

Les blocs suivants sont communs à tout le groupe.
👉 Ils ne doivent pas être renommés ni dupliqués sous d’autres noms.

    header

    footer

    hero

    section

    card

    button

    form

### ❌ À éviter

.btn {}  
.box {}  
.blue-card {}  

### ✅ À utiliser

**.button {}**  
**.card {}**  
**.card--highlight {}**  

## 🎨 4. Bonnes pratiques CSS
✅ À faire

    Une classe = une responsabilité claire

    Classes explicites et lisibles

    Styles regroupés par type de composants

❌ À éviter absolument

header nav ul li a {
  color: red;
}

✅ À privilégier

.header__link {
  color: red;
}

## 🗂️ 5. Structure des fichiers
📁 Arborescence minimale

/  
├── index.html  
└── css/  
&emsp;└── style.css  

## 🧾 6. Organisation du fichier CSS

Le fichier style.css doit être structuré de la manière suivante :

/* =====================
   Reset / Base
===================== */

/* =====================
   Variables
===================== */

/* =====================
   Layout
===================== */

/* =====================
   Components
===================== */

/* =====================
   Pages
===================== */

## 🧠 7. Règles HTML

    Utiliser les balises sémantiques HTML

        header, main, section, article, footer

    Indentation propre (2 espaces)

    Une classe par ligne si nécessaire pour la lisibilité

Exemple

<button
  class="button button--primary"
>
  Envoyer
</button>

## 🎯 8. Objectifs de ces conventions

Ces règles ont pour but de :

    - Garantir un code homogène

    - Faciliter la relecture et la correction

    - Éviter les conflits entre les fichiers

    - Se rapprocher des standards professionnels

    - Travailler plus efficacement en groupe

## ✅ Règle finale

    Tout code ne respectant pas ces conventions devra être corrigé.

# Merci à tous de les respecter 🙌