import express from 'express';
import mysql from 'mysql2/promise'; // Use mysql2, not mysql2/promise
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
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

const SECRET_KEY = "Access";
const REFRESH_SECRET_KEY = "Refresh";
// Generate tokens
const generateAccessToken = (user) => jwt.sign(user, SECRET_KEY, { expiresIn: "5000" });
const generateRefreshToken = (user) => jwt.sign(user, REFRESH_SECRET_KEY,{ expiresIn: "1d" });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'Token missing' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user; // Attach decoded token to request
    next();
  });
}


//refresh token
app.post('/token', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log("refresh token : "+refreshToken)
  // Check if the refresh token is provided
  if (!refreshToken) {
    return res.sendStatus(401); // Unauthorized
  }

  try {
    // Verify if the refresh token exists in the database
    const [results] = await pool.query(
      'SELECT * FROM refresh_tokens WHERE refresh_token = ?',
      [refreshToken]
    );
    console.log(results.length)
    // If the token doesn't exist, deny access
    if (results.length === 0) {
      return res.sendStatus(403); // Forbidden
    }

    // Verify the refresh token and decode the user details
    jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      // Extract `user.id` and other details from the token payload
      const newAccessToken = generateAccessToken({
        id: user.id,
        username: user.username,
        token:"Access"
      });

      // Respond with the new access token
      res.json({ token: newAccessToken });
    });
  } catch (error) {
    console.error('Error during token refresh:', error);
    return res.sendStatus(500); // Internal Server Error
  }
});


