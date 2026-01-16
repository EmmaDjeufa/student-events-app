//routes/profile.js
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const upload = require('../config/upload') // middleware Multer/Cloudinary
const {
  getProfile,
  updatePassword,
  uploadAvatar,
} = require('../controllers/profileController')

// Récupérer son profil
router.get('/', auth, getProfile)

// Modifier son mot de passe
router.put('/password', auth, updatePassword)

// Upload avatar via Cloudinary
router.post('/avatar', auth, upload.single('avatar'), uploadAvatar)

module.exports = router
