import express from 'express';
import mysql from 'mysql2/promise'; // Use mysql2, not mysql2/promise
import cors from 'cors';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
const port = 3081;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true
}));
app.use(cookieParser());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// JWT Secret
// const JWT_SECRET = process.env.JWT_SECRET;

// User sign-in route
app.post('/sign_in', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // // Generate JWT
    // const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    // res.status(200).json({ message: 'Sign-in successful', token });
    res.status(200).json({ message: 'Sign-in successful'});
  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User registration route
app.post('/register', async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await pool.query('INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)', [name, email, phone, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});