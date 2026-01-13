function admin(req, res, next) {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Accès administrateur requis' })
  }
  next()
}

module.exports = admin
