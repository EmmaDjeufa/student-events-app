const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express()

// CORS pour autoriser le frontend
app.use(cors({
  origin: [
    'https://student-events-app-2.onrender.com', // frontend déployé
    'https://friendly-doodle-grrq94qggrxcwqgg-5173.app.github.dev', // frontend local
  ],
  credentials: true
}))

app.use(express.json())

// ROUTES API
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))
app.use('/api/registrations', require('./routes/registrations'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/users', require('./routes/users'))

// fichiers statiques (uploads locaux si utilisés)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`)
})
