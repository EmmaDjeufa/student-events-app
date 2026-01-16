const pool = require('../config/db')
const path = require('path')
const fs = require('fs')

// GET profil
exports.getProfile = async (req, res) => {
  try {
    const userRes = await pool.query(
      'SELECT id, name, email, role, avatar, created_at FROM users WHERE id=$1',
      [req.user.id]
    )
    res.json(userRes.rows[0])
  } catch (err) {
    console.error('GET PROFILE ERROR:', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
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

// POST avatar
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Fichier manquant' })

    // Stocke le chemin relatif en DB
    const avatarPath = `/uploads/avatars/${req.file.filename}`

    await pool.query('UPDATE users SET avatar=$1 WHERE id=$2', [avatarPath, req.user.id])

    // Retourne URL complète pour le frontend
    const fullUrl = `${process.env.VITE_BACKEND_URL || 'http://localhost:5000'}${avatarPath}`
    res.json({ avatar: fullUrl })
  } catch (err) {
    console.error('UPLOAD AVATAR ERROR:', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}
