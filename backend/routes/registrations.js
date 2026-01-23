// routes/registrations.js
const express = require('express')
const router = express.Router()
const pool = require('../config/db')

// Liste publique des utilisateurs avec avatars et événements
router.get('/public', async (req, res) => {
  console.log('🔥 ROUTE REGISTRATIONS /public HIT')

  try {
    const result = await pool.query(`
      SELECT
        u.id,
        u.name AS user_name,
        u.email AS user_email,
        u.role AS user_role,
        u.avatar,
        COALESCE(array_to_json(array_agg(e.title) FILTER (WHERE e.id IS NOT NULL)), '[]') AS events
        FROM users u
        LEFT JOIN events e ON e.created_by = u.id
        GROUP BY u.id
        ORDER BY u.name ASC;

    `)

    console.log('USERS SENT TO FRONT:', result.rows) // debug
    res.json(result.rows)
  } catch (err) {
    console.error('🔥 GET PUBLIC REGISTRATIONS ERROR:', err)  // <-- log complet ici
    res.status(500).json({ message: 'Erreur serveur' })
  }
})


module.exports = router
