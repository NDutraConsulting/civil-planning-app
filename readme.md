# 🏗️ Infrastructure Cost & Revenue Planning App

A full-featured app for modeling infrastructure construction, estimating costs, revenue, and maintenance timelines. Supports planning for roads, solar, wind, housing, farms, research, and more — built with **Next.js (App Router)**, **PostgreSQL 16**, **Sequelize**, and **D3.js**.

---

## 🚀 Features

- Modular infrastructure categories & subcategories (e.g. labor, materials, land)
- Time-aware cost planning & phased construction
- Revenue & maintenance forecasts
- Editable timeline configurations (construction, revenue, maintenance)
- D3 visualizations & export tools
- Full user authentication with JWT & protected pages
- Snapshot management: save, rename, delete, compare, tag
- Dockerized app with PostgreSQL 16

---

## ⚙️ Local Development

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/infrastructure-cost-app.git
cd infrastructure-cost-app
```

### 2. Set up `.env` file

```env
DATABASE_URL=postgres://postgres:password@db:5432/infrastructure
JWT_SECRET=supersecret
```

### 3. Run with Docker Compose

```bash
docker-compose up --build
```

This starts:
- Next.js frontend at http://localhost:3000
- PostgreSQL 16 container

---

## 🧪 Mock Data

You can edit and test with:
- `data/mockAverages.json`
- `data/mockRevenue.json`
- `data/mockMaintenance.json`
- `data/defaultTimelineConfig.json`
- `data/mockUserInput.json`

---

## 👤 Authentication

Visit `/register` and `/login` to create a user session. Protected pages like `/projects`, `/timeline/*`, and `/projects/manage` require login.

---

## ☁️ Deployment on Linode

1. Create a new Ubuntu instance on Linode
2. SSH into the server
3. Install Docker + Docker Compose
4. Clone this repo and add `.env`
5. Run:

```bash
docker-compose up --build -d
```

---

## 📂 Project Structure

```
app/                     → App Router pages
components/              → React UI components
models/                  → Sequelize models
pages/api/               → Auth, project, preset routes
utils/                   → Revenue, maintenance, cost estimators
data/                    → Mock cost/revenue/config input
lib/                     → JWT session, Sequelize init
```

---

## 📝 License

MIT License

---

## 🙌 Contributing

Pull requests welcome. Submit issues for bugs or new features.