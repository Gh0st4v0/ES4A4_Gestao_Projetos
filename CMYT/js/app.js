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
      <div class="project-tasks">
        <h3>Tarefas</h3>
        <!-- Adicione a lista de tarefas associadas a este projeto aqui -->
      </div>
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
      events: activityData,
      titleFormat: 'MMMM YYYY'
    });
  }
  
  function showMembers() {
    // Lógica para mostrar a lista de membros na seção de conteúdo
  }
  
  function showCommunicationAndActivities() {
    const content = document.getElementById('content');
    content.innerHTML = `
      <div class="communication-section">
        <h2>Comunicação</h2>
        <!-- Implemente a interface de comunicação aqui -->
      </div>
      <div class="activities-section">
        <h2>Atividades</h2>
        <!-- Implemente a interface de atividades aqui -->
      </div>
    `;
  }
  
  // Chamada inicial para mostrar comunicação e atividades
  showCommunicationAndActivities();
  
  
  function showUserTasks() {
    // Lógica para mostrar as atividades atribuídas ao usuário
  }
  
  function showNotification(message) {
    // Implemente a exibição de notificações aqui
    console.log('Notificação:', message);
  }

  function uploadFile(file) {
    // Implemente o upload de arquivos aqui
    console.log('Arquivo enviado:', file.name);
  }
  
  function sortAndFilterActivities(criteria) {
    // Implemente a ordenação e filtragem de atividades aqui
  }

  function displayDetailsInModal(details) {
    // Implemente a exibição de detalhes em um modal aqui
  }
  
  function showActivityHistory() {
    // Implemente a exibição do histórico de atividades aqui
  }
  
  // Exemplo de uso
  showActivityHistory();
  
  function showProgressBar(progress) {
    // Implemente a exibição da barra de progresso aqui
  }
  
  // Exemplo de uso
  showProgressBar(70);

  function sendPushNotification(message) {
    // Implemente o envio de notificações push aqui
    console.log('Notificação push enviada:', message);
  }
  
  // Exemplo de uso
  sendPushNotification('Nova tarefa atribuída!');
  
  function assignTaskToMember(task, member) {
    // Implemente a atribuição de tarefas a membros aqui
  }
  
  // Exemplo de uso
  assignTaskToMember('Atividade X', 'Membro Y');

  function giveFeedback(activity, feedback) {
    // Implemente o feedback e avaliação aqui
  }
  
  // Exemplo de uso
  giveFeedback('Atividade Z', 'Ótimo trabalho!');
  

  // Exemplo de uso
  displayDetailsInModal({ title: 'Detalhes da Atividade', content: '...' });
  
  
  // Exemplo de uso
  sortAndFilterActivities({ criteria: 'data' });
  
  // Exemplo de uso
  uploadFile({ name: 'Documento.txt', size: '2MB' });
  
  
  // Exemplo de uso
  showNotification('Nova mensagem recebida!');
  

  document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();
  });
  
  // Chamada inicial para mostrar os projetos
  showProjects();

  function showActivityDetails(activity) {
    const content = document.getElementById('content');
    content.innerHTML = `
    <div id="project-side">
      <button onclick="showProjects()">Voltar</button>
      <h2>${activity.title}</h2>
      <p>${activity.description}</p>
      <p>Prazo: ${activity.start} - ${activity.end}</p>
      <button onclick="showFeedbackForm('${activity.title}')">Dar Feedback</button>
    </div id="project-side">
    `;
  }
  
  function showFeedbackForm(activityTitle) {
    const content = document.getElementById('content');
    content.innerHTML += `
      <div class="feedback-form">
        <h3>Feedback para ${activityTitle}</h3>
        <!-- Implemente um formulário para feedback aqui -->
      </div>
    `;
  }
  
  // Exemplo de uso
  const sampleActivity = { title: 'Atividade de Exemplo', description: 'Descrição da atividade', start: '2023-10-15', end: '2023-10-16' };
  showActivityDetails(sampleActivity);
  
  function showChat() {
    const content = document.getElementById('content');
    content.innerHTML += `
      <div class="chat-section">
        <div class="tituloEMensagens">
        <h2>Chat em Tempo Real</h2>
        <div id="chat-messages"></div>
        </div>
        <div class="escreverEEnviar">
        <textarea id="message-input" placeholder="Digite sua mensagem"></textarea>
        <button id="botaoEnviarMensagem" onclick="sendMessage()">Enviar</button>
        </div>
      </div>
    `;
  }
  
  function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
    if (message) {
      displayMessage(message);
      messageInput.value = '';
  
      // Simulando uma resposta do outro usuário após um pequeno atraso
      setTimeout(() => {
        const replyMessage = `Resposta automática: Olá! Você disse: "${message}"`;
        displayMessage(replyMessage, true);
      }, 1000);
    }
  }
  
  function displayMessage(message, isReply = false) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add(isReply ? 'chat-message-reply' : 'chat-message');
    messageElement.innerText = message;
    chatMessages.appendChild(messageElement);
  }
  
  // Exemplo de uso
  showChat();
  
  function displayMessage(message, isReply = false) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add(isReply ? 'chat-message-reply' : 'chat-message');
    messageElement.innerText = message;
    chatMessages.appendChild(messageElement);
  
    if (!isReply) {
      // Simulando notificação de nova mensagem
      showNotification('Nova mensagem recebida!');
    }
  }
  
  function showNotification(message) {
    const notificationElement = document.createElement('div');
    notificationElement.classList.add('notification');
    notificationElement.innerText = message;
    document.body.appendChild(notificationElement);
  
    // Remover a notificação após 3 segundos
    setTimeout(() => {
      notificationElement.remove();
    }, 3000);
  }
  
  function giveFeedback(activity, feedback) {
    // Lógica para processar o feedback e avaliação da atividade
    console.log(`Feedback para a atividade "${activity}": ${feedback}`);
  }
  
  // Exemplo de uso
  giveFeedback('Atividade X', 'Ótimo trabalho!');
  
  