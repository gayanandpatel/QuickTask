# QuickTask
A modern task management application with analytics-driven insights.

---

## 📖 Overview

**QuickTask** is a personal task management application designed to help users efficiently manage daily tasks while gaining meaningful insights through analytics.

The application is being developed with a modular and scalable architecture, separating backend services, frontend UI, and analytics logic for long-term maintainability.

---

## 📂 Project Structure

```bash
QuickTask/
│
├── analytics/   # Analytics, reports, and insights
├── client/      # Frontend application (UI)
└── server/      # Backend APIs and database logic
```
--- 

## 🚀 Getting Started
### Prerequisites

Ensure the following tools are installed on your system before proceeding:

- Node.js (v18 or higher recommended)

- npm or yarn

- MongoDB
    - Local MongoDB installation or
    - MongoDB Atlas (cloud-hosted)

### 1. 🖥️ Server Setup

Navigate to the backend directory:
```bash
cd server
```
**Step 1: Install Mongoose**

**Installation**

Install Mongoose using npm:
```bash
npm install mongoose
```
Or using yarn:
```bash
yarn add mongoose
```

**Step 2: Install the required libraries:**

**Installation**

Using npm:
```bash
npm install express mongoose jsonwebtoken cors dotenv bcryptjs
```
Or using yarn:
```bash
yarn add express mongoose jsonwebtoken cors dotenv bcryptjs
```

**Step 3: Run the Server.**

---

### 2. 📊 Analytics Service (Python Microservice)

This phase introduces a **separate analytics service built with Python**, following a real-world **microservices architecture**.

- **Node.js** handles real-time CRUD operations and APIs  
- **Python** handles heavy data processing, analytics, and reporting  

This separation improves scalability, performance, and maintainability.

---

#### ✅ Prerequisites

Ensure **Python** is installed on your system.

Verify installation by running:

```bash
python --version
```
or
```bash
python3 --version
```

---

#### 🧪 Environment Setup

The analytics service lives outside the Node.js server folder as an independent service.

**Step 1: Stop the Node.js server if it is running:**

```bash
Ctrl + C
```
**Step 2: Navigate back to the project root (where server and client exist):**
```bash
cd ..
```

**Step 3: Navigate to the analytics directory:**
```bash
cd analytics
```

**Step 4: Create a Python Virtual Environment (venv)**

A virtual environment isolates Python dependencies so they do not affect global system packages.

```bash
python -m venv venv
```
Activate the virtual environment:
```bash
venv\Scripts\activate
```
Once activated, your terminal will show something like:
```bash
(venv)
```

This confirms the virtual environment is active.

**Step 5: Install Analytics Service Dependencies**

The analytics service requires several Python libraries to function as an independent backend service.

These dependencies enable:
- Running a lightweight web server
- Communicating with MongoDB
- Managing environment variables securely
- Allowing cross-origin requests from the frontend

#### Required Libraries

- **Flask** – Web framework for building the analytics API
- **PyMongo** – MongoDB driver for Python
- **python-dotenv** – Loads environment variables from `.env`
- **flask-cors** – Enables Cross-Origin Resource Sharing (CORS)

#### Installation

Ensure the **virtual environment is activated** before installing dependencies.

Run the following command:

```bash
pip install flask pymongo python-dotenv flask-cors
```

**Step 6: Start the Python Server**

---

### 3. 🖥️ Frontend Setup & Routing (React)

This phase sets up the **React frontend** using **Vite**, which will communicate with:
- The **Node.js backend** for core application logic
- The **Python analytics service** for charts and insights

---

#### Setup & Routing

**Step 1: Initialize the React App**

1. Stop all running servers  
   (or open a new terminal split in VS Code).

2. Navigate to the project root directory  
   (the folder that contains `server` and `analytics`):

```bash
cd ..
```
**Step 3: Create the React application using Vite:**
```bash
npm create vite@latest client -- --template react
```
**Step 4: Navigate into the client directory and install dependencies:**
```bash
cd client
npm install
```
**Step 5: Install Frontend Dependencies**

Install the required libraries for routing, API communication, notifications, and charts:
```bash
npm install axios react-router-dom react-toastify recharts
```
##### Library Overview

- **axios:**
Used for making HTTP requests to the Node.js and Python backend services.

- **react-router-dom:**
Enables client-side routing and navigation between pages.

- **react-toastify:**
Provides clean, professional toast notifications for user feedback.

- **recharts:**
Used to visualize productivity and analytics data with charts.

**Step 6: Clean Up Boilerplate**

To keep the frontend clean and minimal:

1. Delete the default stylesheet:
```bash
src/App.css
```

2. Open src/main.jsx and remove the following line if you do not want default styles:
```bash
import './index.css';
```
ℹ️ You may keep index.css if you want basic CSS resets or global styles.


## 📄 License

This project is currently under development.
License details will be added later.

## ✍️ Author

**Gayanand Patel**