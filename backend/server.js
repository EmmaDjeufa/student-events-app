const express = require('express')
const cors = require('cors')
require('dotenv').config()

require('./models/User')
require('./models/Event')
require('./models/Registration')

const authRoutes = require('./routes/auth')
const eventRoutes = require('./routes/events')
const registrationRoutes = require('./routes/registrations')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())

// ✅ Route racine (pour éviter "Cannot GET /")
app.get('/', (req, res) => {
  res.send('Student Events API is running 🚀')
})

app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/registrations', registrationRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`)
})
