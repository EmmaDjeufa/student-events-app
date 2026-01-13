// routes/users.js
const express = require('express')
const pool = require('../config/db')
const router = express.Router()

// Liste de tous les utilisateurs avec leur rôle
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT id, name, email, role
      FROM users
      ORDER BY role DESC, name
    `)
    res.json(result.rows)
  } catch (err) {
    next(err)
  }
})

module.exports = router
