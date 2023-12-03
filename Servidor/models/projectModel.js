// Function to get all projects
const getAllProjects = async (db) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM projects';
  
      db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  const getProjectsByUserId = (db, userId, callback) => {
    db.query('SELECT projects.* FROM projects INNER JOIN user_projects ON projects.projectID = user_projects.projectID WHERE user_projects.userID = ?', [userId], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  };

  const getAllTasks = async (db) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM tasks';
  
      db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  const getTasksByUserId = async (db, userID, callback) =>{
    db.query('SELECT tasks.* FROM tasks INNER JOIN user_tasks ON tasks.taskID = user_tasks.taskID WHERE user_tasks.userID = ?',[userID], (err, results) =>{
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    })
  }

  const getTasksByProjectID = async (db, projectID) =>{
    try {
      const [result] = await db.promise().query('SELECT * FROM tasks WHERE projectID = ?',[projectID])
      return result
    } catch (error) {
      console.error('Error fetching tasks')
      throw error
    }    
  }

  const createProject = async (db, userID, projectName, projectDescription, projectStartDate, projectEndDate, userIDs) => {
    try {
      // Use a raw SQL query to insert a new project into the database
      const [result] = await db.promise().query(
        'INSERT INTO projects (projectName, projectDescription, projectStartDate, projectEndDate) VALUES (?, ?, ?, ?)',
        [projectName, projectDescription, projectStartDate, projectEndDate]
      );

      const [rows] = await db.promise().query(
        'SELECT projectID FROM projects ORDER BY projectID DESC LIMIT 1;'
      );
      
      const projectID = rows[0].projectID;
      
      await db.promise().query(
        'INSERT INTO user_projects (userID, projectID) VALUES (?, ?)',[userID,projectID]
      )
      
      if (userIDs && userIDs.length > 0) {
        const userProjectsValues = userIDs.map(userId => [userId, projectID]);

        await db.promise().query(
          'INSERT INTO user_projects (userID, projectID) VALUES ?',[userProjectsValues]
        );
      }
  
      const newProjectId = result.insertId;
      return newProjectId;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error; // You might want to handle or log the error differently based on your application needs
    }
  };

const createTask = async (db, projectID, taskName, taskDescription, taskStartDate, taskEndDate, userIDs) => {
  try {
      const [result] = await db.promise().query(
          'INSERT INTO tasks (taskName, taskDescription, taskStartDate, taskEndDate, projectID, status) VALUES (?, ?, ?, ?, ?, ?)',
          [taskName, taskDescription, taskStartDate, taskEndDate, projectID, 'undone']
      );
      const newTaskId = result.insertId;

        // Insert user-task associations
        if (userIDs && userIDs.length > 0) {
          const userTaskValues = userIDs.map(userId => [userId, newTaskId]);

          await db.promise().query(
              'INSERT INTO user_tasks (userID, taskID) VALUES ?',
              [userTaskValues]
          );
      }

      return newTaskId;
  } catch (error) {
      console.error('Error creating task:', error.message);
      throw error; // Re-throw the error to propagate it to the calling code
  }
};

const deleteProjectById = async (db, projectId) => {
  try {
    // Delete tasks associated with the project
    await db.promise().query('DELETE FROM tasks WHERE projectID = ?', [projectId]);
    await db.promise().query('DELETE FROM user_projects WHERE projectID = ?', [projectId]);

    // Delete the project
    const result = await db.promise().query('DELETE FROM projects WHERE projectID = ?', [projectId]);

    return !result.affectedRows > 0; // Check if any rows were affected (project deleted)
  } catch (error) {
    throw error;
  }
};

const deleteTaskById = async (db, taskID) => {
  try {
    await db.promise().query('DELETE FROM user_tasks WHERE taskID = ?',[taskID])

    const result = await db.promise().query('DELETE FROM tasks WHERE taskID = ?',[taskID])

    return !result.affectedRows > 0;
  } catch (error) {
    throw error
  }

};


const updateProject = async (db, projectID, projectName, projectDescription, projectStartDate, projectEndDate, users) => {
  try {
    if (users && users.length > 0) {
      console.log('Deleting existing user projects for projectID:', projectID);
      await db.promise().query('DELETE FROM user_projects WHERE projectID = ?', [projectID]);

      console.log('Inserting new user projects:', users);
      const userProjectsValues = users.map(userID => [userID, projectID]);
      console.log('valores recebidos no projeto:',userProjectsValues)
      await db.promise().query(
        'INSERT INTO user_projects (userID, projectID) VALUES ?', [userProjectsValues]
      );
    }

    // Update the project details
    console.log('Updating project details:', projectName, projectDescription, projectStartDate, projectEndDate, projectID);
    const result = await db.promise().query(
      'UPDATE projects SET projectName=?, projectDescription=?, projectStartDate=?, projectEndDate=? WHERE projectID=?',
      [projectName, projectDescription, projectStartDate, projectEndDate, projectID]
    );

    return result[0].affectedRows > 0;
  } catch (error) {
    console.error('Error updating project:', error.message);
    throw error;
  }
};


const updateTask = async (db, taskID, taskName, taskDescription, taskStartDate, taskEndDate, status) => {
  try {
    const result = await db.promise().query(
      'UPDATE tasks SET taskName=?, taskDescription=?, taskStartDate=?, taskEndDate=?, status=? WHERE taskID=?',
      [taskName, taskDescription, taskStartDate, taskEndDate, status, taskID]
    );

    return result[0].affectedRows > 0; // Return true if the task was updated successfully
  } catch (error) {
    console.error('Error updating task:', error.message);
    throw error;
  }
}

const getProjectByProjectID = async (db, projectID) =>{
  try {
    const [project] = await db.promise().query('SELECT * FROM projects WHERE projectID = ?', [projectID]);
    return project[0]; // Assuming projectID is unique, so there will be only one result
  } catch (error) {
    console.error('Error fetching project by ID:', error.message);
    throw error;
  }
}

const getUsersFromAProject = async (db, projectID) =>{
  try {
    const [users] = await db.promise().query('SELECT u.userID, u.userName, u.fullName, u.email, u.jobRole, u.userLevel FROM users u JOIN user_projects up ON u.userID = up.userID WHERE up.projectID = ?',[projectID])
    return users
  } catch (error) {
    console.error('Error fetching users from projects',error.message)
    throw error
  }
}

module.exports = { updateProject };


  module.exports = {
    getAllProjects,
    getProjectsByUserId,
    getAllTasks,
    getTasksByProjectID,
    getTasksByUserId,
    createProject,
    deleteProjectById,
    createTask,
    deleteTaskById,
    updateProject,
    updateTask,
    getProjectByProjectID,
    getUsersFromAProject
  }