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


//to get all the unliked recipe
app.get('/api/recipes', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM recipe WHERE Liked=0 LIMIT 100');
    res.json(results);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//to get liked recipe
app.get('/api/recipes/liked', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM recipe WHERE Liked=1');
    res.json({
      count:results.length,
      data:results,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//to get all search item
app.get('/api/recipes/search/:query', async (req, res) => {
  const { query } = req.params; // Get the search term from the URL parameter
  
  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'Invalid search query' });
  }

  try {
    // Construct the search query to match the keyword in name, description, or ingredients
    const searchQuery = `
      SELECT * 
      FROM recipe 
      WHERE name LIKE ? AND Liked=0
    `;

    // Use wildcards for partial matching
    const searchPattern = `%${query}%`;

    // Log the query for debugging purposes
    // console.log(`Executing search query with: ${searchPattern}`);

    // Execute the query with the search term
    const [results] = await pool.query(searchQuery, [searchPattern]);
    // If no results are found, return a 404
    if (results.length === 0) {
      return res.status(404).json({ error: 'No recipes found' });
    }

    // Return the search results
    res.json(results);
  } catch (error) {
    console.error('Error during search:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//to update liked recipe
app.put('/api/recipes/addlike/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // First, check the current liked status
    const [currentStatus] = await pool.execute('SELECT liked FROM recipe WHERE id = ?', [id]);
    
    if (currentStatus.length > 0) {
      const currentLiked = currentStatus[0].liked;

      // Only update if the current liked status is 0
      if (currentLiked === 0) {
        const [result] = await pool.execute('UPDATE recipe SET liked = ? WHERE id = ?', [1, id]);
        
        if (result.affectedRows > 0) {
          return res.json({ message: 'Recipe liked status updated to 1' });
        } else {
          return res.status(404).json({ error: 'Recipe not found' });
        }
      } else {
        return res.status(400).json({ error: 'Recipe already liked' });
      }
    } else {
      return res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Error updating recipe' });
  }
});

//to update unliked recipe
app.put('/api/recipes/unlike/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // First, check the current liked status
    const [currentStatus] = await pool.execute('SELECT liked FROM recipe WHERE id = ?', [id]);
    
    if (currentStatus.length > 0) {
      const currentLiked = currentStatus[0].liked;

      // Only update if the current liked status is 0
      if (currentLiked === 1) {
        const [result] = await pool.execute('UPDATE recipe SET liked = ? WHERE id = ?', [0, id]);
        
        if (result.affectedRows > 0) {
          return res.json({ message: 'Recipe liked status updated to 0' });
        } else {
          return res.status(404).json({ error: 'Recipe not found' });
        }
      } else {
        return res.status(400).json({ error: 'Recipe already liked' });
      }
    } else {
      return res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Error updating recipe' });
  }
});

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