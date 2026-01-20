import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize-client.js";

class Category extends Model {}

Category.init({
  id_category: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.TEXT,
  color: DataTypes.TEXT
}, {
  sequelize,
  tableName: "category",
  timestamps: false
});

export { Category };
