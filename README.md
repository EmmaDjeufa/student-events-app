# student-events-app

(sudo -i ,
- sudo -u postgres psql (\c student_events_db)
- sudo service postgresql status
- sudo service postgresql start)

(sudo service postgresql start
)


student-events-app/
├─ backend/
│  ├─ package.json
│  ├─ package-lock.json
│  ├─ server.js
│  ├─ .env
│  ├─ config/
│  │  ├─ db.js
│  │  └─ upload.js
│  ├─ middleware/
│  │  ├─ auth.js
│  │  ├─ admin.js
│  │  └─ errorHandler.js
│  ├─ controllers/
│  │  ├─ authController.js
│  │  ├─ eventController.js
|  |  ├─ profileController.js
│  │  └─ registrationController.js
│  ├─ models/
│  │  ├─ User.js
│  │  ├─ Event.js
│  │  └─ Registration.js
│  ├─ routes/
│  │  ├─ auth.js
│  │  ├─ events.js
│  │  ├─ profile.js
│  │  ├─ users.js
│  │  └─ registrations.js
│  ├─ utils/
│  │  └─ mailer.js
│  ├─ uploads/
│  │  └─ avatars/
│  └─ tests/
│     └─ backend.test.js
│
├─ frontend/
│  ├─ package.json
│  ├─ package-lock.json
│  ├─ tailwind.config.cjs
│  ├─ postcss.config.cjs
│  ├─ vite.config.js
│  ├─ .env
│  ├─ .gitignore
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ dist/
│  ├─ public/
│  ├─ node_modules/
│  └─ src/
│     ├─ main.jsx
│     ├─ index.css
│     ├─ App.jsx
│     ├─ App.css
│     ├─ api/
│     │  └─ api.js
│     ├─ pages/
│     │  ├─ Home.jsx
│     │  ├─ Login.jsx
│     │  ├─ Register.jsx
│     │  ├─ Events.jsx
│     │  ├─ EventDetail.jsx
│     │  ├─ Dashboard.jsx
│     │  ├─ Registrations.jsx
│     │  ├─ AddEvent.jsx
│     │  ├─ EditEvent.jsx
│     │  ├─ Profile.jsx
│     │  └─ AdminLogin.jsx
│     ├─ pages/css/
│     │  ├─ Home.css
│     │  ├─ Login.css
│     │  ├─ Register.css
│     │  ├─ Events.css
│     │  ├─ EventDetail.css
│     │  ├─ Dashboard.css
│     │  ├─ Registrations.css
│     │  ├─ EditEvent.css
│     │  ├─ EventForm.css
│     │  ├─ Navbar.css
│     │  ├─ EventCard.css
│     │  ├─ Profile.css
│     │  └─ Auth.css
│     └─ components/
│        ├─ Navbar.jsx
│        ├─ EventForm.jsx
│        └─ EventCard.jsx
│
├─ .github/
│  └─ workflows/
│     └─ deploy.yml
│
├─ node_modules/
├─ package.json
├─ package-lock.json
└─ README.md

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
