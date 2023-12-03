const projectModel = require('../models/projectModel');

// Controller function to get all projects
const getAllProjects = async (req, res) => {
  const db = req.db;

  try {
    const projects = await projectModel.getAllProjects(db);

    // Send the projects as a response
    res.json(projects);
  } catch (error) {
    console.error('Error getting projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProjectsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is in the URL parameters

    // Using the SQL query from the model
    projectModel.getProjectsByUserId(req.db, userId, (err, results) => {
      if (err) {
        console.error('Error in getProjectsByUserId:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      // Send the projects as a response
      res.json(results);
    });
  } catch (error) {
    console.error('Error in getProjectsByUserId:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllTasks = async (req, res) => {
  try {
    // Call the model method to get all tasks
    const tasks = await projectModel.getAllTasks(req.db);

    // Return the tasks in the response
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createProject = async (req, res) => {
  try {
    const { userID, projectName, projectDescription, projectStartDate, projectEndDate, userIDs} = req.body;    

    if (!userID || !projectName || !projectDescription || !projectStartDate || !projectEndDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const projectId = await projectModel.createProject(req.db ,userID, projectName, projectDescription, projectStartDate, projectEndDate, userIDs);

    res.status(201).json({ projectId: projectId, message: 'Project created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const createTask = async (req, res) => {
  try{
    const projectID = req.params.projectID;
    const {taskName, taskDescription, taskStartDate, taskEndDate, userIDs} = req.body

    if (!projectID || !taskName || !taskDescription || !taskStartDate || !taskEndDate || !userIDs) {
      // If any of the required fields is missing, handle the error or return a response
      return res.status(400).json({ error: 'Missing required fields' });
    }


    const taskID = await projectModel.createTask(req.db, projectID, taskName, taskDescription, taskStartDate, taskEndDate, userIDs)

    res.status(201).json({ taskID, message: 'Task created successfully' });

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getTasksByUserId = (req, res) => {
  try {
    const userID = req.params.userID;

    // Using the SQL query from the model
    projectModel.getTasksByUserId(req.db, userID, (err, results) => {
      if (err) {
        console.error('Error in getTasksByUserId:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      // Send the projects as a response
      res.json(results);
    });
  } catch (error) {
    console.error('Error in getTasksByUserId:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getTasksByProjectID = async (req, res) =>{
  try {
    const projectID = req.params.projectID
    results = await projectModel.getTasksByProjectID(req.db, projectID)
    res.json(results)
  } catch (error) {
    console.error('Error in getting tasks by project ID')
    res.status(500).json({error: 'Internal Server Error'})
  }
}

const deleteProjectById = async (req, res) => {
  try {
    
    const projectId = req.params.projectID;
    // Assuming you have a method in your model to delete a project and its tasks
    const result = await projectModel.deleteProjectById(req.db, projectId);

    if (result) {
      res.status(200).json({ message: 'Project and associated tasks deleted successfully' });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    console.error('Error in deleteProjectById:', error.message);
    console.error(error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    
    const taskID = req.params.taskID;
    const result = await projectModel.deleteTaskById(req.db, taskID);

    if (result) {
      res.status(200).json({ message: 'Tasks deleted successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Error in deleteTaskById:', error.message);
    console.error(error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateProject =  async (req, res) => {
  const { projectID } = req.params;
  const { projectName, projectDescription, projectStartDate, projectEndDate, users } = req.body;
  
  try {
    // Validate that required fields are present in the request body
    if (!projectName || !projectDescription || !projectStartDate || !projectEndDate || !users) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Call the model method to update the project
    const isUpdated = await projectModel.updateProject(req.db, projectID, projectName, projectDescription, projectStartDate, projectEndDate, users);

    // Check if the project was successfully updated
    if (isUpdated) {
      return res.status(200).json({ message: 'Project updated successfully' });
    } else {
      return res.status(404).json({ error: 'Project not found or not updated' });
    }
  } catch (error) {
    console.error('Error updating project:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTask = async (req, res) => {
  const { taskID } = req.params;
const { taskName, taskDescription, taskStartDate, taskEndDate, status } = req.body;

try {
  // Validate that required fields are present in the request body
  if (!taskName || !taskDescription || !taskStartDate || !taskEndDate || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
 
  // Call the model method to update the task
  const isUpdated = await projectModel.updateTask(req.db, taskID, taskName, taskDescription, taskStartDate, taskEndDate, status);

  // Check if the task was successfully updated
  if (isUpdated) {
    return res.status(200).json({ message: 'Task updated successfully' });
  } else {
    return res.status(404).json({ error: 'Task not found or not updated' });
  }
} catch (error) {
  console.error('Error updating task:', error.message);
  return res.status(500).json({ error: 'Internal Server Error' });
}

}

const getProjectByProjectID = async (req, res) => {
  const projectID = req.params.projectID;
  try {
    // Call the model method to get the project by ID
    const project = await projectModel.getProjectByProjectID(req.db, projectID);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    // Return the project in the response
    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getUsersFromAProject = async (req, res) =>{
  const projectID = req.params.projectID
  try {
    const response = await projectModel.getUsersFromAProject(req.db, projectID)
    if (!response){
      res.status(404).json('Users Not Found')
    }
    else res.status(200).json(response)
  } catch (error) {
    console.error('Error fetching users from a project',error.message)
    res.status(500).json({error: 'Internal server error'})
  }
}


module.exports = {
  getAllProjects,
  getProjectsByUserId,
  getAllTasks,
  getTasksByUserId,
  getTasksByProjectID,
  createProject,
  deleteProjectById,
  createTask,
  deleteTaskById,
  updateProject,
  updateTask,
  getProjectByProjectID,
  getUsersFromAProject
};
