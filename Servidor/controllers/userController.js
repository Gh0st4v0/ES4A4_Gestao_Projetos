// userController.js
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const getAllUsers = (req, res) => {
  const db = req.db;

  console.log('Received request in getAllUsers...');

  userModel.getAllUsers(db, (err, users) => {
    if (err) {
      console.error('Error in getAllUsers controller:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    console.log('Sending response in getAllUsers controller:', users);
    res.json(users);
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.getUserByUsername(req.db, username);

    if (user && user.pwd === password) {
      // Successful login
      const token = jwt.sign({ userId: user.userID, username: user.userName, userLevel: user.userLevel}, 'process.env.JWT_SECRET', {
        expiresIn: '1h', // You can adjust the expiration time
      });
      res.status(200).json({ token });
    } else {
      // Incorrect username or password
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllUsers,
  login,
};
