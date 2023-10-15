function showProjectDetails(projectId) {
    const projectName = projectId === 1 ? 'Projeto A' : 'Projeto B'; // Adjust project names accordingly
    const projectDescription = 'Descrição do projeto'; // Adjust project descriptions accordingly
    const projectStartDate = '10/10/2023'; // Adjust project start dates accordingly
    const projectStatus = 'Em andamento'; // Adjust project status accordingly
    const projectPriority = 'Alta'; // Adjust project priority accordingly

    // Update project details
    const projectDetails = document.getElementById('project-details');
    const projectNameElement = document.getElementById('project-name');
    const projectDescriptionElement = document.getElementById('project-description');
    const projectStartDateElement = document.getElementById('project-start-date');
    const projectStatusElement = document.getElementById('project-status');
    const projectPriorityElement = document.getElementById('project-priority');

    projectNameElement.innerText = `Nome do Projeto: ${projectName}`;
    projectDescriptionElement.innerText = `Descrição: ${projectDescription}`;
    projectStartDateElement.innerText = `Data de Início: ${projectStartDate}`;
    projectStatusElement.innerText = `Status: ${projectStatus}`;
    projectPriorityElement.innerText = `Prioridade: ${projectPriority}`;

    // Show project details
    projectDetails.classList.remove('hidden');
}

function showProjects() {
    // Hide project details
    const projectDetails = document.getElementById('project-details');
    projectDetails.classList.add('hidden');
}

// For demonstration purposes, calling showProjectDetails for the first project initially
showProjectDetails(1);
