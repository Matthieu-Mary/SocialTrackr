const supabase = require("../config/supabase");
const bcrypt = require("bcrypt");

const UserModel = {
  /**
   * Crée un nouvel utilisateur dans Supabase
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Promise<Object>} - Utilisateur créé
   */
  async create(userData) {
    try {
      // Hashage du mot de passe
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      // Création de l'authentification
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            username: userData.username,
          },
        },
      });

      if (authError) {
        console.error("Erreur d'authentification:", authError);
        throw authError;
      }

      // S'assurer que authData et authData.user existent
      if (!authData || !authData.user) {
        throw new Error("Données utilisateur non retournées par Supabase");
      }

      // Création de l'entrée dans la table Users
      const { data, error } = await supabase
        .from("Users")
        .insert([
          {
            id: authData.user.id,
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ])
        .select();

      if (error) throw error;

      return { user: data[0], auth: authData };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = UserModel;
