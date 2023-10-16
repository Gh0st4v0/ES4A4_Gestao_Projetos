function showTarefasDetails(projectId) {
    // Simulando dados do projeto com base no ID
    const tarefas = {
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

    const tarefas = tarefas[tarefasId];

    document.getElementById("tarefas-name").innerText = `Nome do Projeto: ${tarefas.name}`;
    document.getElementById("tarefas-description").innerText = `Descrição: ${tarefas.description}`;
    document.getElementById("tarefas-start-date").innerText = `Data de Início: ${tarefas.startDate}`;
    document.getElementById("tarefas-status").innerText = `Status: ${tarefas.status}`;
    document.getElementById("tarefas-priority").innerText = `Prioridade: ${tarefas.priority}`;

    // Exibindo os detalhes do projeto
    document.getElementById("tarefas-details").classList.remove("hidden");
}

function showTarefas() {
    // Escondendo os detalhes do projeto
    document.getElementById("tarefas-details").classList.add("hidden");
}
