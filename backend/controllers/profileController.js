const cloudinary = require('../config/cloudinary')
const pool = require('../config/db')

// GET profil
exports.getProfile = async (req, res) => {
  try {
    const userRes = await pool.query(
      'SELECT id, name, email, role, created_at, avatar FROM users WHERE id=$1',
      [req.user.id]
    )
    res.json(userRes.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

// PUT mot de passe
exports.updatePassword = async (req, res) => {
  // ton code existant
}

// POST avatar
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file || !req.file.path) return res.status(400).json({ message: 'Fichier manquant' })

    // Sauvegarde URL Cloudinary dans DB
    const avatarUrl = req.file.path
    await pool.query('UPDATE users SET avatar=$1 WHERE id=$2', [avatarUrl, req.user.id])

    res.json({ avatar: avatarUrl })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}
