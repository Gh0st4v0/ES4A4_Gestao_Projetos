// Dados simulados de projetos do usuário
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
  
  function showTasks() {
    const content = document.getElementById('content');
    content.innerHTML = `
      <div class="activities-table">
        <h2>Atividades Atribuídas</h2>
        <table>
          <thead>
            <tr>
              <th>Atividade</th>
              <th>Prazo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Atividade 1</td>
              <td>15/10/2023</td>
            </tr>
            <tr>
              <td>Atividade 2</td>
              <td>18/10/2023</td>
            </tr>
            <!-- Adicionar mais linhas conforme necessário -->
          </tbody>
        </table>
      </div>
      <div class="activities-table">
        <h2>Atividades Não Concluídas</h2>
        <table>
          <thead>
            <tr>
              <th>Atividade</th>
              <th>Prazo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Atividade 3</td>
              <td>20/10/2023</td>
            </tr>
            <tr>
              <td>Atividade 4</td>
              <td>22/10/2023</td>
            </tr>
            <!-- Adicionar mais linhas conforme necessário -->
          </tbody>
        </table>
      </div>
    `;
  }


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
  
  function showProjects() {
    // ... (códigos anteriores) ...
  }
  
  function showProjectDetails(projectId) {
    // ... (códigos anteriores) ...
  }
  
  function showTasks() {
    // ... (códigos anteriores) ...
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
  