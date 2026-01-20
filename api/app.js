import express from "express";
import router from "./routes/index.js";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api", router);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur La Pince lancé sur http://localhost:${PORT}`);
});

