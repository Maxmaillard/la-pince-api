import { sequelize } from "../models/index.js";
// Le sequelize a "conscience" des différents modèles
try {
  console.log(" Suppression des tables existantes...");
  await sequelize.drop();   // Notamment pour relancer le script plusieurs fois si on veut faire un reset:db
// Synchroniser le modèle séquelize avec la BDD, ie, RE-CREER la table à partir du modèle Sequelize
  console.log("🚧 Définition des tables...");
  await sequelize.sync();    
  console.log("🗃️ Tables actuelles :", 
    // Vérifie la migration en affichant la structure de la db
    await sequelize.getQueryInterface().showAllTables()
  );

  console.log("✅ Reset terminé ! Fermeture de la connexion...");
  await sequelize.close();
} catch (error) {
  console.error("❌ Erreur lors du reset :", error);
}

