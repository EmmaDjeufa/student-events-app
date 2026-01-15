const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const upload = require('../config/upload')
const {
  getProfile,
  updatePassword,
  uploadAvatar
} = require('../controllers/profileController')

// Récupérer son profil
router.get('/', auth, getProfile)

// Modifier son mot de passe
router.put('/password', auth, updatePassword)

// Changer l'avatar
router.post('/avatar', auth, upload.single('avatar'), uploadAvatar)

module.exports = router
