import {Form} from '../Form/Form';
import {MessageList} from '../MessageList/MessageList';
import React, {useState, useRef, useEffect} from 'react';
import {useParams} from "react-router-dom";

export const Chat = () => {
    const [messageList, setMessageList] = useState({chat1: [], chat2: []});
    const { chatId } = useParams();
    const endMessage = useRef(null);

  const updateForm = (author, message) => {
    setMessageList((prevMessageList) => ({...prevMessageList, [chatId]:[...prevMessageList[chatId], {author: author, message: message}]}))
  }
  useEffect(() => {
    let timeout;

    endMessage.current?.scrollIntoView();
    console.log(chatId)
    if(messageList[chatId].length !== 0){  
      if(messageList[chatId][messageList[chatId].length - 1].author !== 'robot') {
        timeout = setTimeout(() => updateForm('robot', `I am a robot from ${chatId}`), 1000)
      }
    }
    return () => clearTimeout(timeout);
  }, [messageList])

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