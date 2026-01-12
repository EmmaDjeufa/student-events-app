const express = require('express')
const pool = require('../config/db')
const router = express.Router()

// Route publique : liste des inscrits
router.get('/public', async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT r.id, u.name as user_name, u.email as user_email, e.title as event_title, r.created_at
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
