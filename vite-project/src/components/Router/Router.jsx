import {useState, useEffect, useRef} from "react";
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ChatList} from "../ChatList/ChatList";
import {Chat} from "../Chat/Chat";
import {Home} from "../Home/Home";
import {Profile} from "../Profile/Profile";
import { deleteChat } from "../../store/chats/actions";
import { addMessageList, deleteMessageList } from "../../store/messages/actions";
import { selectChatList } from "../../store/chats/selectors"; 
import { selectMessageList } from "../../store/messages/selectors";
import './Router.sass';

export const Router = () => {
    
    const chatList = useSelector(selectChatList, shallowEqual)
    const messageList = useSelector(selectMessageList, shallowEqual)

    const dispatch = useDispatch();

    const onlyNaN = /\D/g; // все кроме цифр [0-9]

    const getOnlyNum = (str) => str.replace(onlyNaN, "")

    const usePrev = (value) => {   // получает предыдущие значение state
        
        const ref = useRef(null);

        useEffect(() => {
            ref.current = value;
        });
        return ref.current
    };

    const prevChatList = usePrev(chatList);

    useEffect(() => {

        const lastChat = chatList[chatList.length - 1];

        if(prevChatList?.length < chatList.length) { 
            dispatch(addMessageList(lastChat?.id));
        }

    }, [chatList])

    const removeChat = (id) => {
        const chatId =`chat${getOnlyNum(id)}`;
        
        dispatch(deleteChat(chatId));
        
        dispatch(deleteMessageList(chatId));

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
                <Route path="chats" element={<ChatList onClick={removeChat} chatList={chatList} />}> 
                   <Route path=":chatId" element={<Chat messageList={messageList}/>}/>
                </Route>
                <Route element={<h2>404</h2>} />
            </Routes>
        </BrowserRouter>
)};