const express = require('express')
const router = express.Router()
const { getAllUsersWithEvents } = require('../controllers/registrationController')
const auth = require('../middleware/auth')

// Public : pour la page registrations
router.get('/public', getAllUsersWithEvents)

// Admin : pour le dashboard admin
router.get('/admin', auth, getAllUsersWithEvents)

module.exports = router
