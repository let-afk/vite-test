import { onChildAdded } from "firebase/database";
import { getMessageListByChatId } from "../../services/firebase";

export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";

export const addMessage = (value, id) => ({
  type: ADD_MESSAGE,
  payload: {
    author: value.author,
    message: value.message,
    id: value.id,
  },
  chatId: id,
});

export const addMessageWithMiddlewares = (chatId) => (dispatch, getState) => {
  onChildAdded(getMessageListByChatId(chatId), (snapshot) => {
    console.log(snapshot.val());
    if (
      getState().messages[chatId].findIndex(
        (msg) => msg.id === snapshot.val().id
      ) === -1
    ) {
      dispatch(addMessage(snapshot.val(), chatId));
    }
  });
};
