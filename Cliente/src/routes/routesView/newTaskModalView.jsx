/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import { useState, useEffect } from 'react';
import Select from 'react-select';

const NewTaskModal = ({ isOpen, onClose, selectedProject, onTaskCreated }) => {
  //estados que vão ser utilizados pelo modal  
  const [taskName, setTaskName] = useState('');
  const [taskStartDate, setTaskStartDate] = useState('');
  const [taskEndDate, setTaskEndDate] = useState('');
  const [taskDescription, setProjectDescription] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  var selectedProjectID
  if(selectedProject != null){
    selectedProjectID = selectedProject.projectID
  }

  //busca todos os usuarios para serem utilizados na lista
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:3001/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const usersData = await response.json();
          setAllUsers(usersData);
        } else {
          console.error('Failed to fetch users:', response.statusText);
        }
      } catch (error) {
        console.error('Error during users fetch:', error);
      }
    };

    fetchUsers();
  }, []);


  //faz o submit do modal e adiciona uma tarefa
  const handleModalSubmit = async (e, selectedProjectID) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      console.log('OS USERS RECEBIDOS NA FUNÇÃO:', selectedUsers);
  
      const response = await fetch(`http://localhost:3001/projects/newTask/${selectedProjectID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          taskName,
          taskDescription,
          taskStartDate,
          taskEndDate,
          userIDs: selectedUsers,
        }),
      });
  
      if (response.ok) {
        console.log('Tarefa Criada com Sucesso');
        onClose();
        onTaskCreated(selectedProjectID);
        // Clear the form by resetting the state variables
        setTaskName('');
        setProjectDescription('');
        setTaskStartDate('');
        setTaskEndDate('');
        setSelectedUsers([]);

      } else {
        let errorResponse;
        try {
          errorResponse = await response.json();
          console.error('Failed to create task:', errorResponse);
        } catch (jsonError) {
          // Handle non-JSON response (e.g., HTML error page)
          console.error('Failed to create task - non-JSON response:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error when trying to create task:', error);
    }
  };
  
  //mapeia os usuarios da lista
  const userOptions = allUsers.map(user => ({
    value: user.userID,
    label: user.userName,
  }));

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <form action="" className="criar-projeto-modal" onSubmit={(e) => handleModalSubmit(e, selectedProjectID)}>
        <label id="modalLabel">Nome da Tarefa:</label>
        <input
          id="modalInput"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)} required
        />

        <label id="modalLabel">Data de Início:</label>
        <input
          id="modalInput"
          type="date"
          value={taskStartDate}
          onChange={(e) => setTaskStartDate(e.target.value)} required
        />

        <label id="modalLabel">Data de Término:</label>
        <input
          id="modalInput"
          type="date"
          value={taskEndDate}
          onChange={(e) => setTaskEndDate(e.target.value)} required
        />

        <label id="modalLabel">Descrição da tarefa:</label>
        <textarea
          id="modalInput"
          className="taskDescriptionField"
          type="text"
          maxLength={255}
          value={taskDescription}
          onChange={(e) => setProjectDescription(e.target.value)} required
        ></textarea>

        <label id="modalLabel">Selecionar Usuários:</label>
        <Select
            isMulti
            options={userOptions}
            value={userOptions.filter(option => selectedUsers.includes(option.value))}
            onChange={(selectedOptions) => setSelectedUsers(selectedOptions.map(option => option.value))}
            required
        />

        <div id="modalButtons">
          <button id="modalCancelar" type="button" onClick={onClose}>Cancelar</button>
          <button id="modalAdicionar" type="submit">Adicionar</button>
        </div>
      </form>
    </div>
  );
};

export default NewTaskModal;
