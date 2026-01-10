const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../config/db')

const router = express.Router()

router.get('/check-user', async (req, res, next) => {
  try {
    const { email } = req.query
    const result = await pool.query('SELECT id FROM users WHERE email = $1', [email])
    res.json({ exists: result.rows.length > 0 })
  } catch (err) {
    next(err)
  }
})

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    await pool.query('INSERT INTO users (name, email, password) VALUES ($1,$2,$3)', [name, email, hash])
    res.status(201).json({ message: 'User created' })
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email])

    if (!result.rows.length) return res.status(400).json({ message: 'User not found' })

    const user = result.rows[0]
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(400).json({ message: 'Invalid password' })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.json({ token })
  } catch (err) {
    next(err)
  }
})

module.exports = router
