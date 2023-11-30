import '../routesStyles/UserPage.css'
import { useState, useEffect } from 'react'

const UserPage = () => {
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        getUserInformation();
    }, []);

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
                <div id="information-item">
                    <p id='information-label'>Nome de Usuário: </p> <p> {userInfo.userName}</p><button id='information-edit-button'>Editar</button>
                </div>
                <div id="information-item">
                    <p id='information-label'>Nome Completo: </p> <p> {userInfo.fullName}</p><button id='information-edit-button'>Editar</button>
                </div>
                <div id="information-item">
                    <p id='information-label'>Email: </p> <p> {userInfo.email}</p><button id='information-edit-button'>Editar</button >
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