const pool = require('../config/db')
const bcrypt = require('bcrypt')
const path = require('path')

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

exports.updatePassword = async (req, res) => {
  try {
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

exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Fichier manquant' })

    const avatarPath = `/uploads/avatars/${req.file.filename}`
    await pool.query('UPDATE users SET avatar=$1 WHERE id=$2', [avatarPath, req.user.id])

    res.json({ avatar: avatarPath })
  } catch (err) {
    console.error('UPLOAD AVATAR ERROR:', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}
