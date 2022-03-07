import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { ChatList } from "../ChatList/ChatList";
import { Profile } from "../Profile/Profile";
import { ChatContainer } from "../Chat/ChatContainer";
import "./Router.sass";
import { AnimeList } from "../AnimeList/AnimeList";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { SignUp } from "../SignUp/SignUp";
import { useEffect, useState } from "react";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { PublicRoute } from "../PublicRoute/PublicRoute";
import { auth } from "../../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const Router = () => {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthed(true);
      } else {
        setAuthed(false);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="nav-links">
        <div>
          <NavLink
            to=""
            className="nav-link"
            style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
          >
            Home
          </NavLink>
        </div>
        <div>
          <NavLink
            to="chats"
            className="nav-link"
            style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
          >
            Chats
          </NavLink>
        </div>
        <div>
          <NavLink
            to="profile"
            className="nav-link"
            style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
          >
            Profile
          </NavLink>
        </div>
        <div>
          <NavLink
            to="anime"
            className="nav-link"
            style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
          >
            Anime List
          </NavLink>
        </div>
        <div>
          <NavLink
            to="login"
            className="nav-link"
            style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
          >
            Login
          </NavLink>
        </div>
        <div>
          <NavLink
            to="signup"
            className="nav-link"
            style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
          >
            Sign Up
          </NavLink>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<PublicRoute authed={authed} />}>
          <Route path="" element={<Home />} />
        </Route>
        <Route path="profile" element={<PrivateRoute authed={authed} />}>
          <Route path="" element={<Profile />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="anime" element={<AnimeList />} />
        <Route path="chats" element={<PrivateRoute authed={authed} />}>
          <Route path="" element={<ChatList />}>
            <Route path=":chatId" element={<ChatContainer />} />
          </Route>
        </Route>
        <Route element={<h2>404</h2>} />
      </Routes>
    </BrowserRouter>
  );
};
