// userModel.js

// Assuming db is a MySQL connection pool
const getAllUsers = (db, callback) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  };
  
  const getUserByUsername = async (db, username) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE userName = ?', [username], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]); // Assuming usernames are unique
        }
      });
    });
  };
  
  module.exports = {
    getAllUsers,
    getUserByUsername, // Make sure to export the function
  };
  