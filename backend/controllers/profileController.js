const pool = require('../config/db')
const bcrypt = require('bcrypt')

// GET /api/profile
exports.getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, avatar, created_at FROM users WHERE id=$1',
      [req.user.id]
    )

    if (!result.rows.length) {
      return res.status(404).json({ message: 'Utilisateur introuvable' })
    }

    res.json(result.rows[0])
  } catch (err) {
    console.error('GET PROFILE ERROR:', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

// PUT /api/profile/password
exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body

    const result = await pool.query(
      'SELECT password FROM users WHERE id=$1',
      [req.user.id]
    )

    const user = result.rows[0]
    const match = await bcrypt.compare(oldPassword, user.password)
    if (!match) {
      return res.status(400).json({ message: 'Mot de passe actuel incorrect' })
    }

    const hashed = await bcrypt.hash(newPassword, 10)
    await pool.query(
      'UPDATE users SET password=$1 WHERE id=$2',
      [hashed, req.user.id]
    )

    res.json({ message: 'Mot de passe mis à jour' })
  } catch (err) {
    console.error('UPDATE PASSWORD ERROR:', err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

// POST /api/profile/avatar
exports.uploadAvatar = async (req, res) => {
  try {
    console.log('FILE:', req.file)

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'Aucun fichier reçu' })
    }

    const avatarUrl = req.file.path // ⚠️ URL CLOUDINARY

    await pool.query(
      'UPDATE users SET avatar=$1 WHERE id=$2',
      [avatarUrl, req.user.id]
    )

    res.json({ avatar: avatarUrl })
  } catch (err) {
    console.error('UPLOAD AVATAR ERROR:', err)
    res.status(500).json({ message: 'Erreur upload avatar' })
  }
}
