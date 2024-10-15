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
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,      // Database host, usually 'localhost'
//   user: process.env.DB_USER,      // MySQL username
//   password: process.env.DB_PASS,  // MySQL password
//   database: process.env.DB_NAME   // Name of the database
// });

// Connect to the database
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err.stack);
//     return;
//   }
//   console.log('Connected to the MySQL database');
// });

// Route to fetch jokes from the database
// app.get('/api/jokes', (req, res) => {
//   const query = 'SELECT * FROM jokes';
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching jokes:', err);
//       return res.status(500).send('Error fetching jokes');
//     }
//     res.json(results);  // Send the fetched jokes as the response
//   });
// });

app.get('/api/jokes', (req, res) => {
  const jokes = [
    {
      "id": 1,
      "title": "Tech Support",
      "content": "Why did the computer go to the doctor? Because it had a virus!"
    },
    {
      "id": 2,
      "title": "Mathematician's Nightmare",
      "content": "Why was the equal sign so humble? Because it knew it wasn't less than or greater than anyone else."
    },
    {
      "id": 3,
      "title": "Programmer's Coffee",
      "content": "Why do programmers prefer dark mode? Because the light attracts bugs!"
    },
    {
      "id": 4,
      "title": "Web Developer's Problem",
      "content": "Why did the web developer go broke? Because he lost his domain in a bet!"
    },
    {
      "id": 5,
      "title": "WiFi Struggles",
      "content": "Why did the WiFi break up with the laptop? Because it found a better connection."
    },
    {
      "id": 6,
      "title": "JS Developer's Pet",
      "content": "Why did the JavaScript developer keep going to therapy? Because he had too many 'null' relationships!"
    },
    {
      "id": 7,
      "title": "Array Jokes",
      "content": "Why was the JavaScript array so confident? Because it knew it had a lot of potential!"
    },
    {
      "id": 8,
      "title": "Object-Oriented",
      "content": "What did the object say to the class? 'You complete me!'"
    },
    {
      "id": 9,
      "title": "Database Humor",
      "content": "Why did the SQL query go to therapy? It had too many 'inner joins'!"
    },
    {
      "id": 10,
      "title": "AI's Mistake",
      "content": "Why did the AI feel embarrassed? It kept repeating itself!"
    }
  ];
  
  res.json(jokes);  // Send the jokes array as the response
});


app.get('*',(req,res)=>{
  res.sendFile(Path.resolve(_dirname,"frontend","dist","index.html"))
})

const port = process.env.PORT || 4000;  // Fallback to 4000 if PORT is not defined

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);  // Correctly logs the dynamic port
});
