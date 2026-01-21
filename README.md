
# Student Events App 🚀 en cours ...

A full-stack web application for managing student events, registrations, and user profiles.  
Administrators can create, edit, and delete events, while students can view events and register.

## Live Demo
[https://student-events-app-2.onrender.com]

---

## Local Deployment

### 1. Clone the Repository
```bash
git clone https://github.com/YourUsername/student-events-app.git
cd student-events-app
````

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` and add your configuration:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@host/database
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret

# Mailtrap (optional)
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_pass

# Admin code
ADMIN_CODE=CYtech2026OK
```

Run the backend development server:

```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`.

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Run the frontend development server:

```bash
npm run dev
```

Access the app at `http://localhost:5173`.

---

### 4. Build for Production

```bash
npm run build
```

Output is in the `dist/` folder.

Preview production build:

```bash
npm run preview
```

---

## Tech Stack

**Frontend:**

* React, Vite
* Tailwind CSS
* JavaScript, HTML, CSS

**Backend:**

* Node.js, Express
* PostgreSQL (via `pg`)
* JWT authentication
* Bcrypt for password hashing
* Cloudinary for avatar uploads
* Multer for file handling
* Nodemailer (optional, Mailtrap for email testing)

**Testing & Dev Tools:**

* Jest & Supertest
* Nodemon
* ESLint

---

## Features

* User registration and login (students & admin)
* JWT-based authentication
* Profile management with avatar uploads to Cloudinary
* Create, edit, delete events (admin only)
* Event registration for students
* Dashboard for event tracking
* Secure password update

---

## Feedback & Contributions

* **Feedback:** Open an issue for bugs or suggestions
* **Contributions:** Fork, update, and submit a pull request
* **Contact:** Reach via GitHub or email for questions or professional inquiries

---

**Happy coding! 🚀**

