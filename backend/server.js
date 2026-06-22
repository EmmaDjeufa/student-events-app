//server.js
const express = require('express')
const cors = require('cors')
const path = require('path')
const pool = require('./config/db')

require('dotenv').config()

const app = express()

// Configuration CORS
app.use(cors({
  origin: (origin, callback) => {
    // Autoriser Postman, curl et requêtes serveur
    if (!origin) return callback(null, true)

    const allowedOrigins = [
      'https://student-events-app-2.onrender.com'
    ]

    // Autoriser tous les Codespaces GitHub
    if (
      allowedOrigins.includes(origin) ||
      origin.includes('.app.github.dev')
    ) {
      return callback(null, true)
    }

    console.log('❌ CORS BLOCKED:', origin)
    callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Réponse aux préflight requests
app.options('*', cors())

// Middleware
app.use(express.json())

// Routes API
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))
app.use('/api/registrations', require('./routes/registrations'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/users', require('./routes/users'))

// Fichiers statiques
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Route de test
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    database: 'Supabase',
    message: 'Student Events API running'
  })
})

// Démarrage serveur
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`)
})

// Vérification connexion DB
pool.query('SELECT NOW()')
  .then(() => console.log('✅ SUPABASE CONNECTED'))
  .catch(err => console.error('❌ DB ERROR', err))