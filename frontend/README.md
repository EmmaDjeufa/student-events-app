# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



student-events-app/
├─ backend/
│  ├─ package.json
│  ├─ package-lock.json
│  ├─ server.js
│  ├─ .env
│  ├─ config/
│  │  ├─ db.js
|  |  ├─ cloudinary.js
│  │  └─ upload.js
│  ├─ middleware/
│  │  ├─ auth.js
│  │  ├─ admin.js
|  |  ├─ upload.js
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
|     |  ├─ AddEvent.css
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
