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
  - `init.sql` → SQL script for creating the `clicks` table.

- **backend/**
  - `Dockerfile` → Docker build for FastAPI.
  - `requirements.txt` → Python dependencies.
  - **app/**
    - `main.py` → FastAPI entrypoint (routes, API).
    - `database.py` → Connection & session handling with PostgreSQL.
    - `models.py` → SQLAlchemy models (e.g., Click).
    - `crud.py` → CRUD operations for clicks.

- **frontend/**
  - `Dockerfile` → Docker build for React (Vite).
  - `package.json` → Node.js dependencies & scripts.
  - `vite.config.js` → Configuration for Vite + React plugin.
  - `index.html` → Root HTML template.
  - **src/**
    - `main.jsx` → React entrypoint.
    - `App.jsx` → Main UI component (buttons & counters).

- **docker-compose.yml** → Defines all services (frontend, backend, db, adminer).
- **.env.example** → Example environment variables file.
- **README.md** → Project documentation.


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

---

Example Usage

Open the frontend → click Button A or Button B

Each click is stored in PostgreSQL

View counts in the frontend

Check the database via Adminer (Server: db, User: appuser, Password: secretpassword, Database: appdb)

---

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

---
🛠️ Tech Stack

Frontend: React + Vite

Backend: FastAPI, SQLAlchemy

Database: PostgreSQL

DB Admin: Adminer

Orchestration: Docker Compose

---

🧩 Next Steps / Improvements

Add authentication (users)

Add unit tests (Pytest, React Testing Library)

Deploy to cloud (e.g. AWS, GCP, Render)

---

## 🚀 Kubernetes (minikube)

Εκτός από το `docker compose`, η εφαρμογή μπορεί να τρέξει και σε Kubernetes με χρήση των manifests που βρίσκονται στον φάκελο [`k8s/`](./k8s).

### Προαπαιτούμενα
- Εγκατεστημένο [minikube](https://minikube.sigs.k8s.io/docs/start/)
- Ενεργοποιημένο ingress addon:
  ```bash
  minikube addons enable ingress
Βήματα εκτέλεσης
Χτίσε τα images μέσα στο Docker του minikube:

```bash
eval $(minikube docker-env)
docker build -t click-backend:local ./backend
docker build -t click-frontend:local ./frontend
```

Εφάρμοσε τα manifests:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl -n click-tracker apply -f k8s/db-init-configmap.yaml -f k8s/postgres-secret.yaml -f k8s/postgres-pvc.yaml
kubectl -n click-tracker apply -f k8s/postgres-deploy.yaml -f k8s/backend-deploy.yaml -f k8s/frontend-deploy.yaml -f k8s/adminer-deploy.yaml -f k8s/ingress.yaml
```
Τρέξε tunnel για το Ingress:

```bash
minikube tunnel
```
(προαιρετικό) Hosts entry αν χρειαστεί:

```bash
MINI_IP=$(minikube ip)
echo "$MINI_IP click.localtest.me adminer.localtest.me" | sudo tee -a /etc/hosts
```
---
Διαθέσιμα URLs
[Frontend (React app)](http://click.localtest.me)

[Backend API](http://click.localtest.me/api/counts), [](http://click.localtest.me/api/clicks)

[Swagger (FastAPI docs)](http://click.localtest.me/docs)

[Adminer (DB UI)](http://adminer.localtest.me)

---

Υπενθύμιση
DB credentials:

```
makefile
user: appuser
password: secretpassword
db: appdb
host (K8s): postgres
Ο πίνακας clicks δημιουργείται αυτόματα μέσω ConfigMap (db-init-configmap.yaml).
```
