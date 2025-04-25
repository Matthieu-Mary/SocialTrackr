## Route (userRoutes.js) :
Point d'entrée de l'API
Définit les endpoints accessibles (URL et méthodes HTTP)
Dirige les requêtes vers les contrôleurs appropriés
Structure l'API de façon cohérente et prévisible

## Controller (userController.js) :
Gère les requêtes HTTP et les réponses
Extrait les données de la requête (body, params, query)
Appelle les services appropriés pour traiter la logique métier
Formate les réponses renvoyées au client
Gère les erreurs et définit les codes HTTP appropriés

## Service (userService.js) :
Contient la logique métier de l'application
Valide les données (vérification de format, règles métier)
Coordonne l'utilisation des modèles
Implémente les règles fonctionnelles de l'application
Indépendant du framework HTTP

## Model (userModel.js) :
Gère l'accès aux données et les interactions avec la base de données
Définit la structure des données
Exécute les opérations CRUD sur Supabase
Encapsule la logique spécifique à la persistance des données
Gère la transformation des données entre l'application et la base de données