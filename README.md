# docker-compose-1
Full-stack demo project with Docker Compose: React frontend, FastAPI backend, PostgreSQL database, and Adminer. Tracks button clicks in real time with persistent storage.
# 🖱️ Click Tracker

A simple full-stack application running entirely with **Docker Compose**.  
It demonstrates how to connect a **React (Vite) frontend**, a **FastAPI backend**,  
a **PostgreSQL database**, and **Adminer** (DB UI) in one reproducible environment.

---

## 🚀 Features
- React (Vite) frontend with two buttons (**A** / **B**)
- Each button click is stored in the database
- FastAPI backend with REST API + Swagger docs
- PostgreSQL for persistent storage
- Adminer for quick database inspection
- Runs fully via Docker Compose

---

## 🗂 Project Structure

- **db/**
  - `init.sql` → SQL script για δημιουργία του πίνακα `clicks`.

- **backend/**
  - `Dockerfile` → Docker build για FastAPI.
  - `requirements.txt` → Python dependencies.
  - **app/**
    - `main.py` → FastAPI entrypoint (routes, API).
    - `database.py` → Σύνδεση & session με PostgreSQL.
    - `models.py` → Ορισμοί SQLAlchemy models (π.χ. Click).
    - `crud.py` → Λειτουργίες CRUD για clicks.

- **frontend/**
  - `Dockerfile` → Docker build για React (Vite).
  - `package.json` → Node dependencies & scripts.
  - `vite.config.js` → Config για Vite + React plugin.
  - `index.html` → Root HTML template.
  - **src/**
    - `main.jsx` → React entrypoint.
    - `App.jsx` → Κύριο UI component (κουμπιά, counters).

- **docker-compose.yml** → Ορίζει όλα τα services (frontend, backend, db, adminer).
- **.env.example** → Παράδειγμα αρχείου περιβάλλοντος (env vars).
- **README.md** → Documentation του project.


---

## ⚙️ Prerequisites
- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/)

---

## ▶️ Quickstart

Clone the repository:
```bash
git clone https://github.com/<username>/click-tracker.git
cd click-tracker
```

Copy the example environment file:
```
cp .env.example .env
```

Build and start the services:
```
docker compose up --build -d
```
| Service  | URL                                                      | Description           |
| -------- | -------------------------------------------------------- | --------------------- |
| Frontend | [http://localhost:5173](http://localhost:5173)           | React + Vite app      |
| Backend  | [http://localhost:8000](http://localhost:8000)           | FastAPI API           |
| Swagger  | [http://localhost:8000/docs](http://localhost:8000/docs) | API docs (Swagger UI) |
| Adminer  | [http://localhost:8081](http://localhost:8081)           | DB web interface      |

Example Usage

Open the frontend → click Button A or Button B

Each click is stored in PostgreSQL

View counts in the frontend

Check the database via Adminer (Server: db, User: appuser, Password: secretpassword, Database: appdb)

API endpoints:
```
# Get current counts
curl http://localhost:8000/api/counts

# Add click (Button A)
curl -X POST http://localhost:8000/api/clicks \
  -H "Content-Type: application/json" \
  -d '{"button":"A"}'

# Clear all clicks
curl -X DELETE http://localhost:8000/api/clicks/clear
```
🛠️ Tech Stack

Frontend: React + Vite

Backend: FastAPI, SQLAlchemy

Database: PostgreSQL

DB Admin: Adminer

Orchestration: Docker Compose

🧩 Next Steps / Improvements

Add authentication (users)

Add unit tests (Pytest, React Testing Library)

Deploy to cloud (e.g. AWS, GCP, Render)
