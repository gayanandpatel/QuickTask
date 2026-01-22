# 🚀 QuickTask

<div align="center">

![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Stack](https://img.shields.io/badge/Full%20Stack-MERN%20%2B%20Python-blueviolet?style=flat-square)

**A robust, microservices-based task management application.**
<br />
*Featuring a Node.js/Express backend, React frontend, and a dedicated Python service for data analytics.*
</div>

---

## 📖 Table of Contents
- [Overview](#-overview)
- [Architecture](#-architecture)
- [Features](#-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
  - [Backend (Node.js)](#1-backend-core-service)
  - [Analytics (Python)](#2-analytics-service)
  - [Frontend (React)](#3-frontend-client)
- [Running the Application](#-running-the-application)
- [Seeding Data](#-seeding-data-optional)
- [Screenshots](#-screenshots)
- [Troubleshooting](#-troubleshooting)
- [Author](#-author)

---

## 📖 Overview

**QuickTask** is designed to help users efficiently manage daily tasks while gaining meaningful insights through analytics. Unlike standard Todo apps, QuickTask employs a **microservices architecture**:
1.  **Core Service:** Handles authentication and CRUD operations (Node.js).
2.  **Analytics Service:** Performs heavy data aggregation and statistical calculations (Python).
3.  **Client:** A responsive, modern UI that consumes both services (React).

---

## 🏗 Architecture

The project is structured into three distinct directories to maintain separation of concerns:

```bash
QuickTask/
│
├── analytics/   # 🐍 Python Microservice (Flask + PyMongo)
│                # Handles: Data visualization logic, trend analysis
│
├── client/      # ⚛️ Frontend Application (React + Vite)
│                # Handles: User Interface, Charts (Recharts), State
│
└── server/      # 🟢 Backend API (Node.js + Express)
                 # Handles: Auth (JWT), Database (MongoDB), CRUD API
```
## 🚀 Features
- 🔐 Secure Authentication: User Login & Registration powered by JWT & Bcrypt.

- 📝 Task Management: Full CRUD capabilities (Create, Read, Update, Delete).

- 🔍 Advanced Filtering: Sort tasks by Priority, Date, or Status (Todo/In Progress/Completed).

- 📊 Analytics Dashboard: Real-time metrics visualization (Completion Rates, Pending Tasks) powered by Python.

- 📱 Responsive Design: Optimized for seamless use on desktop and mobile devices.

## 🛠️ Tech Stack

### 1. Frontend
- **Framework:** React (Vite)

- **Routing:** React Router DOM

- **HTTP Client:** Axios

- **Visualization:** Recharts

- **Notifications:** React-Toastify

### 2. Backend (Core)
- **Runtime:** Node.js

- **Framework:** Express.js

- **Database:** MongoDB (via Mongoose)

- **Auth:** JSON Web Token (JWT)

### 3. Analytics Service
- **Language:** Python 3.8+

- **Framework:** Flask

- **Driver:** PyMongo

- **Utilities:** Pandas, Python-Dotenv

## 📋 Prerequisites
Ensure you have the following installed on your machine:

- Node.js (v14 or higher)

- Python (v3.8 or higher)

- MongoDB (Local instance or MongoDB Atlas Connection String)

- Git

## ⚙️ Installation & Setup
Clone the repository to get started:
```bash
git clone [https://github.com/gayanandpatel/QuickTask.git](https://github.com/gayanandpatel/QuickTask.git)
cd QuickTask
```
### 1. 🖥️ Backend (Node.js) Setup
1. **Navigate to the server directory:**
```bash
cd server
```
2. **Install dependencies:**
```bash
npm install
```
3. **Configuration:** Create a .env file in the /server folder:
```bash
PORT=5000
MONGO_URI=mongodb+srv://<your_user>:<your_password>@<your_cluster>.mongodb.net/
JWT_SECRET=your_super_secret_key_123
```
### 2. 📊 Analytics Service (Python) Setup
1. **Navigate to the analytics directory:**
```bash
cd ../analytics
```
2. **Create and activate a Virtual Environment:**
- **Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```
- **Mac/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```
3. **Install Python dependencies:**
```bash
pip install flask pymongo python-dotenv flask-cors
```
4. **Configuration: Create a .env file in the /analytics folder.**

> Note: Ensure the MONGO_URI matches the one in the Server exactly.

```bash
PORT=5001
MONGO_URI=mongodb+srv://<your_user>:<your_password>@<your_cluster>.mongodb.net/
```
### 3. ⚛️ Frontend Setup (React)
1. **Navigate to the client directory:**
```bash
cd ../client
```
2. **Install dependencies:**
```bash
npm install
```
3. **(Optional) Clean up default styles if you haven't already.**

## 🏃‍♂️ Running the Application
To run the full application, you need to open three separate terminal windows/tabs.

### Terminal 1: Core Backend
```bash
cd server
npm start
# Runs on: http://localhost:5000
```
### Terminal 2: Analytics Service
(Make sure your virtual environment is active)
```bash
cd analytics
python app.py
# Runs on: http://localhost:5001
```
### Terminal 3: Frontend Client
```bash
cd client
npm run dev
# Runs on: http://localhost:5173
```
## 🧪 Seeding Data (Optional)
If you want to quickly populate your database with a test user and sample tasks to see the analytics in action:

1. Open a terminal in the `server` directory.

2. Run the seed script:
```bash
node seed.js
```
3. Login Credentials:

   - Email: `reviewer@example.com`

   - Password: `password123`

## 📸 Screenshots
### Analytics Dashboard
Visualizing task completion rates and productivity trends.

(Place your screenshot image in a 'screenshots' folder in the root directory)

## 🔧 Troubleshooting
- ### Analytics Charts show "0" data:

   - Ensure both `server/.env` and `analytics/.env` point to the exact same database name (e.g., `/test`).

   - Log out and log back in to ensure your User ID token is fresh.

- ### Connection Refused:

   - Ensure MongoDB is running.

   - Check that ports 5000, 5001, and 5173 are not blocked by firewalls.

## ✍️ Author
### Gayanand Patel

- GitHub: [gayanandpatel](https://github.com/gayanandpatel)

- Project: QuickTask