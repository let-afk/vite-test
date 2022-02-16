import {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import {ChatList} from "../ChatList/ChatList";
import {Chat} from "../Chat/Chat";
import {Home} from "../Home/Home";
import {Profile} from "../Profile/Profile";
import './Router.sass';

export const Router = () => {
    
    const [chatList, setChatList] = useState([]);
    const [messageList, setMessageList] = useState({});

    const onlyNaN = /\D/g; // все кроме цифр [0-9]

    const getOnlyNum = (str) => str.replace(onlyNaN, "")

    useEffect(() => {

        const newMessageList = {...messageList};
        const lastChat = chatList[chatList.length - 1];

        newMessageList[lastChat?.id] = [];

        setMessageList(newMessageList);

    }, [chatList])

    const removeChat = (id) => {
        const chatId =`chat${getOnlyNum(id)}`;
        
        const newChatList = [...chatList]; 
        const newMessageList = {...messageList};
        
        setChatList(newChatList.filter((chat) => chat.id !== chatId));
        
        delete newMessageList[chatId];
        setMessageList(newMessageList);

    }

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
                <Route path="chats" element={<ChatList onClick={removeChat} chatList={chatList} setChatList={setChatList} />}> 
                   <Route path=":chatId" element={<Chat messageList={messageList} setMessageList={setMessageList}/>}/>
                </Route>
                <Route element={<h2>404</h2>} />
            </Routes>
        </BrowserRouter>
)};