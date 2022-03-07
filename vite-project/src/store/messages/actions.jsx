import { get, onChildAdded, onValue, set } from "firebase/database";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getMessageListByChatId,
  getMessageRefByIdMsgId,
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

export const addMessageWithMiddlewares = (id, msgId) => (dispatch) => {
  onValue(getMessageRefByIdMsgId(id, msgId), (snapshot) => {
    console.log(msgId);
    console.log(snapshot.val());
    if (snapshot.val().author == undefined) {
      for (const key in snapshot.val()) {
        dispatch(addMessage(snapshot.val()[key], id));
      }
    } else {
      dispatch(addMessage(snapshot.val(), id));
    }
    // } else {
    //   dispatch(addMessage(snapshot.val().msgId, id));
    // }

    // if (snapshot.val().author != "robot") {
    //   clearTimeout(timeout);
    //   timeout = setTimeout(() => {
    //     const robotAnswer = {
    //       author: "robot",
    //       message: `I am a robot from ${id}`,
    //       id: uuidv4(),
    //     };
    //     set(getMessageRefByIdMsgId(id, robotAnswer.id), {
    //       author: robotAnswer.author,
    //       message: robotAnswer.message,
    //       chatId: id,
    //     });
    //     dispatch(addMessage(snapshot.val(), id));
    //   }, 1000);
    // }
  });
};
