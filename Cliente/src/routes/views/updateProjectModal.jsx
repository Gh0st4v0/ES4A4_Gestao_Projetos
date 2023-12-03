/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import Select from "react-select";

const UpdateProjectModal = ({ isOpen, onClose, project, onProjectUpdated }) => {
  const [editedProjectName, setEditedProjectName] = useState('');
  const [editedProjectDescription, setEditedProjectDescription] = useState('');
  const [formattedStartDate, setFormattedStartDate] = useState('');
  const [formattedEndDate, setFormattedEndDate] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('authToken');

      // Fetch all users
      const allUsersResponse = await fetch('http://localhost:3001/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (allUsersResponse.ok) {
        const allUsersData = await allUsersResponse.json();
        setAllUsers(allUsersData);
      } else {
        console.error('Failed to fetch all users:', allUsersResponse.statusText);
      }

      // Fetch users from the current project
      if (project) {
        const projectUsersResponse = await fetch(`http://localhost:3001/projects/${project.projectID}/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (projectUsersResponse.ok) {
          const projectUsersData = await projectUsersResponse.json();
          const selectedUserIDs = projectUsersData.map(user => user.userID);
          setSelectedUsers(selectedUserIDs);
        } else {
          console.error('Failed to fetch project users:', projectUsersResponse.statusText);
        }
      }
    } catch (error) {
      console.error('Error during users fetch:', error);
    }
  };

  // Update state variables with the project details when modal opens
  if (isOpen && project) {
    setEditedProjectName(project.projectName);
    setEditedProjectDescription(project.projectDescription);
    setFormattedStartDate(formatDateToYYYYMMDD(project.projectStartDate));
    setFormattedEndDate(formatDateToYYYYMMDD(project.projectEndDate));
    fetchUsers();
  }
}, [isOpen, project]);

// ... (Rest of the code)


  const formatToSQLDate = (dateString) => {
    const date = new Date(`${dateString} UTC`);
    return `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')} ${date
      .getUTCHours()
      .toString()
      .padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}:${date
      .getUTCSeconds()
      .toString()
      .padStart(2, '0')}`;
  };

  function formatDateToYYYYMMDD(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const userOptions = allUsers.map((user) => ({
    value: user.userID,
    label: user.userName,
  }));

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const startDate = formatToSQLDate(formattedStartDate);
    const endDate = formatToSQLDate(formattedEndDate);
    console.log('Selected users:',selectedUsers)
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:3001/projects/update/project/${project.projectID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          projectName: editedProjectName,
          projectDescription: editedProjectDescription,
          projectStartDate: startDate,
          projectEndDate: endDate,
          users: selectedUsers,
        }),
      });

      if (response.ok) {
        onProjectUpdated(project.projectID);
        onClose();
      } else {
        console.error('Erro ao atualizar', response);
      }
    } catch (error) {
      console.error('Error when trying to update project:', error);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <form action="" className="criar-projeto-modal" onSubmit={(e) => handleModalSubmit(e)}>
        <label id="modalLabel">Nome do projeto:</label>
        <input
          id="modalInput"
          type="text"
          value={editedProjectName}
          onChange={(e) => setEditedProjectName(e.target.value)}
          required
        />

        <label id="modalLabel">Data de Início:</label>
        <input
          id="modalInput"
          type="date"
          value={formattedStartDate}
          onChange={(e) => setFormattedStartDate(e.target.value)}
          required
        />

        <label id="modalLabel">Data de Término:</label>
        <input
          id="modalInput"
          type="date"
          value={formattedEndDate}
          onChange={(e) => setFormattedEndDate(e.target.value)}
          required
        />

        <label id="modalLabel">Descrição do projeto:</label>
        <textarea
          id="modalInput"
          className="descriptionField"
          type="text"
          maxLength={1500}
          value={editedProjectDescription}
          onChange={(e) => setEditedProjectDescription(e.target.value)}
          required
        ></textarea>

        <label id="modalLabel">Selecionar Usuários:</label>
        <Select
          isMulti
          options={userOptions}
          value={userOptions.filter((option) => selectedUsers.includes(option.value))}
          onChange={(selectedOptions) => setSelectedUsers(selectedOptions.map((option) => option.value))}
        />

        <div id="modalButtons">
          <button id="modalCancelar" type="button" onClick={onClose}>
            Cancelar
          </button>
          <button id="modalAdicionar" type="submit">
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProjectModal;
