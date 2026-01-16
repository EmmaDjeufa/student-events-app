const pool = require('../config/db')

// GET profile
exports.getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, avatar, created_at FROM users WHERE id=$1',
      [req.user.id]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

// UPDATE avatar
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier envoyé' })
    }

    const avatarUrl = req.file.path // URL Cloudinary

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

// UPDATE password
exports.updatePassword = async (req, res) => {
  const bcrypt = require('bcrypt')
  const { oldPassword, newPassword } = req.body

  const result = await pool.query(
    'SELECT password FROM users WHERE id=$1',
    [req.user.id]
  )

  const match = await bcrypt.compare(oldPassword, result.rows[0].password)
  if (!match) {
    return res.status(400).json({ message: 'Mot de passe incorrect' })
  }

  const hashed = await bcrypt.hash(newPassword, 10)
  await pool.query(
    'UPDATE users SET password=$1 WHERE id=$2',
    [hashed, req.user.id]
  )

  res.json({ message: 'Mot de passe mis à jour' })
}
