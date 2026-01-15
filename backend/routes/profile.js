const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { getProfile, updatePassword } = require('../controllers/profileController')

// Récupérer son profil
router.get('/', auth, getProfile)

// Modifier son mot de passe
router.put('/password', auth, updatePassword)

module.exports = router
