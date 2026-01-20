# 🎓 Smart Online Complaint Management System (OCMS)

An elegant, secure, and integrated platform for managing organizational complaints. Built with the **MERN Stack** (MongoDB, Express, React, Node.js) and enhanced with modern UI/UX principles.

![OCMS Dashboard Preview](frontend-preview.png)
*(Note: Add a screenshot of your dashboard here)*

## ✨ Key Features

- **🚀 Smart Complaint Submission**: Easy-to-use form for students/users to report issues (IT, HR, Admin, etc.).
- **🔒 Secure Admin Portal**: JWT-based Authentication to protect the Admin Dashboard.
- **🎨 Glassmorphism UI**: A premium, modern interface with "Frosted Glass" effects and dynamic animated backgrounds.
- **📊 Interactive Dashboard**: Real-time charts and summary cards to track complaint status (Pending, Resolved, etc.).
- **⚡ Status Management**: Admins can update complaint status instantly with optimistic UI updates.
- **📱 Responsive Design**: Works seamlessly on desktops, tablets, and mobile devices.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), Framer Motion (Animations), React Icons, Chart.js, Bootstrap 5.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Local or Atlas).
- **Authentication**: JSON Web Tokens (JWT), Bcrypt.js.

## 📂 Project Structure

```bash
ocms/
├── client/         # React Frontend
│   ├── src/        # Components (Dashboard, Login, Forms)
│   └── public/     # Static assets
└── server/         # Node.js Backend
    ├── models/     # Database Schemas (User, Complaint)
    ├── routes/     # API Endpoints
    └── utils/      # Helper functions
```

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
- Node.js installed
- MongoDB installed and running locally (or use Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ocms-project.git
cd ocms
```

### 2. Setup Backend (Server)
```bash
cd server
npm install
npm run dev
```
*Note: The server runs on port 5000. Ensure MongoDB is running.*

### 3. Setup Frontend (Client)
Open a new terminal:
```bash
cd client
npm install
npm run dev
```
*The application will open at `http://localhost:5173`.*

## 🔐 Admin Credentials (Default)

To access the Admin Dashboard at `/admin`, use the default credentials (or check `seedAdmin.js`):

- **Username**: `admin`
- **Password**: `Siddharat24` (or your updated password)

## 🤝 Contribution

Feel free to fork this project and submit pull requests. Any contributions to improve the UI or add new features like Email Notifications are welcome!

## 📄 License

This project is open-source and available under the MIT License.
