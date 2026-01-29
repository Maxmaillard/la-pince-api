// client/src/lib/models/user-model.js
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
    allowNull: false,
    unique: true 
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  first_name: DataTypes.TEXT,
  last_name: DataTypes.TEXT,
  
  role: { 
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "user" 
  }
}, {
  sequelize,
  tableName: "users",
  timestamps: false
});

export { User };