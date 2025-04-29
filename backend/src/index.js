// src/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import commonRoutes from './routes/commonRoutes.js';
import './config/passportConfig.js'; // 🔥 THIS IS CRITICAL

dotenv.config();

const app = express();
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only localhost:5173
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // You can specify the allowed methods
  credentials: true, // Allow cookies to be sent with the request
};
app.use(cors(corsOptions));
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

app.use('/api/auth',commonRoutes);

app.get('/', (req, res) => {
  res.send('YumRecipe backend is running!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
