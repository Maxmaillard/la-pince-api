import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize-client.js";

class Alert extends Model {}

Alert.init({
  id_alert: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  id_budget: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: "alert",
  timestamps: false
});

export { Alert };
