/* eslint-disable no-unused-vars */
import Home from "./views/homeView";
import Projects from "./views/projectsView";
import UserPage from "./views/userPage";
import Chat from "./views/chat";
import NotFound from "./views/notFound"
import NavBar from "./views/navBarView";
import ManagementPage from "./views/managementPage";
import { Routes, Route } from "react-router-dom";

function routesController() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/nav" element={<NavBar/>}>
                <Route path="/nav/projects" element={<Projects/>}/>
                <Route path="/nav/chat" element={<Chat/>}/>
                <Route path="/nav/user" element={<UserPage/>}/>
                <Route path="/nav/management" element={<ManagementPage/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>*
        </Routes>
    )
}

export default routesController