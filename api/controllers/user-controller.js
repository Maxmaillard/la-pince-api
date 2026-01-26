import { User } from "../models/user-model.js";

export const userController = {
  async getAll(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
  
          async delete(req, res) {
  try {
    const userId = req.params.id;

    // Vérifier si l'utilisateur existe
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    

    // Suppression
    const deletedCount = await User.destroy({
      where: { id_user: userId }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    return res.status(204).end(); // No Content
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

};
