const express = require('express')
const pool = require('../config/db')
const router = express.Router()

// Liste publique de TOUS les utilisateurs + leurs événements
router.get('/public', async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT 
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email,
        u.role AS user_role,
        e.title AS event_title
      FROM users u
      LEFT JOIN registrations r ON r.user_id = u.id
      LEFT JOIN events e ON e.id = r.event_id
      ORDER BY u.created_at DESC
    `)

    // Regroupement par utilisateur
    const usersMap = {}

    for (const row of result.rows) {
      if (!usersMap[row.user_id]) {
        usersMap[row.user_id] = {
          id: row.user_id,
          user_name: row.user_name,
          user_email: row.user_email,
          user_role: row.user_role,
          events: []
        }
      }

      if (row.event_title) {
        usersMap[row.user_id].events.push(row.event_title)
      }
    }

    res.json(Object.values(usersMap))
  } catch (err) {
    next(err)
  }
})

module.exports = router
