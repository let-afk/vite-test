import './App.sass';
import {Message} from './components/Message/Message.jsx';
import {Form} from './components/Form/Form.jsx';
import React, { useRef, useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function App() {
  const [messageList, setMessageList] = useState([]);
  const endMessage = useRef(null);

  const [chatList, setChatList] = useState([{name: "robot1", id: 1}, {name: "robot2", id: 2}]);

  const updateForm = (author, message) => {
    setMessageList((prevMessageList) => [...prevMessageList,{author: author, message: message}])
  }

  useEffect(() => {
    let timeout;

    endMessage.current?.scrollIntoView();

    if(messageList.length !== 0){  
      if(messageList[messageList.length - 1].author !== 'robot') {
        timeout = setTimeout(() => updateForm('robot', 'I am a robot'), 1000)
      }
    }
    return () => clearTimeout(timeout);
  }, [messageList])

  return (
    <div className="container">
      <h1 className="header">Messenger</h1>
      <div className="App">
        <List className="chatList"> 
          {chatList.map((chat) => (
          <ListItem key={chat.id}>
            <ListItemText primary={chat.name}/>
          </ListItem>
          ))}
        </List>
        <div className="chat">
          <div className="message-list">
            {messageList.map(({author, message}, i) => (
              <Message key={i} author={author} message={message} />
            ))}
          <div ref={endMessage}/>  
          </div>
          <Form onSubmit={updateForm} />
        </div>
      </div>
    </div>
  );
}

export default App;