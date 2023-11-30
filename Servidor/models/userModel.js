// userModel.js

// Assuming db is a MySQL connection pool
const getAllUsers = (db, callback) => {
    db.query('SELECT userID, userName, fullName, email, jobRole, userLevel FROM users', (err, results) => {
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

  const getUserByID = async (db, userID) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT userID, userName, fullName, email, jobRole, userLevel FROM users WHERE userID = ?', [userID], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]); // Assuming usernames are unique
        }
      });
    });
  }

  const updateUserInformation = async(db, userID, fieldToUpdate, updatedValue) =>{
    try {
      const result = await db.promise().query(
        `UPDATE users SET ${fieldToUpdate}=? WHERE userID=?`,
        [updatedValue, userID]
      );
  
      return result; // Check if the update was successful
    } catch (error) {
      console.error('Error updating user:', error.message);
      throw error;
    }

  }

  const deleteUser = async (db, userID, masterUserID) => {
    try {
      // Check if the user is the only one assigned to any project
      const [projectsResult] = await db.promise().query('SELECT projectID FROM user_projects WHERE userID = ?', [userID]);
  
      if (projectsResult.length > 0) {
        // Iterate through projects and check if the user is the only one assigned
        for (const projectRow of projectsResult) {
          const projectID = projectRow.projectID;
  
          const [assignedUsersResult] = await db.promise().query('SELECT COUNT(*) AS userCount FROM user_projects WHERE projectID = ?', [projectID]);
  
          const userCount = assignedUsersResult[0].userCount;
  
          if (userCount === 1) {
            // If the user is the only one assigned, assign the master user to the project
            await db.promise().query('INSERT INTO user_projects (userID, projectID) VALUES (?, ?)', [masterUserID, projectID]);
          }
        }
      }
  
      // Delete entries from junction tables
      await db.promise().query('DELETE FROM user_tasks WHERE userID = ?', [userID]);
      await db.promise().query('DELETE FROM user_projects WHERE userID = ?', [userID]);
  
      // Delete the user from the main users table
      const [result] = await db.promise().query('DELETE FROM users WHERE userID = ?', [userID]);
  
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting user:', error.message);
      throw error;
    }
  };
  
  module.exports = { deleteUser };
  
  
  module.exports = {
    getAllUsers,
    getUserByUsername,
    getUserByID,
    updateUserInformation,
    deleteUser
  };
  