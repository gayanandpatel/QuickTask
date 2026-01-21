# 🚀 QuickTask

![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Stack](https://img.shields.io/badge/Full%20Stack-MERN%20%2B%20Python-blueviolet?style=flat-square)

> **A robust, microservices-based task management application featuring a Node.js/Express backend, React frontend, and a dedicated Python service for data analytics.**

---

## 📖 Table of Contents
- [Overview](#-overview)
- [Architecture](#-architecture)
- [Features](#-features)
- [Tech Stack](#-%EF%B8%8F-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-%EF%B8%8F-installation--setup)
  - [1. Backend (Node.js)](#1-%EF%B8%8F-backend-nodejs-setup)
  - [2. Analytics (Python)](#2--analytics-service-python-setup)
  - [3. Frontend (React)](#3-%EF%B8%8F-frontend-setup-react)
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