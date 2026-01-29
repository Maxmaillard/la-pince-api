import pg from "pg";
import "dotenv/config";

const client = new pg.Client(process.env.DB_CONNECT);
console.log("Tentative de connexion avec :", process.env.DB_CONNECT);
async function createTables() {
  try {
    await client.connect();
    console.log("🚧 Création des tables LaPince...");

    await client.query(`
  CREATE TABLE IF NOT EXISTS users (
    id_user SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(20) NOT NULL DEFAULT 'user'
  );

  CREATE TABLE IF NOT EXISTS category (
    id_category SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(9)
  );

  CREATE TABLE IF NOT EXISTS expense (
    id_expense SERIAL PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    description VARCHAR(250),
    id_user INT NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
    id_category INT NOT NULL REFERENCES category(id_category)
  );

      CREATE TABLE IF NOT EXISTS budget (
        id_budget SERIAL PRIMARY KEY,
        alert_threshold DECIMAL(10,2),
        total_amount DECIMAL(10,2),
        id_user INT NOT NULL REFERENCES users(id_user) ON DELETE CASCADE,
        id_category INT NOT NULL REFERENCES category(id_category)
      );

      CREATE TABLE IF NOT EXISTS alert (
        id_alert SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        description VARCHAR(255),
        id_budget INT NOT NULL REFERENCES budget(id_budget) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS savings_goal (
        id_savings_goal SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        target_amount DECIMAL(10,2),
        actual_amount DECIMAL(10,2),
        id_user INT NOT NULL REFERENCES users(id_user) ON DELETE CASCADE
      );
    `);

    console.log("✅ Tables La Pince créées avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors de la création des tables :", error);
  } finally {
    client.end();
  }
}

createTables();
