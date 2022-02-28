import { onChildAdded, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import {
  getMessageRefById,
  getMessageRefByMsgId,
} from "../../services/firebase";

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

let timeout;

export const addMessageWithMiddlewares = (id) => (dispatch) => {
  onChildAdded(getMessageRefByMsgId(id), (snapshot) => {
    dispatch(addMessage(snapshot.val(), id));
    if (snapshot.val().author != "robot") {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const robotAnswer = {
          author: "robot",
          message: `I am a robot from ${id}`,
          id: uuidv4(),
        };
        set(getMessageRefById(id, robotAnswer.id), {
          author: robotAnswer.author,
          message: robotAnswer.message,
          chatId: id,
        });
      }, 1000);
    }
  });
};
