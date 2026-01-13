# student-events-app

(sudo -i ,
- sudo -u postgres psql (\c student_events_db)
- sudo service postgresql status
- sudo service postgresql start)

(sudo service postgresql start
)
student-events-app/
│
├─ backend/
│   ├─ package.json
│   ├─ server.js
│   ├─ .env
│   ├─ config/
│   │   └─ db.js
│   ├─ middleware/
│   │   ├─ auth.js
│   │   └─ errorHandler.js
│   ├─ models/
│   │   ├─ User.js
│   │   ├─ Event.js
│   │   └─ Registration.js
│   ├─ routes/
│   │   ├─ auth.js
│   │   ├─ events.js
│   │   └─ registrations.js
│   ├─ utils/
│   │   └─ mailer.js
│   └─ tests/
│       └─ backend.test.js
│
├─ frontend/
│   ├─ package.json
│   ├─ tailwind.config.js
│   ├─ postcss.config.js
│   ├─ vite.config.js
│   ├─ src/
│   │   ├─ main.jsx
│   │   ├─ App.jsx
│   │   ├─ api/
│   │   │   └─ api.js
│   │   ├─ pages/
│   │   │   ├─ Login.jsx
│   │   │   ├─ Register.jsx
│   │   │   ├─ Events.jsx
│   │   │   ├─ EventDetail.jsx
│   │   │   └─ Dashboard.jsx
│   │   └─ components/
│   │       ├─ Navbar.jsx
│   │       └─ EventCard.jsx
│
├─ .github/
│   └─ workflows/
│       └─ deploy.yml
│
└─ README.md
