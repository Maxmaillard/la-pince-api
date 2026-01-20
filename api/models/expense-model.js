import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize-client.js";

class Expense extends Model {}

Expense.init({
  id_expense: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: DataTypes.DECIMAL,
  date: DataTypes.DATEONLY,
  description: DataTypes.TEXT,
  id_user: DataTypes.INTEGER,
  id_category: DataTypes.INTEGER
}, {
  sequelize,
  tableName: "expense",
  timestamps: false
});

export { Expense };
