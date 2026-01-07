const express = require('express')
const pool = require('../config/db')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM events ORDER BY date')
  res.json(result.rows)
})

router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const { title, description, date } = req.body

  const result = await pool.query(
    'INSERT INTO events (title, description, date) VALUES ($1,$2,$3) RETURNING *',
    [title, description, date]
  )

  res.json(result.rows[0])
})

module.exports = router
