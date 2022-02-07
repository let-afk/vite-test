import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Link, Outlet} from 'react-router-dom';

export const ChatList = () => {

  const chatList = [{name: "robot1", id: 'chat1'}, {name: "robot2", id: 'chat2'}];

    return (
      <>
        <List className="chatList"> 
          {chatList.map((chat) => (
          <ListItem key={chat.id}>
            <Link to={`/chats/${chat.id}`}>
              {chat.name}
            </Link>
          </ListItem>
          ))}
        </List>
        <Outlet />
      </>
    )
}