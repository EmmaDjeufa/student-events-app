const express = require('express')
const pool = require('../config/db')

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const { user_id, event_id } = req.body
    await pool.query(
      'INSERT INTO registrations (user_id, event_id) VALUES ($1,$2)',
      [user_id, event_id]
    )
    res.json({ message: 'Registered' })
  } catch (err) {
    next(err)
  }
})

module.exports = router
