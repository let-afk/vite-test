import { onChildAdded, onChildRemoved } from "firebase/database";
import { chatsRef } from "../../services/firebase";

export const ADD_CHAT = "CHATS::ADD_CHAT";
export const DELETE_CHAT = "CHATS::DELETE_CHAT";

export const addChat = (id) => ({
  type: ADD_CHAT,
  payload: {
    name: `robot${id}`,
    id: `chat${id}`,
  },
});

export const deleteChat = (id) => ({
  type: DELETE_CHAT,
  payload: id,
});

export const chatsTracking = () => (dispatch) => {
  onChildAdded(chatsRef, (snapshot) => {
    dispatch(addChat(snapshot.val()));
  });

  onChildRemoved(chatsRef, (snapshot) => {
    const chatId = `chat${snapshot.val()}`;
    dispatch(deleteChat(chatId));
  });
};
