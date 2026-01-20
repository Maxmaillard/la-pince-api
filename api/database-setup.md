# Configuration de la base de données 

PostgreSQL + Sequelize (Guide équipe)

Ce document explique comment créer l’utilisateur PostgreSQL, créer la base, configurer Sequelize et tester la connexion.

---

# 1️⃣ Se connecter à PostgreSQL

Ouvrir un terminal et taper :

```bash
psql -U postgres

2️⃣ Créer un utilisateur PostgreSQL:

CREATE USER mon_user WITH PASSWORD 'mon_mot_de_passe';

3️⃣ Créer la base de données:
CREATE DATABASE mon_projet OWNER mon_user;

'''liste des commande utiles:
\l  Permet de vérifier si ta base est bien créée.
\du Permet de vérifier si ton utilisateur PostgreSQL existe.


