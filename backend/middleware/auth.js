// middleware/auth.js
const jwt = require('jsonwebtoken')

/**
 * Middleware d'authentification
 * Vérifie le token JWT et ajoute req.userId et req.userRole
 */
function auth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: 'Non autorisé' })

  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Token manquant' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id        // ID de l'utilisateur
    req.userRole = decoded.role    // rôle de l'utilisateur (student/admin)
    next()
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' })
  }
}

module.exports = auth
