const pool = require('../config/db')
const path = require('path')
const fs = require('fs')

// GET profil
exports.getProfile = async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, name, email, role, avatar, created_at FROM users WHERE id=$1',
    [req.user.id]
  )
  res.json(rows[0])
}

// PUT mot de passe
exports.updatePassword = async (req, res) => {
  try {
    const bcrypt = require('bcrypt')
    const { oldPassword, newPassword } = req.body

    const userRes = await pool.query('SELECT password FROM users WHERE id=$1', [req.user.id])
    const user = userRes.rows[0]

    const match = await bcrypt.compare(oldPassword, user.password)
    if (!match) return res.status(400).json({ message: 'Mot de passe actuel incorrect' })

    const hashed = await bcrypt.hash(newPassword, 10)
    await pool.query('UPDATE users SET password=$1 WHERE id=$2', [hashed, req.user.id])

    res.json({ message: 'Mot de passe mis à jour' })
  } catch (err) {
    console.error('UPDATE PASSWORD ERROR:', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}


// UPLOAD AVATAR
exports.uploadAvatar = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Aucun fichier' })

  const avatarUrl = req.file.path // URL Cloudinary

  await pool.query(
    'UPDATE users SET avatar=$1 WHERE id=$2',
    [avatarUrl, req.user.id]
  )

  res.json({ avatar: avatarUrl })
}
