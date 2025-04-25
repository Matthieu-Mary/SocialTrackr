require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

// Récupération des variables d'environnement
const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_PROJECT_API_KEY;

// Vérification des variables d'environnement
if (!supabaseKey) {
  console.error("Variables d'environnement SUPABASE_KEY");
  if (!supabaseUrl) {
    console.error("Variables d'environnement SUPABASE_URL requise");
  }
  process.exit(1);
}

// Création du client Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
