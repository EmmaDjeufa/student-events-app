const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const pool = require('../config/db')

const router = express.Router()

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

router.post('/register', async (req, res) => {
  const { error } = schema.validate(req.body)
  if (error) return res.status(400).json({ message: error.message })

  const { name, email, password } = req.body
  const hash = await bcrypt.hash(password, 10)

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING id, name, email',
      [name, email, hash]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(400).json({ message: 'Email already exists' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const result = await pool.query(
    'SELECT * FROM users WHERE email=$1',
    [email]
  )

  if (!result.rows.length) {
    return res.status(400).json({ message: 'User not found' })
  }

  const user = result.rows[0]
  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    return res.status(400).json({ message: 'Invalid password' })
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  })
})

module.exports = router
