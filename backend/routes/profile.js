const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { upload } = require('../config/upload')
const {
  getProfile,
  updatePassword,
  uploadAvatar,
} = require('../controllers/profileController')

router.get('/', auth, async (req, res) => {
  const result = await pool.query(
    'SELECT id, name, email, role, created_at, avatar FROM users WHERE id=$1',
    [req.user.id]
  )

  const user = result.rows[0]

  if (!user.avatar) {
    user.avatar = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name)
  }

  res.json(user)
})

router.put('/password', auth, updatePassword)
router.post('/avatar', auth, upload.single('avatar'), uploadAvatar)

module.exports = router
