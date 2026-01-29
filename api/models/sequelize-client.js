import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DB_CONNECT, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    // CRITIQUE : Désactive le cache de requêtes pour le pooler
    prepare: false 
  },
  logging: false
});

// Test rapide
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ VICTOIRE : Connexion établie via le Pooler IPv4');
  } catch (e) {
    console.error('❌ ECHEC :', e.message);
  }
})();

export default sequelize;