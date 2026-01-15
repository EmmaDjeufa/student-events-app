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
const pool = require('../config/db')
const auth = require('../middleware/auth')

const router = express.Router()

// ✅ Liste publique des événements
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY date DESC')
    res.json(result.rows)
  } catch (err) {
    next(err)
  }
})

// 🔒 Ajouter un événement (uniquement inscrit)
router.post('/', auth, async (req, res, next) => {
  try {
    const { title, description, date } = req.body
    const result = await pool.query(
      'INSERT INTO events (title, description, date, created_by) VALUES ($1,$2,$3,$4) RETURNING *',
      [title, description, date, req.userId]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    next(err)
  }
})

// 🔒 Modifier un événement
router.put('/:id', auth, async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, description, date } = req.body
    const result = await pool.query(
      'UPDATE events SET title=$1, description=$2, date=$3 WHERE id=$4 RETURNING *',
      [title, description, date, id]
    )
    res.json(result.rows[0])
  } catch (err) {
    next(err)
  }
})

// 🔒 Supprimer un événement
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM events WHERE id=$1', [id])
    res.json({ message: 'Événement supprimé' })
  } catch (err) {
    next(err)
  }
})

module.exports = router




// middleware/auth.js
const jwt = require('jsonwebtoken')

/**
 * Middleware d'authentification
 * Vérifie le token JWT et ajoute req.userId et req.userRole
 */
function auth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: 'Non autorisé' })

  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Token manquant' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id        // ID de l'utilisateur
    req.userRole = decoded.role    // rôle de l'utilisateur (student/admin)
    next()
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' })
  }
}

module.exports = auth
