// Exemple de modèle
// Ici, nous gérons l'accès aux données

/**
 * Exemple de structure de table SQL
 *
 * CREATE TABLE items (
 *   id INT AUTO_INCREMENT PRIMARY KEY,
 *   name VARCHAR(255) NOT NULL,
 *   description TEXT,
 *   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 *   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
 * );
 */

/**
 * Simuler la récupération de tous les éléments
 * @returns {Promise<Array>} Liste des éléments
 */
const findAll = async () => {
  // Ici, nous exécuterions une requête SQL pour récupérer les données
  // Exemple avec mysql2:
  // const [rows] = await db.query('SELECT * FROM items');
  // return rows;

  return [];
};

/**
 * Simuler la récupération d'un élément par son ID
 * @param {string|number} id - ID de l'élément à récupérer
 * @returns {Promise<Object|null>} L'élément trouvé ou null
 */
const findById = async (id) => {
  // Ici, nous exécuterions une requête SQL pour récupérer les données
  // Exemple avec mysql2:
  // const [rows] = await db.query('SELECT * FROM items WHERE id = ?', [id]);
  // return rows[0] || null;

  return { id };
};

module.exports = {
  findAll,
  findById,
};
