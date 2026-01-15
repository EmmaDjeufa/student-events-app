const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

// Expose le dossier uploads pour que les avatars soient accessibles
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/profile', require('./routes/profile'))
// ... tes autres routes (auth, events, etc.)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
