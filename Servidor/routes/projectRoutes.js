const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/projects', projectController.getAllProjects) //busca todos os projetos no sistema
router.get('/projects/:userId', projectController.getProjectsByUserId) //busca todos os projetos do usuario logado
router.get('/projects/project/:projectID', projectController.getProjectByProjectID) //busca um projeto a partir do id
router.get('/projects/tasks/all', projectController.getAllTasks) // busca todas as tarefas do sistema
router.get('/projects/tasks/:userID', projectController.getTasksByUserId) // busca todas as tasks do usuario 
router.get('/projects/project/tasks/:projectID', projectController.getTasksByProjectID) //busca todas as tasks de um projeto
router.get('/projects/task/:taskID') // busca uma task a partir do id
router.get('/projects/:projectID/users', projectController.getUsersFromAProject) //busca todos os usuários de um prjeto


router.post('/projects/newProject', projectController.createProject) //cria um novo projeto a partir dos parametros recebidos
router.post('/projects/newTask/:projectID', projectController.createTask) // cria uma nova task a partir dos parametros recebidos


router.delete('/projects/delete/project/:projectID', projectController.deleteProjectById) // deleta um projeto a partir do id
router.delete('/projects/delete/task/:taskID', projectController.deleteTaskById) // deleta uma tarefa a partir do id


router.put('/projects/update/project/:projectID', projectController.updateProject) // atualiza um projeto a partir dos parametros recebidos
router.put('/projects/update/task/:taskID', projectController.updateTask) // atualiza uma tarefa a partir dos parametros recebidos


module.exports = router;