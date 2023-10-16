function showProjectDetails(projectId) {
    // Simulando dados do projeto com base no ID
    const projects = {
        1: {
            name: "Eletrolux",
            description: "Adição de funcionalidades (x).",
            startDate: "01/10/2023",
            status: "Em andamento",
            priority: "Alta"
        },
        2: {
            name: "Avon",
            description: "Mapeamento do banco de dados",
            startDate: "15/10/2023",
            startDate: "15/10/2023",
            status: "Concluído",
            priority: "Média"
        }
    };

    const project = projects[projectId];

    document.getElementById("project-name").innerText = `Nome do Projeto: ${project.name}`;
    document.getElementById("project-description").innerText = `Descrição: ${project.description}`;
    document.getElementById("project-start-date").innerText = `Data de Início: ${project.startDate}`;
    document.getElementById("project-status").innerText = `Status: ${project.status}`;
    document.getElementById("project-priority").innerText = `Prioridade: ${project.priority}`;

    // Exibindo os detalhes do projeto
    document.getElementById("project-details").classList.remove("hidden");
}

function showProjects() {
    // Escondendo os detalhes do projeto
    document.getElementById("project-details").classList.add("hidden");
}
