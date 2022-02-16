import {Form} from '../Form/Form';
import {MessageList} from '../MessageList/MessageList';
import React, {useRef, useEffect} from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../store/messages/actions';

export const Chat = ({messageList}) => {
    const endMessage = useRef(null);
    const { chatId } = useParams();
    
    const robotAnswer = {
      author: "robot",
      message: `I am a robot from ${chatId}`,
      id: new Date().getTime(),
    }

    const dispatch = useDispatch();
  
    const updateForm = (message) => {
      dispatch(addMessage(message, chatId));
    }

    useEffect(() => {
      let timeout;

      endMessage.current?.scrollIntoView();

      if(messageList[chatId] && messageList[chatId].length > 0){  
        if(messageList[chatId][messageList[chatId].length - 1].author !== 'robot') {
          timeout = setTimeout(() => updateForm(robotAnswer), 1000)
        }
      }
      return () => clearTimeout(timeout);
    }, [messageList])

    if(!messageList[chatId]) {
      return <Navigate to="/chats" replace />;
    }

    return (
        <div className="chat">
          <div className="message-list">
            <MessageList messageList={messageList[chatId]} />
            <div ref={endMessage}/>
          </div> 
          <Form onSubmit={updateForm} />
        </div>
    );
}