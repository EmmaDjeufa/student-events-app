const express = require('express')
const cors = require('cors')

const app = express()
const path = require('path')

app.use(express.json())

// CORS SIMPLE POUR DEV
app.use(cors())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))
app.use('/api/registrations', require('./routes/registrations'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/profile', require('./routes/profile'))


app.listen(5000, () => {
  console.log('🚀 Backend running on port 5000')
})
