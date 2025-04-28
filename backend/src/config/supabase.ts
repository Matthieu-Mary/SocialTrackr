import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Chargement des variables d'environnement
dotenv.config();

// Récupération des variables d'environnement
const supabaseUrl = process.env.SUPABASE_PROJECT_URL || "";
const supabaseKey = process.env.SUPABASE_PROJECT_API_KEY || "";

// Vérification des variables d'environnement
if (!supabaseKey) {
  console.error("Variables d'environnement SUPABASE_KEY manquante");
  if (!supabaseUrl) {
    console.error("Variables d'environnement SUPABASE_URL requise");
  }
  process.exit(1);
}

// Création du client Supabase
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;
