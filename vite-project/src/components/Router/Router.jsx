import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import {ChatList} from "../ChatList/ChatList";
import {Home} from "../Home/Home";
import {Profile} from "../Profile/Profile";
import { ChatContainer } from "../Chat/ChatContainer";
import './Router.sass';

export const Router = () => {
    
    return (
        <BrowserRouter>
            <div className="nav-links">
                <div>
                <NavLink to="" className="nav-link"  style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}>
                    Home
                </NavLink>
                </div>
                <div>
                    <NavLink to="chats" className="nav-link" style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}>
                        Chats
                    </NavLink>
                </div>
                <div>
                    <NavLink to="profile" className="nav-link" style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}>
                        Profile
                    </NavLink>
                </div>
            </div>

            <Routes>
                <Route path="" element={<Home />} />
                <Route path="profile" element={<Profile />} /> 
                <Route path="chats" element={<ChatList />}> 
                   <Route path=":chatId" element={<ChatContainer />}/>
                </Route>
                <Route element={<h2>404</h2>} />
            </Routes>
        </BrowserRouter>
)};