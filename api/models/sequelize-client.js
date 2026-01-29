import { Sequelize } from "sequelize";
import "dotenv/config";

// On force SSL pour la prod (Render)
const isProduction = process.env.NODE_ENV === 'production' || !!process.env.RENDER;

export const sequelize = new Sequelize(process.env.DB_CONNECT, {
  dialect: "postgres",
  dialectOptions: isProduction ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {},
  logging: false
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ DATABASE CONNECTED SUCCESSFULLY');
  } catch (error) {
    console.error('❌ DATABASE CONNECTION ERROR:', error.message);
  }
}

connectDB();

export default sequelize;