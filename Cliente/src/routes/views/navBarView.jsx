import { Outlet } from "react-router-dom";
import '../styles/navBar.css'
import { useAuth } from '../../AuthContext';
import { useNavigate } from "react-router-dom";


const NavBar = () => {
    const {logout} = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout();
        navigate('/');
      };

    const handleGoToChat = () => {
        navigate('/nav/chat')
    }

    const handleGoToProjects = () => {
        navigate('/nav/projects')
    }

    const handleGoToUser = () =>{
        navigate('/nav/user')
    }

    const handleGoToManagement = () =>{
        navigate('/nav/management')
    }
    
    return(
        <div id="pageWithOutlet">
            <div id="fullNavBar">
                <div id="navBar">
                    <button id="optionButton" onClick={handleGoToUser}>Usuario</button>
                    <button id="optionButton" onClick={handleGoToChat}>Chat</button>
                    <button id="optionButton" onClick={handleGoToProjects}>Projetos</button>
                </div>
                <div id="center">
                    <h1>ABC</h1>
                    <h2>ProjectHub</h2>
                </div>
                <div id="navBar">
                    <button id="optionButton">Calendario</button>
                    <button id="optionButton" onClick={handleGoToManagement}>Gerenciar</button>
                    <button id="optionButton" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default NavBar