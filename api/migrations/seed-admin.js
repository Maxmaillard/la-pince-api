import argon2 from "argon2";
import { User } from "../models/user-model.js"; // Import du modèle Sequelize

async function seedAdmin() {
    try {
        // Mdp par défaut pour le dev
        const clearPassword = "admin_password_123";//il faut changer le mot de passe a la premiere connexion
        const hashedPassword = await argon2.hash(clearPassword); 

        // create ou update si l'email existe déjà
        const [user, created] = await User.findOrCreate({
            where: { email: 'admin@lapince.fr' },
            defaults: {
                first_name: 'Super',
                last_name: 'Admin',
                password: hashedPassword,
                role: 'admin'
            }
        });

        if (!created) {
            // Si l'utilisateur existait déjà, on force le rôle admin
            await user.update({ role: 'admin' });
            console.log("♻️  Utilisateur admin existant mis à jour.");
        } else {
            console.log("🚀 Nouveau compte Super Admin créé.");
        }

        console.log(`
        ---------------------------------------
        ADMIN PRÊT :
        Email: admin@lapince.fr
        MDP: ${clearPassword}
        ---------------------------------------
        `);
        
        process.exit(0);
    } catch (error) {
        console.error("❌ Erreur lors du seed admin:", error);
        process.exit(1);
    }
}

seedAdmin();