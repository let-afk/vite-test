import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link, Outlet } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addChat, chatsTracking, deleteChat } from "../../store/chats/actions";
import Button from "@mui/material/Button";
import "./ChatList.scss";
import { selectChatList } from "../../store/chats/selectors";
import {
  onChildAdded,
  onChildRemoved,
  onValue,
  remove,
  set,
} from "firebase/database";
import {
  chatsRef,
  getChatsRefById,
  getMessagesRefById,
} from "../../services/firebase";
import { useEffect } from "react";

export const ChatList = () => {
  const dispatch = useDispatch();

  const chatList = useSelector(selectChatList, shallowEqual);

  const onlyNaN = /\D/g; // все кроме цифр [0-9]
  const getOnlyNum = (str) => str.replace(onlyNaN, "");

  const addChats = () => {
    if (chatList.length > 0) {
      const lastChat = chatList[chatList.length - 1];
      const newLastId = +lastChat.id.replace(onlyNaN, "") + 1;

      set(getChatsRefById(newLastId), newLastId);
    } else {
      set(getChatsRefById(1), 1);
    }
  };

  useEffect(() => {
    dispatch(chatsTracking());
  }, []);

  const removeChat = (id) => {
    remove(getChatsRefById(getOnlyNum(id)));
    remove(getMessagesRefById(id));
  };
  return (
    <>
      <List className="chatList">
        {chatList.map((chat) => (
          <div key={`div-${chat.id}`} className="chatItem">
            <ListItem key={chat.id}>
              <Link key={`link-${chat.id}`} to={`/chats/${chat.id}`}>
                {chat.name}
              </Link>
            </ListItem>
            <Button
              onClick={() => removeChat(chat.id)}
              className="delete-chat"
              key={`button-${chat.id}`}
              size="small"
              variant="text"
              color="error"
            >
              X
            </Button>
          </div>
        ))}
        <Button onClick={addChats} size="small" variant="outlined">
          Add Chats
        </Button>
      </List>
      <Outlet />
    </>
  );
};
