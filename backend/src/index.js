// src/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import customerRoutes from './routes/customerRoutes.js';
import commonRoutes from './routes/commonRoutes.js';
import './config/passportConfig.js'; // 🔥 THIS IS CRITICAL

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session())

app.use('/api/customer', customerRoutes);
app.use('/api/auth',commonRoutes);

app.get('/', (req, res) => {
  res.send('YumRecipe backend is running!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
