/* eslint-disable no-unused-vars */
import Home from "./routesView/homeView";
import Projects from "./routesView/projectsView";
import Chat from "./routesView/chat";
import NotFound from "./routesView/notFound"
import NavBar from "./routesView/navBarView";
import { Routes, Route } from "react-router-dom";

function routesController() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/nav" element={<NavBar/>}>
                <Route path="/nav/projects" element={<Projects/>}/>
                <Route path="/nav/chat" element={<Chat/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>*
        </Routes>
    )
}

export default routesController