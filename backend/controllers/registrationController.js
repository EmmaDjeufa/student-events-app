const pool = require('../config/db')

// Récupérer tous les utilisateurs avec leurs événements
exports.getAllRegistrationsPublic = async (req, res) => {
  try {
    const query = `
      SELECT u.id, u.name AS user_name, u.email AS user_email, u.role AS user_role,
        ARRAY_AGG(e.title) AS events
      FROM users u
      LEFT JOIN registrations r ON u.id = r.user_id
      LEFT JOIN events e ON r.event_id = e.id
      GROUP BY u.id
      ORDER BY u.id
    `
    const { rows } = await pool.query(query)
    res.json(rows)
  } catch (err) {
    console.error('Erreur récupération inscriptions:', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}
