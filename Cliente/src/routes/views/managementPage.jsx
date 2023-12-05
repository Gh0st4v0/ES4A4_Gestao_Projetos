import '../styles/managementPage.css';
import { useState, useEffect } from 'react';
import  CreateUserModal from './newUserModal'

const ManagementPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null)
  const [isCreateUserModalOpen, setCreateUserModalOpen] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleCreateUserModalOpen = () => {
    setCreateUserModalOpen(true);
  };

  const handleCreateUserModalClose = () => {
    setCreateUserModalOpen(false);
  };

  const handleUserCreated = () => {
    // You can update the user list or perform any action after user creation
    getAllUsers();
  };

  const handleDeleteUser = async () =>{
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(atob(token.split('.')[1]))
    console.log(user)
    try {
        if(user.userLevel != 'master'){
            window.alert('Somente o usuário mestre pode apagar outros usuários')
        }
        else
        if (selectedUser.userID == user.userId){
            window.alert('O usuário mestre não pode ser deletado')
        }
        else{
            const confirmDelete = window.confirm('Tem certeza que deseja deletar o usuário?')
        if (confirmDelete){
            const response = await fetch(`http://localhost:3001/users/delete/${selectedUser.userID}`, {
            method: 'DELETE', // Correct the property name
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                userLevel: user.userLevel,
                masterUserID: user.userId
            })
          });
            if(response.ok){
                getAllUsers()
            }
            else{
                window.alert('Não foi possivel deletar o usuário')
            }
        }
        }
    } catch (error) {
        console.error('Erro ao deletar usuário',error.message)
    }
  }

  const getAllUsers = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'GET', // Correct the property name
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const usersData = await response.json();
        setAllUsers(usersData);
      } else {
        console.error(`Failed to fetch users. Status: ${response.status}`);
        // Optionally handle the error or show a message to the user
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div id='management-main'>
      <div id="user-creation-preview-section">
        <h2>Usuários</h2>
        <div id="users-list">
            <div id="user-item" onClick={() =>handleCreateUserModalOpen()}>+ Criar Usuário</div>
          {allUsers.map((user) => (
            <div onClick={() =>handleUserClick(user)} id='user-item' key={user.userID}>{user.userName}</div>
          ))}
        </div>
      </div>

      <div id="selected-user-information-section">
        <h2>Informações do Usuário Selecionado</h2>
        {selectedUser && (
          <div id='information-list'>
            <div id="information">
                <div id="selected-information-item">
                    <p id='information-label'>Nome de usuário: </p> <p>{selectedUser.userName}</p>
                </div>

                <div id="selected-information-item">
                    <p id='information-label'>Nome Completo: </p> <p>{selectedUser.fullName}</p>
                </div>

                <div id="selected-information-item">    
                    <p id='information-label'>Email: </p> <p>{selectedUser.email}</p>
                </div>

                <div id="selected-information-item">
                    <p id='information-label'>Função: </p> <p>{selectedUser.jobRole}</p>
                </div>

                <div id="selected-information-item">
                    <p  id='information-label' >Nível de usuário: </p> <p>{selectedUser.userLevel}</p>
                </div>
            </div>

            <div id="action-buttons">
                <button onClick={()=>handleDeleteUser()}>Apagar Usuário</button>
            </div>
            
          </div>
        )}
        
      </div>
      <CreateUserModal
        isOpen={isCreateUserModalOpen}
        onClose={handleCreateUserModalClose}
        onUserCreated={handleUserCreated}
      />
    </div>
  );
};

export default ManagementPage;
