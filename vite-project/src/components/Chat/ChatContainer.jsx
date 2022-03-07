import React, { useRef, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addMessageWithMiddlewares } from "../../store/messages/actions";
import { selectMessageList } from "../../store/messages/selectors";
import { Chat } from "./Chat";
import { onChildAdded, onValue, set } from "firebase/database";
import {
  getMessageRefByIdMsgId,
  getMessagesRefById,
  messagesRef,
} from "../../services/firebase";

export const ChatContainer = () => {
  const messageList = useSelector(selectMessageList, shallowEqual);

  const endMessage = useRef(null);
  const { chatId } = useParams();

  const dispatch = useDispatch();

  const [msgId, setMsgId] = useState("");

  const updateForm = (message) => {
    setMsgId(message.id);
    set(getMessageRefByIdMsgId(chatId, message.id), {
      message: message.message,
      author: message.author,
      chatId: chatId,
    });
  };

  useEffect(() => {
    dispatch(addMessageWithMiddlewares(chatId, msgId));
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
