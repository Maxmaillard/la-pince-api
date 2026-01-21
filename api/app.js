import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173" // Autorise l'url localhost:5173 à appeler l'API
  // origin: "*" permet d'autoriser n'importe quel origine à appeler l'API
}))

// Routes
app.use("/api", router);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur La Pince lancé sur http://localhost:${PORT}`);
});

