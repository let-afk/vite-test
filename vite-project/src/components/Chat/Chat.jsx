import {Form} from '../Form/Form';
import {MessageList} from '../MessageList/MessageList';
import React, {useRef, useEffect} from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';

export const Chat = ({messageList, setMessageList}) => {
    const endMessage = useRef(null);
    const { chatId } = useParams();
    const navigate = useNavigate();
    const robotAnswer = {
      author: "robot",
      message: `I am a robot from ${chatId}`,
      id: new Date().getTime(),
    }
  
    const updateForm = ({author, message, id}) => {
      setMessageList((prevMessageList) => ({...prevMessageList, [chatId]:[...prevMessageList[chatId], {author: author, message: message, id: id}]}))
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