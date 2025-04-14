# 🍽️ YumRecipe – Version 1 | Indian Recipe Web App

**YumRecipe** is a responsive full-stack web application that allows users to browse Indian recipes, register/login securely, and save their favorite dishes for later. Built using **React.js**, **Tailwind CSS**, **Redux Toolkit**, **Node.js**, **Express.js**, **Prisma**, and **PostgreSQL**, this project reflects a real-world scalable system developed during my MCA at **MANIT Bhopal**.

> 🔥 Version 1 focuses entirely on the **User experience**: exploring recipes, saving favorites, and secure authentication.

---

## 🌐 Live Demo

**Coming Soon...**  
_(Will be deployed using Vercel (Frontend) + Render/Railway (Backend))_

---

## 🧱 Tech Stack

| Layer          | Technology                                   |
|----------------|----------------------------------------------|
| Frontend       | React.js, Tailwind CSS, Redux Toolkit, Axios |
| Backend        | Node.js, Express.js, JWT, cookie-parser      |
| Database       | PostgreSQL (via Prisma ORM)                  |
| Tools/Infra    | Prisma, Docker, pgAdmin, Prisma Studio       |

---

## 📁 Project Structure

```bash
yumrecipe/
├── client/               # React Frontend
│   ├── components/       # UI components
│   ├── pages/            # Login, Register, Recipes, Saved
│   └── store/            # Redux Toolkit setup
│
├── server/               # Node.js Backend
│   ├── controllers/      # Logic for users, recipes
│   ├── routes/           # Auth & Recipe APIs
│   ├── middlewares/      # Auth middleware
│   ├── prismaClient.js   # Prisma DB connection
│   └── index.js          # Main app file
│
├── prisma/               # Prisma Schema & Migrations
│   ├── schema.prisma
│   └── migrations/
│
├── docker-compose.yml    # PostgreSQL container setup
├── .env                  # DB and JWT secrets
└── pg_data/              # PostgreSQL volume (auto-generated)
```

---

## ✨ Features – Version 1

- ✅ Secure user registration & login using JWT + cookies
- ✅ Browse a curated list of Indian recipes
- ✅ Save (favorite) recipes for later
- ✅ Responsive UI (mobile & desktop friendly)
- ✅ Redux Toolkit for scalable state management
- ✅ Backend REST API with authentication middleware
- ✅ PostgreSQL setup via Docker & Prisma ORM

---

## 🔐 Auth Flow (JWT + Cookies)

1. User logs in → token is generated
2. Token is stored in HTTP-only cookie
3. Protected routes verify token server-side
4. Saved recipes are only visible to logged-in users

---

## ⚙️ Getting Started

### 🔽 Clone the Project

```bash
git clone https://github.com/anchalkum2630/yumrecipe
cd yumrecipe
```

---

### 🐘 Start PostgreSQL via Docker

```bash
docker-compose up -d
```

---

### 🔌 Backend Setup

```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

✅ Create a `.env` file in `server/`:

```env
DATABASE_URL="postgresql://anchal:anchal123@localhost:5432/yumrecipe"
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

### 🌐 Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

### 🧪 Test in Browser

- Home: `http://localhost:3000`
- Login/Register
- Browse Recipes
- Add to Saved

---

## 🧱 Prisma Workflow

- Define schema in `prisma/schema.prisma`
- Apply with:
```bash
npx prisma migrate dev --name migration_name
```
- View DB using Prisma Studio:
```bash
npx prisma studio
```

---

## 📍 Upcoming Version 2 (Preview)

- 👨‍🍳 Chef registration, availability, and order assignment
- 📍 Live location tracking using Redis + WebSocket
- 🛒 Cart-based multi-recipe ordering
- 💳 Online payment integration (Pay Now / Pay Later)
- 📊 Admin dashboard (feedback, complaints)
- 🌐 Fully containerized deployment (Docker + CI/CD)

---

## 👩‍💻 Author

**Anchal Kumari**  
🎓 MCA @ MANIT Bhopal  
🔗 [LinkedIn](https://www.linkedin.com/in/anchalkumari2630/)  
📧 anchalkumari2630@gmail.com

---

## ⭐ Show Your Support

If you like this project:

- ⭐ Star the repo
- 🍴 Fork it
- 🔁 Share it
- 🚀 Stay tuned for **Version 2**!



//docker setup
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: yumrecipe-postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: yumrecipe
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    container_name: yumrecipe-pgadmin
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@pg.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"
    depends_on:
      - postgres

volumes:
  pgdata:
