import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize-client.js";

class User extends Model {}

User.init({
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  first_name: DataTypes.TEXT,
  last_name: DataTypes.TEXT
}, {
  sequelize,
  tableName: "users",
  timestamps: false
});

export { User };
