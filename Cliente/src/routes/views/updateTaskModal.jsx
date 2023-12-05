/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import Select from "react-select";

const EditTaskModal = ({ isOpen, onClose, task, onTaskUpdated }) => {
  const [editedTaskName, setEditedTaskName] = useState('');
  const [editedTaskDescription, setEditedTaskDescription] = useState('');
  const [formattedStartDate, setFormattedStartDate] = useState('');
  const [formattedEndDate, setFormattedEndDate] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [projectUsers, setProjectUsers] = useState([]);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      // Fetch task details and project users when modal opens
      if (isOpen && task) {
        setEditedTaskName(task.taskName);
        setEditedTaskDescription(task.taskDescription);
        setFormattedStartDate(formatDateToYYYYMMDD(task.taskStartDate));
        setFormattedEndDate(formatDateToYYYYMMDD(task.taskEndDate));

        try {
          const token = localStorage.getItem('authToken');

          // Fetch users associated with the project of the task
          const projectUsersResponse = await fetch(`http://localhost:3001/projects/${task.projectID}/users`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          if (projectUsersResponse.ok) {
            const projectUsersData = await projectUsersResponse.json();
            setProjectUsers(projectUsersData);

            // Set selected users based on the task
            const selectedUserIDs = task.users.map((user) => user.userID);
            setSelectedUsers(selectedUserIDs);
          } else {
            console.error('Failed to fetch project users:', projectUsersResponse.statusText);
          }
        } catch (error) {
          console.error('Error during project users fetch:', error);
        }
      }
    };

    fetchTaskDetails();
  }, [isOpen, task]);

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

  const userOptions = projectUsers.map((user) => ({
    value: user.userID,
    label: user.userName,
  }));

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const startDate = formatToSQLDate(formattedStartDate);
    const endDate = formatToSQLDate(formattedEndDate);

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:3001/projects/update/task/${task.taskID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          taskName: editedTaskName,
          taskDescription: editedTaskDescription,
          taskStartDate: startDate,
          taskEndDate: endDate,
          status: task.status,
          users: selectedUsers,
        }),
      });

      if (response.ok) {
        onTaskUpdated(task.taskID);
        onClose();
      } else {
        console.error('Error updating task:', response.statusText);
      }
    } catch (error) {
      console.error('Error when trying to update task:', error);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <form action="" className="criar-projeto-modal" onSubmit={(e) => handleModalSubmit(e)}>
        <label id="modalLabel">Nome da Tarefa:</label>
        <input
          id="modalInput"
          type="text"
          value={editedTaskName}
          onChange={(e) => setEditedTaskName(e.target.value)}
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

        <label id="modalLabel">Descrição da tarefa:</label>
        <textarea
          id="modalInput"
          className="taskdescriptionField"
          type="text"
          maxLength={255}
          value={editedTaskDescription}
          onChange={(e) => setEditedTaskDescription(e.target.value)}
          required
        ></textarea>

        <label id="modalLabel">Selecionar Usuários:</label>
        <Select
          isMulti
          options={userOptions}
          value={userOptions.filter((option) => selectedUsers.includes(option.value))}
          onChange={(selectedOptions) => setSelectedUsers(selectedOptions.map((option) => option.value))}
          required
        />

        <div id="modalButtons">
          <button id="modalCancelar" type="button" onClick={onClose}>
            Cancel
          </button>
          <button id="modalAdicionar" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskModal;
