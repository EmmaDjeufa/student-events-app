// middleware/auth.js
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: 'Non autorisé' })

  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Token manquant' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id
    next()
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' })
  }
}

module.exports = auth
