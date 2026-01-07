const express = require('express')
const pool = require('../config/db')
const auth = require('../middleware/auth')
const sendMail = require('../utils/mailer')

const router = express.Router()

router.post('/', auth, async (req, res) => {
  const { event_id } = req.body

  try {
    await pool.query(
      'INSERT INTO registrations (user_id, event_id) VALUES ($1,$2)',
      [req.user.id, event_id]
    )

    await sendMail(
      'test@example.com',
      'Event registration',
      `You are registered to event ${event_id}`
    )

    res.json({ message: 'Registered successfully' })
  } catch {
    res.status(400).json({ message: 'Already registered' })
  }
})

module.exports = router
