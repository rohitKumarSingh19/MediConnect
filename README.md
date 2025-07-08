# 🩺 MediConnect

**MediConnect** is a full-stack doctor appointment and slot booking platform that allows users to browse available doctors and book appointments, while enabling doctors to manage their profiles and time slots.

---

## 🌐 Live Demo (Optional)

> _Include your deployed site link if available_

---

## 📸 Screenshots

| Landing Page | Profile Page |
|--------------|--------------|
| ![Home](https://via.placeholder.com/300x180.png?text=Home+Page) | ![Profile](https://via.placeholder.com/300x180.png?text=Profile+Page) |

---

## 🚀 Features

### 🔒 Authentication
- User & Doctor login/registration
- Role-based access (User vs Doctor)

### 👨‍⚕️ Doctor Panel
- Create/update doctor profile
- Add, view, and manage appointment slots
- Slot booking status (booked/available)

### 👥 User Panel
- View doctor list
- Book appointment slots with available doctors

### 🌐 Common
- Responsive UI using Tailwind CSS
- Protected routes
- JWT-based authentication

---

## 🛠 Tech Stack

| Frontend | Backend | Database | Auth |
|----------|---------|----------|------|
| Vite + React | Node.js + Express | MongoDB | JWT |

---

## 🧰 Folder Structure

MediConnect/
│
├── backend/
│ ├── controller/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── config/
│ └── server.js
  |___ app.js
│
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── api/
│ ├── utils/
│ ├── App.jsx
│ └── main.jsx
│
└── README.md



---

## ⚙️ Setup Instructions

### Prerequisites:
- Node.js
- MongoDB installed and running locally

---

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/MediConnect.git
cd MediConnect

2. Backend Setup
cd backend
npm install



Create a .env file inside /backend:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

npm run dev

3. Frontend Setup
cd frontend
npm install
npm run dev

📍 Frontend: http://localhost:5173
📍 Backend: http://localhost:5000/api

🧪 API Endpoints (Backend)
| Route                     | Method | Description                  |
| ------------------------- | ------ | ---------------------------- |
| `/api/users/register`     | POST   | Register user/doctor         |
| `/api/users/login`        | POST   | Login user/doctor            |
| `/api/users/me`           | GET    | Get logged-in user           |
| `/api/doctors/profile`    | POST   | Create/Update doctor profile |
| `/api/doctors/my-profile` | GET    | Get doctor profile           |
| `/api/doctors/add-slot`   | POST   | Add available time slot      |
| `/api/doctors/slots`      | GET    | Get doctor's upcoming slots  |
| `/api/doctors/book`       | POST   | Book a slot (user)           |
| `/api/doctors/all`        | GET    | Get all doctors (user view)  |

🔐 Authentication Flow
JWT token stored in localStorage

Token sent in headers for protected routes using Axios interceptor

Middleware verifies token and role before accessing protected routes

✍️ Author
Name: Rohit Kumar Singh
Email: rohit.k.chauhan1997@gmail.com
GitHub: https://github.com/rohitKumarSingh19
LinkedIn: https://www.linkedin.com/in/rohit-kumar-singh-98658a198/



