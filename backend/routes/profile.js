const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { upload } = require('../config/upload')
const {
  getProfile,
  updatePassword,
  uploadAvatar,
} = require('../controllers/profileController')

router.get('/', auth, getProfile)
router.put('/password', auth, updatePassword)
router.post('/avatar', auth, upload.single('avatar'), uploadAvatar)

module.exports = router
