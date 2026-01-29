import { User } from "../models/user-model.js";
import argon2 from "argon2"

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
},

  // modification mot de passe
  
  async update(req, res) {
    try {
      const { id } = req.params;
      const { password } = req.body;

      if (!password) {
        return res.status(400).json({ error: "Nouveau mot de passe requis" });
      }

      // 1. Hachage avec Argon2 
      const hashedPassword = await argon2.hash(password);

      // 2. Mise à jour Sequelize
      const [updatedRows] = await User.update(
        { password: hashedPassword },
        { where: { id_user: id } }
      );

      if (updatedRows === 0) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      res.json({ message: "Mot de passe mis à jour avec succès" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la mise à jour" });
    }
  },
  
async updateRole(req, res) {
    try {
      const { id } = req.params;
      const { role } = req.body; // 'admin' ou 'user'

      const user = await User.findByPk(id);
      if (!user) {
          return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      await user.update({ role });
      res.json({ message: `Rôle mis à jour : ${role}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la mise à jour du rôle" });
    }
  }
};