// routes/registrations.js
const express = require('express')
const pool = require('../config/db')
const router = express.Router()

// Route publique : liste tous les utilisateurs avec leurs rôles et éventuellement les événements
router.get('/public', async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT 
        u.id,
        u.name AS user_name,
        u.email AS user_email,
        u.role AS user_role,
        ARRAY_REMOVE(ARRAY_AGG(e.title), NULL) AS events
      FROM users u
      LEFT JOIN registrations r ON u.id = r.user_id
      LEFT JOIN events e ON r.event_id = e.id
      GROUP BY u.id, u.name, u.email, u.role
      ORDER BY u.id
    `)

    res.json(result.rows)
  } catch (err) {
    next(err)
  }
})

module.exports = router
