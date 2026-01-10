const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

// Parser le JSON
app.use(express.json())

// CORS complet pour dev Codespaces
const corsOptions = {
  origin: 'https://friendly-doodle-grrq94qggrxcwqgg-5173.app.github.dev', // ton frontend exact
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true,
}

app.use(cors(corsOptions))

// Répondre aux OPTIONS pour toutes les routes
app.options('*', cors(corsOptions))

// ================================
// Routes
// ================================
const authRoutes = require('./routes/auth')
const eventRoutes = require('./routes/events')
const registrationRoutes = require('./routes/registrations')

app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/registrations', registrationRoutes)

// Middleware d’erreur
const errorHandler = require('./middleware/errorHandler')
app.use(errorHandler)

// Démarrage serveur
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`))
