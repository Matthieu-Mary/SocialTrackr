@echo off
echo Démarrage des projets Frontend et Backend en mode développement...

:: Démarrer le backend dans une nouvelle fenêtre
start "Backend" cmd /k "cd backend && npm run dev"

:: Démarrer le frontend dans une nouvelle fenêtre
start "Frontend" cmd /k "cd frontend && npm run dev"

echo Les projets sont en cours de démarrage...
echo Backend: http://localhost:3000
echo Frontend: http://localhost:4200 