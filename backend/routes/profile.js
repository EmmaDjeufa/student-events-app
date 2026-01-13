const express = require('express')
const pool = require('../config/db')
const auth = require('../middleware/auth')
const upload = require('../config/upload')

const router = express.Router()

// 🔒 Voir son profil
router.get('/', auth, async (req, res) => {
  const result = await pool.query(
    'SELECT id, name, email, avatar, created_at FROM users WHERE id = $1',
    [req.userId]
  )
  res.json(result.rows[0])
})

// 🔒 Upload photo de profil
router.post('/avatar', auth, upload.single('avatar'), async (req, res) => {
  const avatarPath = `/uploads/${req.file.filename}`

  await pool.query(
    'UPDATE users SET avatar = $1 WHERE id = $2',
    [avatarPath, req.userId]
  )

  res.json({ avatar: avatarPath })
})

module.exports = router
