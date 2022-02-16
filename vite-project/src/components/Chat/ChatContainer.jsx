import React, {useRef, useEffect} from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addMessageWithMiddlewares } from '../../store/messages/actions';
import { selectMessageList } from '../../store/messages/selectors';
import { Chat } from './Chat';

export const ChatContainer = () => {
    const messageList = useSelector(selectMessageList, shallowEqual)

    const endMessage = useRef(null);
    const { chatId } = useParams();

    const dispatch = useDispatch();
  
    const updateForm = (message) => {
      dispatch(addMessageWithMiddlewares(message, chatId));
    }


    useEffect(() => {

    endMessage.current?.scrollIntoView();
    
    }, [messageList])

    if(!messageList[chatId]) {
      return <Navigate to="/chats" replace />;
    }

    return (
        <Chat
            messageList = {messageList}
            updateForm = {updateForm}
            endMessage = {endMessage}
            chatId = {chatId}
        />
    )
}