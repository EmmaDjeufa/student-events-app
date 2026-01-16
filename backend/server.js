const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors({
  origin: [
    'https://student-events-app-2.onrender.com', // frontend déployé
    'http://localhost:5173' // frontend local
  ],
  credentials: true, 
}))

app.use(express.json())

// ROUTES API
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))
app.use('/api/registrations', require('./routes/registrations'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/users', require('./routes/users'))


// ⚠️ PAS DE app.get('/') ici pour un backend API
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`)
})
