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

## ✅ Prerequisites

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

## 🧪 Environment Setup

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


## 📄 License

This project is currently under development.
License details will be added later.

## ✍️ Author

**Gayanand Patel**