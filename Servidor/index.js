const express = require('express');
const http = require('http');
const mysql = require('mysql2');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes')

const app = express();
const server = http.createServer(app);
const PORT = 3001;

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Gugu135teste@',
  database: process.env.DB_NAME || 'abc_hub',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Middleware to make the database pool accessible in every route
app.use((req, res, next) => {
  req.db = pool;
  next();
});

app.use(bodyParser.json());
app.use(cors())


// Routes
app.use(userRoutes, projectRoutes);
app.use(express.json());


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });


const io = socketIO(server, { cors: { origin: 'http://localhost:5173' } });
server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
