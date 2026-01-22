import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize-client.js";

class SavingsGoal extends Model {}

SavingsGoal.init({
  id_savings_goal: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.TEXT,
  target_amount: DataTypes.DECIMAL,
  actual_amount: DataTypes.DECIMAL,
  id_user: DataTypes.INTEGER
}, {
  sequelize,
  tableName: "savings_goal",
  timestamps: false
});

export { SavingsGoal };
