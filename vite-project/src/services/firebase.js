import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDZUozNoJM4-Dd6pP4iflu8fHCt3bgR8nw",
  authDomain: "project-1-4fe62.firebaseapp.com",
  databaseURL: "https://project-1-4fe62-default-rtdb.firebaseio.com",
  projectId: "project-1-4fe62",
  storageBucket: "project-1-4fe62.appspot.com",
  messagingSenderId: "1074663547745",
  appId: "1:1074663547745:web:5ad2ec8abeddf59a2e1b20",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);

export const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);

export const profileRef = ref(db, "profile");
export const ProfileNameRef = ref(db, `profile/name`);

export const chatsRef = ref(db, "chats");
export const getChatsRefById = (chatId) => ref(db, `chats/${chatId}`);

export const messagesRef = ref(db, "messages");
export const getMessagesRefById = (chatId) => ref(db, `messages/${chatId}`);
export const getMessageRefByIdMsgId = (chatId, msgId) =>
  ref(db, `messages/${chatId}/messageList/${msgId}`);
export const getMessageListByChatId = (chatId) =>
  ref(db, `messages/${chatId}/messageList`);
