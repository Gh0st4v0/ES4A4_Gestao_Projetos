// userController.js
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const getAllUsers = (req, res) => {
  const db = req.db;

  userModel.getAllUsers(db, (err, users) => {
    if (err) {
      console.error('Error in getAllUsers controller:', err);
      return res.status(500).json({ error: 'Database error' });
    }
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

const getUserByID = async (req, res) =>{
  const userID = req.params.userID
  console.log(userID)
  const user = await userModel.getUserByID(req.db, userID);
  res.status(200).json(user)
}

const updateUserInformation = async (req, res) =>{
  const userID = req.params.userID;
  const { fieldToUpdate, updatedValue } = req.body;
  console.log('valores recebidos field e value',fieldToUpdate,updatedValue)
  try {
    // Call the model method to update a specific field
    const isUpdated = await userModel.updateUserInformation(req.db, userID, fieldToUpdate, updatedValue);

    if (isUpdated) {
      return res.status(200).json({ message: `User ${fieldToUpdate} updated successfully` });
    } else {
      return res.status(404).json({ error: 'User not found or not updated' });
    }
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


const deleteUser = async (req, res) => {
    const { userLevel, masterUserID } = req.body; // User making the request (passed in the request body)
    const { userID } = req.params; // User ID to be deleted (passed in the URL parameters)
    console.log('id recebido no controller',masterUserID)
    try {
      const userToDelete = await userModel.getUserByID(req.db, userID);

      if (!userToDelete) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (userLevel === 'master' && userToDelete.userLevel !== 'master') {
        const result = await userModel.deleteUser(req.db, userID, masterUserID);

        if (result) {
          return res.status(200).json({ message: 'User deleted successfully' });
        } else {
          return res.status(500).json({ error: 'Failed to delete user' });
        }
      } else {
        return res.status(403).json({ error: 'Unauthorized or cannot delete a master user' });
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  const createUser = async (req, res) =>{
    try {
      const {userName, fullName, email, jobRole, userLevel, pwd} = req.body
      if (!userName || !fullName || !email || !jobRole || !userLevel || !pwd) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const response = await userModel.createUser(req.db, userName, fullName, email, jobRole, userLevel, pwd)
      return res.status(200).json(response)
    } catch (error) {
      console.error('Error creating user:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });    }
  }


module.exports = {
  getAllUsers,
  login,
  getUserByID,
  updateUserInformation,
  deleteUser,
  createUser
};
