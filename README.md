# 🍽️ YumRecipe - Full Stack Food Recipe Platform

A responsive, full-stack food recipe web application where users can explore Indian recipes, register/login, and manage their favorite dishes. Built with **React.js, Tailwind CSS, Node.js, Express.js, and MySQL**.

> 🚀 Built as part of my MCA journey at Maulana Azad National Institute of Technology (MANIT), Bhopal. Designed to scale and customizable for real-world deployment.

---

## 🌐 Live Demo

**Coming soon...** (You can add your Netlify/Vercel link here once deployed)

---

## 📁 Repository Structure

```bash
food_website/
├── Client/        # React Frontend
├── server/        # Node.js + Express Backend
```

---

## 💻 Tech Stack

| Frontend          | Backend             | Database     | Others            |
|------------------|---------------------|--------------|-------------------|
| React.js          | Node.js             | MySQL        | REST APIs         |
| Tailwind CSS      | Express.js          |              | Axios, JWT        |
| React Router DOM  | bcrypt, dotenv      |              | cookie-parser     |

---

## ✨ Features

- ✅ **User Registration & Login**
- ✅ **JWT Authentication with Cookies**
- ✅ **Browse Recipe Cards**
- ✅ **Responsive UI (Mobile + Desktop)**
- ✅ **Backend API Integration**

---

## 🔐 Authentication Flow

- Secure login using **JWT tokens**
- Token stored in cookies for protected routes
- Middleware to verify authentication status

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/anchalkum2630/food_website
cd food_website
```

### 2. Frontend Setup (`Client`)

```bash
cd Client
npm install
npm run dev   # or npm start
```

### 3. Backend Setup (`server`)

```bash
cd server
npm install
node index.js
```

✅ Create a `.env` file in `server/`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
JWT_SECRET=your_jwt_secret
```

---

## 📸 Upcoming Enhancements

- 🔄 Upload Recipe Images using `Multer` & `Cloudinary`
- 💬 Add Comments/Reviews per Recipe
- 📊 Admin Dashboard with analytics
- 🔍 Search & Filter Recipes
- 🌍 Deployment on Netlify + Render/Vercel

---

## 👩‍💻 Developer

**Anchal Kumari**  
👩 MCA @ MANIT Bhopal  
🔗 [LinkedIn](https://www.linkedin.com/in/anchalkumari2630/)  
💻 Passionate about Full Stack & Open Source  
📫 anchalkumari2630@gmail.com

---

## ⭐ If you like this project, don't forget to give it a star!
