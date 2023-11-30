/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { error } from 'console';
import React, { useState, useEffect } from 'react';

const UpdateProjectModal = ({ isOpen, onClose, project, onProjectUpdated }) => {
  const [editedProjectName, setEditedProjectName] = useState('');
  const [editedProjectDescription, setEditedProjectDescription] = useState('');
  const [editedProjectStartDate, setEditedProjectStartDate] = useState('');
  const [editedProjectEndDate, setEditedProjectEndDate] = useState('');
  // ... Other state variables

  useEffect(() => {
    // Update state variables with the project details when modal opens
    if (project) {
      setEditedProjectName(project.projectName);
      setEditedProjectDescription(project.projectDescription);
      setEditedProjectStartDate(project.projectStartDate);
      setEditedProjectEndDate(project.projectEndDate);
      // ... Update other state variables
    }
  }, [isOpen, project]);

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

  function formatDateToYYYYMMDD(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('authToken')
        const response = await fetch(`http://localhost:3001/projects/update/project/${project.projectID}`,{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            projectName: editedProjectName, 
            taskDescription: editedProjectDescription, 
            taskStartDate: formatToSQLDate(editedProjectStartDate), 
            taskEndDate: formatToSQLDate(editedProjectEndDate), 
          })
      })
      if(response.ok){
        onClose();
        onProjectUpdated();
      }
      else{
        console.error('Erro ao atualizar projeto:',error)
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
                onChange={(e) => setEditedProjectName(e.target.value)} required
                />

                <label id="modalLabel">Data de Início:</label>
                <input
                id="modalInput"
                type="date"
                value={formatDateToYYYYMMDD(editedProjectStartDate)}
                onChange={(e) => setEditedProjectStartDate(e.target.value)} required
                />

                <label id="modalLabel">Data de Término:</label>
                <input
                id="modalInput"
                type="date"
                value={formatDateToYYYYMMDD(editedProjectEndDate)}
                onChange={(e) => setEditedProjectEndDate(e.target.value)} required
                />

                <label id="modalLabel">Descrição do projeto:</label>
                <textarea
                id="modalInput"
                className="descriptionField"
                type="text"
                maxLength={1500}
                value={editedProjectDescription}
                onChange={(e) => setEditedProjectDescription(e.target.value)} required
                ></textarea>

                <label id="modalLabel">Selecionar Usuários:</label>
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
