import {User }from "./user-model.js";
import {Category} from "./category-model.js";
import {Expense} from "./expense-model.js";
import {Budget} from "./budget-model.js";
import {Alert }from "./alert.model.js";
import {SavingsGoal} from "./savings-goal.model.js";

import { sequelize } from "./sequelize-client.js";



// USER → EXPENSE (One-to-Many)
User.hasMany(Expense,
     { foreignKey: "id_user",
         as: "expenses" });
Expense.belongsTo(User, 
    { foreignKey: "id_user",
         as: "user" });

// USER → BUDGET  (One-to-Many)
User.hasMany(Budget, 
    { foreignKey: "id_user",
         as: "budgets" });
Budget.belongsTo(User,
     { foreignKey: "id_user", 
        as: "user" });

// USER → SAVINGS GOAL (One-to-Many)
User.hasMany(SavingsGoal,
     { foreignKey: "id_user",
         as: "savings_goals" });
SavingsGoal.belongsTo(User,
     { foreignKey: "id_user",
         as: "user" });

// CATEGORY → EXPENSE (One-to-Many)
Category.hasMany(Expense, 
    { foreignKey: "id_category",
         as: "expenses" });
Expense.belongsTo(Category, 
    { foreignKey: "id_category",
         as: "category" });

// CATEGORY → BUDGET (One-to-Many)
Category.hasMany(Budget,
     { foreignKey: "id_category",
         as: "budgets" });
Budget.belongsTo(Category,
     { foreignKey: "id_category",
         as: "category" });

// BUDGET → ALERT (One-to-Many)
Budget.hasMany(Alert,
     { foreignKey: "id_budget",
         as: "alerts" });
Alert.belongsTo(Budget, 
    { foreignKey: "id_budget", 
        as: "budget" });

// Exporter nos modèles

export {User,Category,Expense,Budget,Alert,SavingsGoal,sequelize};
