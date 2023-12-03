/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import { useState, useEffect} from 'react';
import Select from "react-select";


const NewProjectModal = ({isOpen, onClose, onProjectCreated, onProjectAdded}) =>{
   //estados usados pelo modal
    const [projectName, setProjectName] = useState('')
    const [projectStartDate, setProjectStartDate] = useState('')
    const [projectEndDate, setProjectEndDate] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    //cria um projeto novo com as informações do formulaio do modal
    const handleModalSubmit = async (e) => {
      e.preventDefault()
        try {
          const token = localStorage.getItem('authToken');
          const user = JSON.parse(atob(token.split('.')[1])); // Decode the token
          const userId = user.userId;
      
          const response = await fetch('http://localhost:3001/projects/newProject', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(
                {   userID: user.userId, 
                    projectName, 
                    projectDescription, 
                    projectStartDate, 
                    projectEndDate,
                    userIDs: selectedUsers}),
          });
      
          if (response.ok) {
            const responseData = await response.json();
            onProjectAdded()
            onProjectCreated(responseData.projectId)
            onClose()
            setProjectName('');
            setProjectDescription('');
            setProjectStartDate('');
            setProjectEndDate('');
            setSelectedUsers([]);
          } else {
            let errorResponse;
            try {
              errorResponse = await response.json();
              console.error('Failed to create project:', errorResponse);
            } catch (jsonError) {
              // Handle non-JSON response (e.g., HTML error page)
              console.error('Failed to create project - non-JSON response:', response.statusText);
            }
          }
        } catch (error) {
          console.error('Error when trying to create project:', error);
        }
      };

      const userOptions = allUsers.map(user => ({
        value: user.userID,
        label: user.userName,
      }));

      //busca todos os usuarios para serem utilizados na lista, exclui da lista o usuario logado
      useEffect(() => {
        const fetchUsers = async () => {
          try {
            const token = localStorage.getItem('authToken');
            const loggedInUser = JSON.parse(atob(token.split('.')[1])); // Decode the token
            const response = await fetch('http://localhost:3001/users', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            });
    
            if (response.ok) {
              const usersData = await response.json();
              const filteredUsers = usersData.filter(user => user.userID !== loggedInUser.userId);
              setAllUsers(filteredUsers);
            } else {
              console.error('Failed to fetch users:', response.statusText);
            }
          } catch (error) {
            console.error('Error during users fetch:', error);
          }
        };
    
        fetchUsers();
      }, []);
      


    return(
        <div className = {`modal ${isOpen ? 'open' : ''}`} >
            <form action="" className="criar-projeto-modal" onSubmit={(e) => handleModalSubmit(e)}>
            <label id="modalLabel">Nome do projeto:</label>
                <input
                id="modalInput"
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)} required
                />

                <label id="modalLabel">Data de Início:</label>
                <input
                id="modalInput"
                type="date"
                value={projectStartDate}
                onChange={(e) => setProjectStartDate(e.target.value)} required
                />

                <label id="modalLabel">Data de Término:</label>
                <input
                id="modalInput"
                type="date"
                value={projectEndDate}
                onChange={(e) => setProjectEndDate(e.target.value)} required
                />

                <label id="modalLabel">Descrição do projeto:</label>
                <textarea
                id="modalInput"
                className="descriptionField"
                type="text"
                maxLength={1500}
                value={projectDescription}
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
    )
}


export default NewProjectModal;