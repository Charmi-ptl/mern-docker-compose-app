# 🚀 MERN Docker Compose Application

This project is a full-stack MERN web application developed using MongoDB, Express.js, React.js, and Node.js. The application allows users to view and manage projects, includes user authentication (admin and student login), and provides a responsive user interface built with React.
This repository contains a **full-stack MERN web application** that is fully **containerized using Docker and Docker Compose**. The project demonstrates how to run the **entire application stack with a single command**, including frontend, backend, database, and cache services.

---

## 🧩 Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Cache:** Redis (configured for caching support)
* **Containerization:** Docker & Docker Compose

---

## ✨ Project Features

* Admin and student authentication
* Project management APIs
* RESTful backend architecture
* Responsive React frontend
* Dockerized services for consistent setup
* Single-command startup using Docker Compose

---

## 📁 Project Structure

```
mern-docker-compose-app/
│
├── project-frontend/      # React frontend
│   ├── Dockerfile
│   └── src/
│
├── project-backend/       # Node.js + Express backend
│   ├── Dockerfile
│   ├── routes/
│   ├── controllers/
│   └── models/
│
├── docker-compose.yml     # Runs entire stack
├── assets/                # Project images / screenshots
└── README.md
```

---

## 🐳 Dockerized Services

The following services are managed using **Docker Compose**:

* **Frontend** – React application
* **Backend** – Express REST API
* **MongoDB** – Database service
* **Redis** – Cache service (configured)

---

## ⚙️ Environment Variables

Create a `.env` file inside `project-backend/` using this example:

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/projectDB
JWT_SECRET=your_jwt_secret_here
REDIS_HOST=redis
REDIS_PORT=6379
```

> ⚠️ The `.env` file is ignored in GitHub for security. Use `.env.example` as reference.

---

## ▶️ How to Run the Project (Single Command)

Make sure **Docker & Docker Compose** are installed.

From the root directory:

```bash
docker-compose up --build
```

This command will:

* Build frontend and backend images
* Start MongoDB and Redis containers
* Run the complete application stack

---

## 🌐 Access the Application

* **Frontend:** `http://localhost:3000`
* **Backend API:** `http://localhost:5000`

---

## 📌 Key Learning Outcomes

* Dockerizing a MERN stack application
* Using Docker Compose for multi-container setup
* Environment variable management
* Clean project structuring for deployment
* Running full-stack apps with a single command

---

## 🔗 GitHub Repository

👉 **Repository Link:**
[https://github.com/Charmi-ptl/mern-docker-compose-app](https://github.com/Charmi-ptl/mern-docker-compose-app)

---

## 👤 Author

**Charmi Patel**


