const userProjects = [
    { id: 1, name: 'Projeto A', description: 'Descrição do Projeto A' },
    { id: 2, name: 'Projeto B', description: 'Descrição do Projeto B' }
  ];
  
  function showProjects() {
    const content = document.getElementById('content');
    content.innerHTML = `
      <div class="project-section">
        <h2>Projetos</h2>
        <ul>
          ${userProjects.map(project => `
            <li>
              <a href="#" onclick="showProjectDetails(${project.id})">
                ${project.name}
              </a>
            </li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  function showProjectDetails(projectId) {
    const selectedProject = userProjects.find(project => project.id === projectId);
    const content = document.getElementById('content');
    content.innerHTML = `
      <button onclick="showProjects()">Voltar</button>
      <h2>${selectedProject.name}</h2>
      <p>${selectedProject.description}</p>
      <!-- Mais detalhes do projeto aqui -->
    `;
  }
  
  const activityData = [
    { title: 'Atividade 1', start: '2023-10-15', end: '2023-10-16', description: 'Descrição da atividade 1' },
    { title: 'Atividade 2', start: '2023-10-18', end: '2023-10-20', description: 'Descrição da atividade 2' },
    { title: 'Atividade 3', start: '2023-11-10', end: '2023-11-12', description: 'Descrição da atividade 3' }
    // Adicione mais atividades conforme necessário
  ];
  
  function initializeCalendar() {
    $('#calendar-container').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: new Date(),
      navLinks: true,
      editable: true,
      eventLimit: true,
      events: activityData
    });
  }
  
  function showMembers() {
    // Lógica para mostrar a lista de membros na seção de conteúdo
  }
  
  function showCommunication() {
    // Lógica para mostrar a comunicação na seção de conteúdo
  }
  
  function showUserTasks() {
    // Lógica para mostrar as atividades atribuídas ao usuário
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();
  });
  
  // Chamada inicial para mostrar os projetos
  showProjects();
  