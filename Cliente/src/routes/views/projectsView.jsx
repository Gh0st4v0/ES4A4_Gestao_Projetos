/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import '../styles/Projects.css'
import NewProjectModal from './newProjectModalView';
import NewTaskModal from './newTaskModalView';
import UpdateProjectModal from './updateProjectModal';
import EditTaskModal from './updateTaskModal'; // Adjust the import path based on your project structure


const Projects = () => {
  //Estados react usados durante a execução do aplicativo
  const [isProjectModalOpen, setProjectModal] = useState(false)
  const [isTaskModalOpen, setTaskModal] = useState(false)
  const [isEditProjectModalOpen, setEditedModal] = useState(false)
  const [expandedTasksState, setExpandedTasksState] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isEditTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Function to open the modal and set the selected task
  const openEditTaskModal = (task) => {
    setSelectedTask(task);
    setEditTaskModalOpen(true);
  };

  // Function to close the modal
  const closeEditTaskModal = () => {
    setSelectedTask(null);
    setEditTaskModalOpen(false);
  };

  //Abre o modal de criação de projeto
  const handleCreateProjectClick = () =>{
    setProjectModal(true)
  }

  //Fecha o modal de criação de projeto
  const handleCloseProjectModal = () =>{
    setProjectModal(false)
  }

  //Abre o modal de criação de tarefas, se um projeto estiver selecionado
  const handleCreateTaskClick = () =>{
    if (selectedProject != undefined){
      setTaskModal(true)
    }
    else{
      window.alert('Por favor, escolha um projeto para adicionar uma tarefa')
    }
  }

  //Fecha o modal de criação de tarefas
  const handleCloseTaskModal = () =>{
    setTaskModal(false)
  }

  //Abre o modal de edição de projetos
  const handleEditProjectClick = () =>{
    setEditedModal(true)
  }

  //Fecha o modal de edição de projetos
  const handleCloseEditProjectModal = () =>{
    setEditedModal(false)
  }

  //apaga uma tarefa recebida
  const deleteTask = async (taskID) =>{
    const token = localStorage.getItem('authToken')
    const user = JSON.parse(atob(token.split('.')[1]))
    if(user.userLevel != 'master' && user.userLevel != 'admin'){
      window.alert('Somente usuarios admin ou master podem deletar tarefas')
      console.error('Privilegios insuficientes para deletar uma tarefa')
    }
    else{
      const confirmDelete = window.confirm('Tem certeza que deseja deletar a tarefa?');
      if (confirmDelete)
      try {
        const response = await fetch(`http://localhost:3001/projects/delete/task/${taskID}`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      if (response.ok){
        getTasksFromProject(selectedProject.projectID)
      }
      } catch (error) {
        console.error('Não foi possivel deletar a tarefa')
      }
    }
  }

  //Apaga um projeto recebido
  const deleteProjects = async (project) =>{
    const token = localStorage.getItem('authToken')
    const user = JSON.parse(atob(token.split('.')[1]))
    if(user.userLevel != 'master' && user.userLevel != 'admin'){
      window.alert('Somente usuarios admin ou master podem deletar projetos')
      console.error('Privilegios insuficientes para deletar um projeto')
    }
    else{
      const confirmDelete = window.confirm('Tem certeza que deseja deletar o projeto?');
    if (confirmDelete)
    try {

      const response = await fetch(`http://localhost:3001/projects/delete/project/${project.projectID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if(response.ok){
        fetchProjects()
        setTasks(undefined)
        setSelectedProject(undefined)
      }
      
    } catch (error) {
      console.error('Não foi possivel deletar o projeto')
    }
    }
  }

  //Recebe todos os projetos relacionados ao ID do usuario e os armazena no estado de projetos
  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const user = JSON.parse(atob(token.split('.')[1])); // Decode the token

      const response = await fetch(`http://localhost:3001/projects/${user.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error('Failed to fetch projects:', response.statusText);
      }
    } catch (error) {
      console.error('Error during project fetch:', error);
    }
  };

   //Trasnforma a data recebida pelo banco de dados em data que pode ser enviada nos comandos SQL
   const formatToSQLDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;
  };

  //altera o status de uma tarefa recebida
  const changeTaskStatus = async (task) =>{
    const token = localStorage.getItem('authToken');
      try {
        const response = await fetch(`http://localhost:3001/projects/update/task/${task.taskID}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            taskName: task.taskName, 
            taskDescription: task.taskDescription, 
            taskStartDate: formatToSQLDate(task.taskStartDate), 
            taskEndDate: formatToSQLDate(task.taskEndDate), 
            status: task.status === 'undone' ? 'done' : 'undone',
          })
        })

        if (response.ok){
          getTasksFromProject(selectedProject.projectID)
        }
      } catch (error) {
        console.error('Não foi possivel alterar o status',error)
      }
  }

  //recebe as tarefas de um projeto e atualiza o estado tarefas
  const getTasksFromProject = async (projectId) =>{
    // Fetch tasks for the selected project
    try {
      const token = localStorage.getItem('authToken');
      const tasksResponse = await fetch(`http://localhost:3001/projects/project/tasks/${projectId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (tasksResponse.ok) {
      const tasksData = await tasksResponse.json();
      setTasks(tasksData);
    } else {
      console.error('Failed to fetch tasks:', tasksResponse.statusText);
    }
    } catch (error) {
      console.error('Erro em buscar as tasks')
    }
  }
 
  //abre as informações do projeto quando se clica em um projeto listado
  const handleProjectItemClick = async (projectId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (projectId == undefined){
        projectId = 28
      }
  
      // Fetch the selected project details
      const projectResponse = await fetch(`http://localhost:3001/projects/project/${projectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (projectResponse.ok) {
        const projectData = await projectResponse.json();  
        if (projectData && projectData.projectName && projectData.projectDescription) {
          setSelectedProject(projectData);
          
          //busca as tarefas do projeto selecionado
          getTasksFromProject(projectId)
        } else {
          console.error('Invalid project data structure:', projectData);
        }
      } else {
        console.error('Failed to fetch project:', projectResponse.statusText);
      }
    } catch (error) {
      console.error('Error during project item click:', error);
    }
  };

  //expande ou esconde as informações da tarefa quando clicada
  const handleTaskClick = (taskId) => {
    setExpandedTasksState((prevExpandedTask) => (prevExpandedTask === taskId ? null : taskId));
  };
  
  //busca os projetos na renderização da página
  fetchProjects()
  return (
    <div id='projects-main'>
      <div id="projects-section">
    
         <h2>Projetos</h2>
        
        <ul id='projects-list'>
          <li><h3 id='project-item' onClick={handleCreateProjectClick}>+ Criar novo projeto</h3></li>
          {projects && projects.map((project) => (
            <li
              id='project-item'
              key={project.projectID}
              onClick={() => handleProjectItemClick(project.projectID)}
            >
              <h3>{project.projectName}</h3>
            </li>
          ))}
        </ul>
      </div>
      <div id="project-and-tasks-section">
        
        <div id="selected-project-section">
          {selectedProject && (
            <>
              <div id="upper-part">
              <h2 id='titulo-do-projeto'>{selectedProject.projectName}</h2>
              <div id="project-information-section">
                <div id="inicio">
                  <div id="data-label">Data de inicio:</div> {new Date(selectedProject.projectStartDate).toLocaleDateString("pt-BR")}
                </div>
                <div id="entrega">
                  <div id="data-label">Data de entrega:</div> {new Date(selectedProject.projectEndDate).toLocaleDateString("pt-BR")}
                </div>
                {selectedProject.projectDescription}</div>
              </div>
              <div id="editar-apagar-projeto">
                <button id='botao-editar' onClick={() =>handleEditProjectClick()}>editar</button>
                <button id='botao-apagar' onClick={() => deleteProjects(selectedProject)}>apagar</button>
              </div>
            </>
          )}
        </div>
        <div id="tasks-section">
          <h2>Tarefas</h2>
          <ul id='tasks-list'>
            <li id='task-item' onClick={handleCreateTaskClick}>+ Criar nova tarefa</li>
            {tasks &&
            tasks.map((task) => (
              task && (  // Add this check
                <li
                  id="task-item"
                  key={task.taskID}
                  className={task.status}
                  onClick={() => handleTaskClick(task.taskID)}
                >
                  <p id='data-label'>{task.taskName}</p>
                  {expandedTasksState === task.taskID && (
                    <div>
                      <div id="inicio">
                        <div id="data-label">Data de inicio:</div><p>{new Date(task.taskStartDate).toLocaleDateString("pt-BR")}</p>
                      </div>
                      <div id="entrega">
                        <div id="data-label">Data de término:</div><p>{new Date(task.taskEndDate).toLocaleDateString("pt-BR")}</p>
                      </div>
                      <p>{task.taskDescription}</p>
                      <div id="opcoes-tarefa">
                        <button id='botao-editar-tarefa' onClick={() => openEditTaskModal(task)}>Editar</button>
                        <button id='botao-excluir-tarefa' onClick={() => deleteTask(task.taskID)}>Excluir</button>
                        <button onClick={() => changeTaskStatus(task)}>
                          {task.status === 'done' ? 'Desfazer' : 'Concluir'}
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              )
            ))
          }
          </ul>
        </div>
      </div>
    
      <EditTaskModal
        isOpen={isEditTaskModalOpen}
        onClose={closeEditTaskModal}
        task={selectedTask}
        onTaskUpdated={() => {
          // Handle task updated event if needed
          closeEditTaskModal();
          // Optionally, you can refresh the tasks after updating
          getTasksFromProject(selectedProject.projectID);
        }}
      />
      <NewProjectModal isOpen={isProjectModalOpen} onClose={handleCloseProjectModal} onProjectCreated={handleProjectItemClick} onProjectAdded={fetchProjects}/>
      <NewTaskModal isOpen={isTaskModalOpen} onClose={handleCloseTaskModal} selectedProject={selectedProject} onTaskCreated={handleProjectItemClick}/>
      <UpdateProjectModal isOpen={isEditProjectModalOpen} onClose={handleCloseEditProjectModal} project={selectedProject} onProjectUpdated={handleProjectItemClick}></UpdateProjectModal>

    </div>
  );
};

export default Projects;