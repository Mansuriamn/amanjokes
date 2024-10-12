import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql';
import Path from 'path';

dotenv.config();  // Loads environment variables from the .env file

const app = express();
const _dirname=Path.resolve();

app.use(cors());
app.use(express.static(Path.join(_dirname,"/frontend/dist")));

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,      // Database host, usually 'localhost'
  user: process.env.DB_USER,      // MySQL username
  password: process.env.DB_PASS,  // MySQL password
  database: process.env.DB_NAME   // Name of the database
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Route to fetch jokes from the database
app.get('/api/jokes', (req, res) => {
  const query = 'SELECT * FROM jokes';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching jokes:', err);
      return res.status(500).send('Error fetching jokes');
    }
    res.json(results);  // Send the fetched jokes as the response
  });
});

app.get('*',(req,res)=>{
  res.sendFile(Path.resolve(_dirname,"frontend","dist","index.html"))
})

const port = process.env.PORT || 4000;  // Fallback to 4000 if PORT is not defined

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);  // Correctly logs the dynamic port
});
