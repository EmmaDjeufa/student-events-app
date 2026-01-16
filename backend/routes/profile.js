const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const path = require('path')
const { getProfile, updatePassword, uploadAvatar } = require('../controllers/profileController')

// Stockage multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/avatars'))
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `avatar-${req.user.id}${ext}`)
  },
})
const upload = multer({ storage })

// Routes
router.get('/', auth, getProfile)
router.put('/password', auth, updatePassword)
router.post('/avatar', auth, upload.single('avatar'), uploadAvatar)

module.exports = router
