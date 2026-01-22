<!-- PROJECT SHIELDS -->

<div align="center">

<br />

🚀 QuickTask

<p align="center">
<b>A robust, microservices-based task management ecosystem.</b>




<i>Featuring a Node.js core, React frontend, and dedicated Python analytics engine.</i>
</p>
</div>

📖 Table of Contents

About the Project

Architecture

Tech Stack

Getting Started

Prerequisites

Installation

Configuration

Running the Application

Data Seeding

Troubleshooting

Author

📖 About the Project

QuickTask goes beyond standard To-Do applications by integrating data science with daily productivity. It employs a microservices architecture to separate concerns between operational data management and heavy analytical processing.

Key Features

🔐 Secure Authentication: Robust Login/Registration flow powered by JWT & Bcrypt.

📝 Full Cycle Task Management: Create, Read, Update, and Delete tasks with ease.

🔍 Smart Filtering: Sort by Priority, Date, or Status (Todo / In Progress / Completed).

📊 Real-time Analytics: A dedicated Python microservice calculates completion rates and productivity trends.

📱 Responsive UI: A seamless experience across desktop and mobile devices.

🏗 Architecture

The project is structured into three distinct directories:

graph TD
    User((User))
    Client[⚛️ Client / React]
    Server[🟢 Core Server / Node.js]
    Analytics[🐍 Analytics / Python]
    DB[(🍃 MongoDB)]

    User --> Client
    Client -->|Auth & CRUD| Server
    Client -->|Fetch Charts| Analytics
    Server -->|Read/Write| DB
    Analytics -->|Read/Aggregate| DB


Directory Structure

QuickTask/
├── analytics/   # 🐍 Python Microservice (Flask + PyMongo)
├── client/      # ⚛️ Frontend Application (React + Vite)
└── server/      # 🟢 Backend API (Node.js + Express)


🛠 Tech Stack

Component

Technology

Role

Frontend

React (Vite), Axios, React Router

User Interface & State Management

Visualization

Recharts

Data Visualization & Charts

Backend (Core)

Node.js, Express.js

Auth, API Routes, CRUD Operations

Backend (Analytics)

Python (Flask), Pandas

Data Aggregation & Statistical Logic

Database

MongoDB (Mongoose + PyMongo)

Unified Data Storage

Authentication

JSON Web Token (JWT)

Stateless Security

⚡ Getting Started

Prerequisites

Ensure you have the following installed locally:

Node.js (v14+)

Python (v3.8+)

MongoDB (Local instance or Atlas URI)

Git

Installation

Clone the repository:

git clone [https://github.com/gayanandpatel/QuickTask.git](https://github.com/gayanandpatel/QuickTask.git)
cd QuickTask


1. Setup Backend (Node.js)

cd server
npm install


2. Setup Analytics (Python)

cd ../analytics

# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate

# Install requirements
pip install flask pymongo python-dotenv flask-cors


3. Setup Frontend (React)

cd ../client
npm install


⚙ Configuration

You must create a .env file in both the server and analytics directories.

1. server/.env

PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/prepnec_db
JWT_SECRET=your_super_secret_key_123


2. analytics/.env
Note: Ensure the MONGO_URI matches the server exactly.

PORT=5001
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/prepnec_db


🏃‍♂️ Running the Application

To run the full ecosystem, open three separate terminal windows.

Terminal

Service

Command

Address

#1

Core Backend

cd server && npm start

http://localhost:5000

#2

Analytics

cd analytics && python app.py

http://localhost:5001

#3

Client

cd client && npm run dev

http://localhost:5173

🧪 Data Seeding

Want to test the analytics without manually creating tasks? Use the seeder script.

Open a terminal in the server directory.

Run the script:

node seed.js


Login with these credentials:

Email: reviewer@example.com

Password: password123

🔧 Troubleshooting

<details>
<summary><b>Analytics Charts show "0" or No Data</b></summary>

Ensure both server/.env and analytics/.env point to the exact same database name (e.g., /prepnec_db).

Log out and log back in to refresh your JWT token.

</details>

<details>
<summary><b>Connection Refused</b></summary>

Ensure your MongoDB instance is running.

Verify ports 5000, 5001, and 5173 are not blocked by a firewall.

</details>

✍️ Author

Gayanand Patel