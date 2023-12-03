import '../styles/UserPage.css'
import { useState, useEffect } from 'react'

const UserPage = () => {
    const [userInfo, setUserInfo] = useState({})
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingFullName, setIsEditingFullName] = useState(false);
    const [editedInfo, setEditedInfo] = useState({});
    const [changesMade, setChangesMade] = useState(false);



    useEffect(() => {
        getUserInformation();
    }, []);

    const handleClickEditNameButton = () =>{
        setEditedInfo(userInfo)
        setIsEditingName(true)
    }

    const handleClickEditFullNameButton = () =>{
        setEditedInfo(userInfo)
        setIsEditingFullName(true)
    }

    const handleClickSaveNameButton = async () =>{
        const token = localStorage.getItem('authToken');
        if (changesMade){
            try {
                console.log('newName:',editedInfo.userName)
                const response = await fetch(`http://localhost:3001/users/edit/${userInfo.userID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        fieldToUpdate: 'userName',
                        updatedValue: editedInfo.userName
                    })
                });
                if (response.ok){
                    console.log('Nome alterado com sucesso')
                }
            } catch (error) {
                console.error('Erro na atualização de tarefa',error)
            }
            getUserInformation();
            console.log('Changes Saved:', editedInfo);
        }
        // Update state and exit edit mode
        setChangesMade(false);
        setIsEditingName(false)
    }

    const handleClickSaveFullNameButton = async () =>{
        const token = localStorage.getItem('authToken');
        if (changesMade){
            try {
                console.log('newName:',editedInfo.userName)
                const response = await fetch(`http://localhost:3001/users/edit/${userInfo.userID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        fieldToUpdate: 'fullName',
                        updatedValue: editedInfo.fullName
                    })
                });
                if (response.ok){
                    console.log('Nome Completo alterado com sucesso')
                }
            } catch (error) {
                console.error('Erro na atualização do nome completo',error)
            }
            getUserInformation();
            console.log('Changes Saved:', editedInfo);
        }
        // Update state and exit edit mode
        setChangesMade(false);
        setIsEditingFullName(false)
    }

    const handleTextAreaChange = (e, field) => {
        const newValue = e.target.value;
        setEditedInfo({ ...editedInfo, [field]: newValue });
        setChangesMade(true);
      };

    const getUserInformation = async () => {
        const token = localStorage.getItem('authToken');
        const user = JSON.parse(atob(token.split('.')[1]));

        try {
            const response = await fetch(`http://localhost:3001/users/${user.userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.ok) {
                const info = await response.json();
                setUserInfo(info);
                console.log(info)
            } else {
                console.error('Não foi possível recuperar as informações do usuário');
            }
        } catch (error) {
            console.error('Erro na recuperação de dados do usuário');
        }
    }

    return (
        <div id="user-page-main">
            <div id='user-information-label'>Informações de usuário</div>
            <div id="user-information">


                <div>
                    {isEditingName ? 
                    (<div id="information-item"> <p id='information-label'>Nome de Usuário: </p> <textarea value={editedInfo.userName} onChange={(e) => handleTextAreaChange(e, 'userName')}/><button id='information-edit-button' onClick={handleClickSaveNameButton}>Salvar</button> </div>) 
                    : 
                    (<div id="information-item"> <p id='information-label'>Nome de Usuário: </p> <p> {userInfo.userName}</p><button id='information-edit-button' onClick={handleClickEditNameButton}>Editar</button> </div>)
                    }
                </div>


                <div>
                    {isEditingFullName ? 
                    (<div id="information-item"> <p id='information-label'>Nome Completo: </p> <textarea value={editedInfo.fullName} onChange={(e) => handleTextAreaChange(e, 'fullName')}/><button id='information-edit-button' onClick={handleClickSaveFullNameButton}>Salvar</button> </div>) 
                    : 
                    (<div id="information-item"> <p id='information-label'>Nome Completo: </p> <p> {userInfo.fullName}</p><button id='information-edit-button' onClick={handleClickEditFullNameButton}>Editar</button> </div>)
                    }
                </div>

                
                <div id="information-item">
                    <p id='information-label'>Email: </p> <p> {userInfo.email}</p><div id='information-edit-button' className='invisivel'></div >
                </div>
                <div id="information-item-double">
                    <div id="information-item-mini">
                        <p id='information-label'>Função: </p> <p> {userInfo.jobRole}</p>
                    </div>
                    <div id="information-item-mini">
                        <p id='information-label'>Nivel de Usuário: </p> <p> {userInfo.userLevel}</p>
                    </div>
                </div>

               

            </div>
        </div>
    )
}

export default UserPage;