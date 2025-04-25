require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

// Récupération des variables d'environnement
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Vérification des variables d'environnement
if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Variables d'environnement SUPABASE_URL et SUPABASE_KEY requises"
  );
  process.exit(1);
}

// Création du client Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
