//server.js
const express = require('express')
const cors = require('cors')
const path = require('path')
const pool = require('./config/db')
require('dotenv').config()

const app = express()

/**
 * =========================
 * CORS CONFIG (PROPRE)
 * =========================
 */
const allowedOrigins = [
  'https://student-events-app-2.onrender.com', // frontend prod
  'http://localhost:5173', // frontend local Vite
]

// Autoriser tous les GitHub Codespaces automatiquement
const corsOptions = {
  origin: (origin, callback) => {
    // Postman / curl / mobile apps
    if (!origin) return callback(null, true)

    // Origines autorisées fixes
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    // GitHub Codespaces (*.app.github.dev)
    if (origin.includes('.app.github.dev')) {
      return callback(null, true)
    }

    console.log('❌ CORS BLOCKED:', origin)
    return callback(new Error('Not allowed by CORS'))
  },

  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))

// IMPORTANT: gérer les preflight requests
app.options('*', cors(corsOptions))

/**
 * =========================
 * MIDDLEWARES
 * =========================
 */
app.use(express.json())

/**
 * =========================
 * ROUTES API
 * =========================
 */
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))
app.use('/api/registrations', require('./routes/registrations'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/users', require('./routes/users'))

/**
 * =========================
 * STATIC FILES
 * =========================
 */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

/**
 * =========================
 * HEALTH CHECK
 * =========================
 */
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    database: 'Supabase',
    message: 'Student Events API running'
  })
})

/**
 * =========================
 * START SERVER
 * =========================
 */
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`)
})

/**
 * =========================
 * DATABASE CHECK
 * =========================
 */
pool.query('SELECT NOW()')
  .then(() => console.log('✅ SUPABASE CONNECTED'))
  .catch(err => console.error('❌ DB ERROR', err))