//detail of user | completed
app.get('/api/userprofile',authenticateToken, async (req, res) => {
  const UserPhone = req.user.id;
  console.log("userprofile: "+UserPhone);
   if (!UserPhone || UserPhone.trim() === '') {
    return res.status(400).json({ error: 'UserPhone is required' });
  }

  try {
    // SQL query to get liked recipes for a specific user
    const query = `
      SELECT *
      FROM users
      WHERE userid = ? 
    `;

    // Execute the query with the UserPhone as a parameter
    const [results] = await pool.query(query, [UserPhone]);
    console.log(results[0]);
    // Respond with the data and count
    res.json(results[0]);
  } catch (err) {
    console.error('Error in profile :', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//to get all the recipe at first time |completed
app.get('/api/recipes', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM recipe LIMIT 200');
    console.log("for first arrive")
    res.json(results);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//to get all the saved recipe | completed
app.get('/api/recipes/liked',authenticateToken, async (req, res) => {
  const UserPhone = req.user.id; // Get the user phone or ID from query parameters

  if (!UserPhone || UserPhone.trim() === '') {
    return res.status(400).json({ error: 'UserPhone is required' });
  }

  try {
    // SQL query to get liked recipes for a specific user
    const query = `
      SELECT f.*
      FROM recipe f
      INNER JOIN savedrecipe sf ON f.id = sf.id
      WHERE sf.userid = ? 
    `;

    // Execute the query with the UserPhone as a parameter
    const [results] = await pool.query(query, [UserPhone]);

    // Respond with the data and count
    res.json({
      count: results.length,
      data: results,
    });
  } catch (err) {
    console.error('Error fetching liked recipes:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



//to get all search item before signin
app.get('/api/recipes/search/:query?', async (req, res) => {
  const { query } = req.params; // Get the search term from the URL parameter
  console.log("for first user to see by query");

  try {
    let searchQuery;
    let queryParams = [];

    if (!query || query.trim() === '') {
      // If the query is empty, return all recipes
      searchQuery = `
        SELECT * 
        FROM recipe 
        LIMIT 100
      `;
    } else {
      // If the query is not empty, search for recipes matching the query
      searchQuery = `
        SELECT * 
        FROM recipe 
        WHERE name LIKE ? 
        LIMIT 100
      `;
      // Use wildcards for partial matching
      const searchPattern = `%${query}%`;
      queryParams = [searchPattern];
    }

    // Execute the query
    const [results] = await pool.query(searchQuery, queryParams);

    // Send the results as the response
    res.json(results);
  } catch (error) {
    console.error('Error during search:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//to search recipe after signin
app.get('/api/recipes/UserSearch/:query?',authenticateToken, async (req, res) => {
  const { query } = req.params; // Get the search term from the URL parameter (optional)
  const  UserPhone  = req.user.id; // Get UserPhone from the query parameters
  console.log("for registered user "+query +"  "+UserPhone)
  // Check if UserPhone is missing
  if (!UserPhone || UserPhone.trim() === '') {
    return res.status(400).json({ error: 'UserPhone is required' });
  }

  try {
    // If no query is provided, set a default search pattern (match all)
    const searchPattern = query ? `%${query}%` : '%';

    // Construct the SQL query to fetch recipes that are not saved by the user
    const searchQuery = `
      SELECT f.* 
      FROM recipe f
      LEFT JOIN savedrecipe sf ON f.id = sf.id AND sf.userid = ?
      WHERE f.name LIKE ? AND sf.id IS NULL LIMIT 200
    `;

    // Log the query for debugging purposes
    console.log(`Executing search query with: ${searchPattern} for UserPhone: ${UserPhone}`);

    // Execute the query with the UserPhone and search pattern
    const [results] = await pool.query(searchQuery, [UserPhone, searchPattern]);

    // Return the search results
    res.json(results);
  } catch (error) {
    console.error('Error during search:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//to see the click item
app.get('/api/recipes/search/detail/:query', async (req, res) => {
  const { query } = req.params; // Get the search term from the URL parameter
  
  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'Invalid search query' });
  }

  try {
    // Construct the search query to match the keyword in name, description, or ingredients
    const searchQuery = `
      SELECT * 
      FROM recipe 
      WHERE id LIKE ? 
    `;

    // Use wildcards for partial matching
    // const searchPattern = `%${query}%`;

    // Execute the query with the search term
    const [results] = await pool.query(searchQuery, [query]);
    // Return the search results
    res.json(results);
  } catch (error) {
    console.error('Error during search:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//insert saved recipe to cookbook | complete
app.post('/api/recipes/addlike',authenticateToken, async (req, res) => {
  const  {id} = req.body; // Extract id and UserPhone from the request body
  const UserPhone=req.user.id;
  if (!id || !UserPhone) {
    return res.status(400).json({ error: 'Both id and UserPhone are required' });
  }

  try {
    // Check if the recipe is already saved for the user
    const [existingEntry] = await pool.execute(
      'SELECT * FROM savedrecipe WHERE userid = ? AND id = ?',
      [UserPhone, id]
    );

    if (existingEntry.length > 0) {
      return res.status(400).json({ error: 'Recipe already saved by this user' });
    }

    // Insert the recipe into the savedrecipe table
    const [insertResult] = await pool.execute(
      'INSERT INTO savedrecipe (userid, id) VALUES (?, ?)',
      [UserPhone, id]
    );

    if (insertResult.affectedRows > 0) {
      console.log("complete saved recipe");
      return res.json({ message: 'Recipe successfully saved for the user' });
    } else {
      return res.status(500).json({ error: 'Failed to save the recipe' });
    }
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//to delete liked recipe | complete
app.delete('/api/recipes/unlike', authenticateToken, async (req, res) => {
  const { id } = req.body;
  const UserPhone = req.user.id;

  console.log(`Recipe ID: ${id}, UserPhone: ${UserPhone}`);

  if (!id || !UserPhone) {
    return res.status(400).json({ error: 'Recipe ID and UserPhone are required' });
  }

  try {
    // Check if the saved recipe exists
    const [existingEntry] = await pool.execute(
      'SELECT * FROM savedrecipe WHERE id = ? AND userid = ?',
      [id, UserPhone]
    );

    if (existingEntry.length === 0) {
      return res.status(404).json({ error: 'Saved recipe not found for this user' });
    }

    // Delete the recipe
    const [result] = await pool.execute(
      'DELETE FROM savedrecipe WHERE id = ? AND userid = ?',
      [id, UserPhone]
    );

    if (result.affectedRows > 0) {
      return res.json({ message: 'Recipe successfully removed from saved recipes' });
    } else {
      return res.status(500).json({ error: 'Failed to remove the recipe' });
    }
  } catch (error) {
    console.error('Error removing recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// User sign-in route | complete
app.post('/sign_in', async (req, res) => {
  const { phone, password } = req.body;
  // console.log(phone)
  try {
    console.log(phone)
    const [rows] = await pool.query('SELECT * FROM users WHERE userid = ?', [phone]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];
    // const passwordMatch = await bcrypt.compare(password, user.password);

    if (password!=user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // // Generate JWT
    const accessToken = generateAccessToken({ id: user.userid, username: user.name, token:"Access" });
    const refreshToken = generateRefreshToken({ id: user.userid, username: user.name, token:"refresh" });
    await pool.query(
        "INSERT INTO refresh_tokens (refresh_token, userid) VALUES (?, ?)",
        [refreshToken, user.userid]);
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false,path: '/',maxAge: 7 * 24 * 60 * 60 * 1000,});
    console.log("refreshtoken first : "+refreshToken+" | cookiee refresh token : "+req.cookies.refreshToken)
    res.status(200).json({ name:user.name,phone:user.userid,token:accessToken});
  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// User registration route | complete
app.post('/register', async (req, res) => {
  const { name, email, phone, password,gender } = req.body;
  
  if (!name || !email || !phone || !password || !gender) {
    console.log(name+email+phone+password+gender);
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE userid = ?', [phone]);
    console.log(rows[0]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // const hashedPassword = await bcrypt.hash(password, 12);

    await pool.query('INSERT INTO users (userid, name, email, gender, password) VALUES (?, ?, ?, ?, ?)', [phone,name, email,gender,password]);
 
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