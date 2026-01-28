import { 
  User, Category,Expense, Budget,Alert, SavingsGoal, sequelize } from "../models/index.js";

import argon2 from "argon2";

console.log("🚧 Connexion à la base...");
await sequelize.authenticate();

console.log("🚧 Ajout des utilisateurs...");
const user1 = await User.create({
  email: "kevin@lapince.fr",
  password: await argon2.hash("password123"),
  first_name: "kevin",
  last_name: "lefranc"
});

const user2 = await User.create({
  email: "samy@lapince.fr",
  password: await argon2.hash("password456"),
  first_name: "samy",
  last_name: "khali"
});

console.log("🚧 Ajout des catégories...");
const catFood = await Category.create({ name: "Nourriture", color: "#FF5733" });
const catTransport = await Category.create({ name: "Transport", color: "#33C1FF" });
const catLoisir = await Category.create({ name: "Loisirs", color: "#9D33FF" });
const catSante = await Category.create({ name: "Santé", color: "#33FF57" });
const catEpargne = await Category.create({ name: "Epargne", color: "#FFD700" });


console.log("🚧 Ajout des dépenses...");
const expense1 = await Expense.create({
  amount: 25.50,
  date: "2026-01-10",
  description: "Courses au supermarché",
  id_user: user1.id_user,
  id_category: catFood.id_category
});

const expense2 = await Expense.create({
  amount: 12.00,
  date: "2026-01-11",
  description: "Ticket de bus",
  id_user: user1.id_user,
  id_category: catTransport.id_category
});

const expense3 = await Expense.create({
  amount: 45.00,
  date: "2026-01-12",
  description: "Cinéma + popcorn",
  id_user: user1.id_user,
  id_category: catLoisir.id_category
});

console.log("🚧 Ajout des budgets...");
const budgetFood = await Budget.create({
  alert_threshold: 200.00,
  total_amount: 500.00,
  id_user: user1.id_user,
  id_category: catFood.id_category
});

const budgetTransport = await Budget.create({
  alert_threshold: 50.00,
  total_amount: 120.00,
  id_user: user1.id_user,
  id_category: catTransport.id_category
});

console.log("🚧 Ajout des alertes...");
await Alert.create({
  date: "2026-01-15",
  description: "Dépassement du seuil nourriture",
  id_budget: budgetFood.id_budget
});

console.log("🚧 Ajout des objectifs d'épargne...");
await SavingsGoal.create({
  name: "Voyage au Sénégal",
  target_amount: 1500.00,
  actual_amount: 200.00,
  id_user: user1.id_user
});

await SavingsGoal.create({
  name: "Nouveau PC",
  target_amount: 1200.00,
  actual_amount: 150.00,
  id_user: user1.id_user
});

console.log("✅ Seed La Pince terminé ! Fermeture de la base...");
await sequelize.close();
