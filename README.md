### Access the live version of QuickTask here: https://quicktask.gayanandpatel.org/
> ⚠️ Note: The application is currently under active development. Some features may be experimental.

#### Use the following credentials to explore the application with pre-seeded data:

  - Email: `reviewer@example.com`
  - Password: `password123`

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
- [Tech Stack](#techstack)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#installation)
  - [Backend (Node.js)](#backend-node)
  - [Analytics (Python)](#analytic-python)
  - [Frontend (React)](#frontend-react)
- [Running the Application](#run-application)
- [Seeding Data](#-seeding-data-optional)
- [Screenshots](#-screenshots)
- [Troubleshooting](#-troubleshooting)
- [Author](#author)


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

## 🛠️ Tech Stack <a id = "techstack"> </a>

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

## ⚙️ Installation & Setup <a id = "installation"> </a>
Clone the repository to get started:
```bash
git clone https://github.com/gayanandpatel/QuickTask.git
cd QuickTask
```
### 1. 🖥️ Backend (Node.js) Setup <a id = "backend-node"> </a>
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
### 2. 📊 Analytics Service (Python) Setup <a id = "analytic-python"> </a>
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
### 3. ⚛️ Frontend Setup (React) <a id = "frontend-react"> </a>
1. **Navigate to the client directory:**
```bash
cd ../client
```
2. **Install dependencies:**
```bash
npm install
```
3. **(Optional) Clean up default styles if you haven't already.**

## 🏃‍♂️ Running the Application <a id = "run-application"> </a>
To run the full application, you need to open three separate terminal windows/tabs.

### Terminal 1: Core Backend
```bash
cd server
node server.js
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
cd my-react-app
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
#### HomePage
<img width="1915" height="1019" alt="homepage" src="https://github.com/user-attachments/assets/8210cea7-5406-410c-9577-9e617dd1d6ca" />

#### SignUp Modal
<img width="1911" height="1017" alt="register_page" src="https://github.com/user-attachments/assets/025f0e13-fa52-4145-bc4e-7a1bf7954456" />

#### SignIn Modal
<img width="1900" height="988" alt="signin" src="https://github.com/user-attachments/assets/38f48396-9ceb-46a7-b7f7-8ca9ad1d3c59" />

#### Dashboard Without Tasks
<img width="1911" height="961" alt="new_dashboard" src="https://github.com/user-attachments/assets/7562af0c-cf9c-4188-bd11-2aff9227d396" />

#### New Task Creation
<img width="1904" height="1019" alt="create_new-task" src="https://github.com/user-attachments/assets/6e36898b-5b23-4f98-a182-a4c165dc1f4d" />

#### Dashboard with created Task
<img width="1904" height="1024" alt="task_created" src="https://github.com/user-attachments/assets/e3433159-028e-489a-98a7-d6b120c081ba" />

#### Theme Toggle Button
<img width="1888" height="922" alt="theme-toggle-button" src="https://github.com/user-attachments/assets/2d98be1f-027a-47ee-82e2-2836cf1efc08" />

#### Dashboard and Insights
<img width="1877" height="1011" alt="dashboard" src="https://github.com/user-attachments/assets/2608598f-a6ac-4db3-b441-8a2433b21332" />
<img width="1883" height="1015" alt="insights" src="https://github.com/user-attachments/assets/d20890c1-a64d-45f2-a8bb-2996a1d4239b" />

#### Sorting and Searching
<img width="1904" height="1008" alt="sorting and searching" src="https://github.com/user-attachments/assets/c90cbb99-f550-4160-8acd-11c089ecc77b" />


## 🔧 Troubleshooting
- ### Analytics Charts show "0" data:

   - Ensure both `server/.env` and `analytics/.env` point to the exact same database name (e.g., `/test`).

   - Log out and log back in to ensure your User ID token is fresh.

- ### Connection Refused:

   - Ensure MongoDB is running.

   - Check that ports 5000, 5001, and 5173 are not blocked by firewalls.

## ✍️ Author <a id = "author"> </a>
### Gayanand Patel

- GitHub: [gayanandpatel](https://github.com/gayanandpatel)

- Project: QuickTask
