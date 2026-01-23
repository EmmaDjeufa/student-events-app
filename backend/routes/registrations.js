const express = require('express')
const router = express.Router()
const pool = require('../config/db')
const auth = require('../middleware/auth')

// Liste publique des utilisateurs
router.get('/public', async (req, res) => {
    console.log('🔥 ROUTE REGISTRATIONS /public HIT')
  try {
    const result = await pool.query(`
      SELECT
        id,
        name AS user_name,
        email AS user_email,
        role AS user_role,
        avatar,                                   -- 👈 ICI LE PROBLÈME
      FROM users
      ORDER BY name ASC
    `)

    console.log('USERS SENT TO FRONT:', result.rows) // DEBUG CRUCIAL
    res.json(result.rows)
  } catch (err) {
    console.error('GET PUBLIC REGISTRATIONS ERROR:', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})


module.exports = router
