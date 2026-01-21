import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize-client.js";

class Budget extends Model {}

Budget.init({
  id_budget: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  alert_threshold: DataTypes.DECIMAL,
  total_amount: DataTypes.DECIMAL,
  id_user: DataTypes.INTEGER,
  id_category: DataTypes.INTEGER
}, {
  sequelize,
  tableName: "budget",
  timestamps: false
});

export { Budget };
