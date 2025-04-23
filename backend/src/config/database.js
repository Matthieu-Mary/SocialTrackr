// Configuration pour une base de données SQL
// Note: pas d'ORM pour le moment comme demandé

// Exemple avec mysql2
// Pour utiliser ce fichier, il faudra installer mysql2: npm install mysql2

/*
const mysql = require('mysql2/promise');

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'socialtrackr'
    });
    
    console.log('Connexion à la base de données établie');
    return connection;
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    throw error;
  }
}

module.exports = { connectToDatabase };
*/

// Ce fichier sera complété plus tard quand une décision sera prise sur la base de données SQL à utiliser
module.exports = {};
