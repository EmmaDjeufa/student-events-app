const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(express.json())

// CORS simple pour dev
app.use(cors())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))
app.use('/api/registrations', require('./routes/registrations'))
app.use('/api/profile', require('./routes/profile'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Render fournit le port via env
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`))
