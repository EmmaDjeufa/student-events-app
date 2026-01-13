// routes/registrations.js
const express = require('express')
const pool = require('../config/db')
const router = express.Router()

// Route publique : liste des inscrits avec rôle
router.get('/public', async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT 
        r.id,
        u.name AS user_name,
        u.email AS user_email,
        u.role AS user_role,
        e.title AS event_title,
        r.created_at
      FROM registrations r
      JOIN users u ON r.user_id = u.id
      JOIN events e ON r.event_id = e.id
      ORDER BY r.created_at DESC
    `)
    res.json(result.rows)
  } catch (err) {
    next(err)
  }
})

module.exports = router
