import { Sequelize } from "sequelize";
import "dotenv/config";

// On utilise une constante pour plus de clarté
const dbUrl = process.env.DB_CONNECT;

export const sequelize = new Sequelize(dbUrl, {
  dialect: "postgres",
  // SSL est OBLIGATOIRE pour Supabase hors local
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false // On désactive pour pas polluer les logs Render (optionnel)
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}

connectDB();

export default sequelize;