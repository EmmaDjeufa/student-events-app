const express = require('express')
const pool = require('../config/db')

const router = express.Router()

// ✅ Liste des événements
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM events ORDER BY date DESC'
    )
    res.json(result.rows)
  } catch (err) {
    next(err)
  }
})

module.exports = router
