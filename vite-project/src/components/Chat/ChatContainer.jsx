import React, { useRef, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addMessageWithMiddlewares } from "../../store/messages/actions";
import { selectMessageList } from "../../store/messages/selectors";
import { Chat } from "./Chat";
import { set } from "firebase/database";
import {
  getMessageListByChatId,
  getMessageRefByIdMsgId,
} from "../../services/firebase";
import { unDash } from "../../utils/unDash";
import { v4 as uuidv4 } from "uuid";

export const ChatContainer = () => {
  const messageList = useSelector(selectMessageList, shallowEqual);

  const [num, setNum] = useState(0);

  const endMessage = useRef(null);
  const { chatId } = useParams();

  const dispatch = useDispatch();

  const updateForm = (message) => {
    let timeout;
    set(getMessageRefByIdMsgId(chatId, message.id), {
      message: message.message,
      author: message.author,
      id: message.id,
      chatId: chatId,
    });

    if (message.author != "robot") {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const robotAnswer = {
          author: "robot",
          message: `I am a robot from ${chatId}`,
          id: unDash(uuidv4()),
        };
        set(getMessageRefByIdMsgId(chatId, robotAnswer.id), {
          author: robotAnswer.author,
          message: robotAnswer.message,
          id: robotAnswer.id,
          chatId: chatId,
        });
      }, 1000);
    }
  };

  useEffect(() => {
    dispatch(addMessageWithMiddlewares(chatId));
  }, [chatId]);

  useEffect(() => {
    endMessage.current?.scrollIntoView();
  }, [messageList]);

  if (!messageList[chatId]) {
    return <Navigate to="/chats" replace />;
  }

  return (
    <Chat
      messageList={messageList}
      updateForm={updateForm}
      endMessage={endMessage}
      chatId={chatId}
    />
  );
};
