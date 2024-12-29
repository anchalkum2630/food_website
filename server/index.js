import express from 'express';
import mysql from 'mysql2/promise'; // Use mysql2, not mysql2/promise
import cors from 'cors';
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

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


//to get all the unliked recipe
// app.get('/api/recipes', async (req, res) => {
//   try {
//     const [results] = await pool.query('SELECT * FROM recipe WHERE Liked=0 LIMIT 100');
//     res.json(results);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

app.get('/api/recipes', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM recipe LIMIT 200');
    console.log("alltype of")
    res.json(results);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//to get liked recipe
// app.get('/api/recipes/liked', async (req, res) => {
//   try {
//     const [results] = await pool.query('SELECT * FROM recipe WHERE Liked=1');
//     res.json({
//       count:results.length,
//       data:results,
//     });
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });


app.get('/api/recipes/liked', async (req, res) => {
  const { UserPhone } = req.query; // Get the user phone or ID from query parameters

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



//to get all search item
app.get('/api/recipes/search/:query', async (req, res) => {
  const { query } = req.params; // Get the search term from the URL parameter
  console.log("why this happen")
  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'Invalid search query' });
  }

  try {
    // Construct the search query to match the keyword in name, description, or ingredients
    const searchQuery = `
      SELECT * 
      FROM recipe 
      WHERE name LIKE ? LIMIT 100
    `;

    // Use wildcards for partial matching
    const searchPattern = `%${query}%`;

    // Log the query for debugging purposes
    // console.log(`Executing search query with: ${searchPattern}`);

    // Execute the query with the search term
    const [results] = await pool.query(searchQuery, [searchPattern]);
    // If no results are found, return a 404
    // if (results.length === 0) {
    //   return res.status(404).json({ error: 'No recipes found' });
    // }

    // Return the search results
    console.log(results)
    res.json(results);
  } catch (error) {
    console.error('Error during search:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//to search recipe with the userphone
app.get('/api/recipes/UserSearch/:query?', async (req, res) => {
  const { query } = req.params; // Get the search term from the URL parameter (optional)
  const { UserPhone } = req.query; // Get UserPhone from the query parameters

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


//to update liked recipe
// app.put('/api/recipes/addlike/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     // First, check the current liked status
//     const [currentStatus] = await pool.execute('SELECT liked FROM recipe WHERE id = ?', [id]);
    
//     if (currentStatus.length > 0) {
//       const currentLiked = currentStatus[0].liked;

//       // Only update if the current liked status is 0
//       if (currentLiked === 0) {
//         const [result] = await pool.execute('UPDATE recipe SET liked = ? WHERE id = ?', [1, id]);
        
//         if (result.affectedRows > 0) {
//           return res.json({ message: 'Recipe liked status updated to 1' });
//         } else {
//           return res.status(404).json({ error: 'Recipe not found' });
//         }
//       } else {
//         return res.status(400).json({ error: 'Recipe already liked' });
//       }
//     } else {
//       return res.status(404).json({ error: 'Recipe not found' });
//     }
//   } catch (error) {
//     console.error('Error updating recipe:', error);
//     res.status(500).json({ error: 'Error updating recipe' });
//   }
// });

app.post('/api/recipes/addlike', async (req, res) => {
  const { id, UserPhone } = req.body; // Extract id and UserPhone from the request body

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
      return res.json({ message: 'Recipe successfully saved for the user' });
    } else {
      return res.status(500).json({ error: 'Failed to save the recipe' });
    }
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//to update unliked recipe
app.delete('/api/recipes/unlike/:id/:UserPhone', async (req, res) => {
  const { id, UserPhone } = req.params;

  try {
    // Check if the saved recipe exists for the given user and recipe ID
    const [existingEntry] = await pool.execute(
      'SELECT * FROM savedrecipe WHERE id = ? AND userid = ?',
      [id, UserPhone]
    );

    if (existingEntry.length > 0) {
      // If the entry exists, delete it
      const [result] = await pool.execute(
        'DELETE FROM savedrecipe WHERE id = ? AND userid = ?',
        [id, UserPhone]
      );

      if (result.affectedRows > 0) {
        return res.json({ message: 'Recipe successfully unliked and removed from saved recipes' });
      } else {
        return res.status(500).json({ error: 'Failed to unlike the recipe' });
      }
    } else {
      return res.status(404).json({ error: 'Saved recipe not found for this user' });
    }
  } catch (error) {
    console.error('Error unliking recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// User sign-in route
app.post('/sign_in', async (req, res) => {
  const { phone, password } = req.body;
  console.log(phone)
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
    // const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    // res.status(200).json({ message: 'Sign-in successful', token });
    res.status(200).json({ name:user.name,phone:user.userid});
  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User registration route
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