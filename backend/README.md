# SocialTrackr - Backend

Backend API pour l'application SocialTrackr.

## Structure du projet

```
backend/
├── src/
│   ├── routes/          // Définition des routes (endpoints de l'API)
│   ├── controllers/     // Logique de gestion des requêtes HTTP
│   ├── services/        // Logique métier et appels aux modèles
│   ├── models/          // Schémas de la base de données et accès aux données
│   ├── config/          // Configuration globale (DB, env, etc.)
│   ├── middlewares/     // Middlewares Express (auth, erreurs, etc.)
│   └── app.js           // Point d'entrée Express de l'application
├── .env                 // Variables d'environnement (à créer à partir de .env.example)
├── .gitignore
├── package.json
└── README.md
```

## Configuration requise

- Node.js (version 14+)
- Base de données SQL (à préciser)

## Installation

1. Cloner le dépôt
2. Installer les dépendances
   ```
   npm install
   ```
3. Créer un fichier `.env` en copiant `.env.example`
4. Configurer les variables d'environnement dans `.env`

## Démarrage

Pour démarrer le serveur en mode développement :

```
npm run dev
```

Pour démarrer le serveur en mode production :

```
npm start
```

## Base de données

Le projet utilise une base de données SQL (à préciser). Pour le moment, aucun ORM n'est utilisé comme demandé.

## Endpoints API

- `GET /` - Test de l'API

D'autres endpoints seront ajoutés au fur et à mesure du développement.

## Développement

Ce projet suit une architecture en couches:

- **Routes** : Définition des endpoints de l'API
- **Controllers** : Gestion des requêtes HTTP
- **Services** : Logique métier
- **Models** : Accès aux données

## Configuration de Supabase

Pour connecter l'application à votre base de données Supabase :

1. Créez un fichier `.env` à la racine du projet backend en vous basant sur le fichier `.env.example`
2. Remplacez les valeurs par vos informations de connexion Supabase :
   - `SUPABASE_URL`: URL de votre projet Supabase (ex: https://xyzabcdef.supabase.co)
   - `SUPABASE_KEY`: Clé d'API de votre projet Supabase (utilisez la "anon key" ou "service_role key" selon vos besoins)

Exemple :

```
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Pour tester la connexion, lancez le serveur et visitez l'endpoint `/api/test-supabase`.
