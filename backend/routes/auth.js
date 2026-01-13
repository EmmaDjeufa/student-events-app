// routes/auth.js
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../config/db')

const router = express.Router()

// Vérifier si un utilisateur existe déjà
router.get('/check-user', async (req, res, next) => {
  try {
    const { email } = req.query
    const result = await pool.query('SELECT id FROM users WHERE email = $1', [email])
    res.json({ exists: result.rows.length > 0 })
  } catch (err) {
    next(err)
  }
})

/**
 * Inscription avec possibilité d'être admin
 * Frontend doit envoyer role='admin' et adminCode correct pour créer un admin
 */
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, role, adminCode } = req.body

    let userRole = 'student'

    // Si rôle admin demandé
    if (role === 'admin') {
      if (adminCode !== 'CYtech2026OK') {
        return res.status(403).json({ message: 'Code administrateur incorrect' })
      }
      userRole = 'admin'
    }

    const hash = await bcrypt.hash(password, 10)
    await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4)',
      [name, email, hash, userRole]
    )

    res.status(201).json({ message: 'Utilisateur créé', role: userRole })
  } catch (err) {
    next(err)
  }
})

/**
 * Login classique (student ou admin)
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email])

    if (!result.rows.length) return res.status(400).json({ message: 'Utilisateur introuvable' })

    const user = result.rows[0]
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(400).json({ message: 'Mot de passe incorrect' })

    // Création JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({ token, role: user.role })
  } catch (err) {
    next(err)
  }
})

module.exports = router
