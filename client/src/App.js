// eslint-disable-next-line
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Messages from "./Components/Messages/Messages";
import SavedItems from "./Components/SavedItems";
import Post from "./Components/Post/Post";
import Settings from "./Components/Settings";
import HelpAndSupports from "./Components/HelpAndSupport";
import Profile from "./Components/Profile/Profile";
import SignUp from "./Components/Registration/SignUp";
import SignIn from "./Components/Registration/SignIn";
import PostDetail from "./Components/PostDetail/PostDetail";
import FourOFour from "./Components/FourOFour";
import React, { createContext, useEffect, useState } from "react";
import ProfileDetail from "./Components/Post/ProfileDetail";

export const LoginStatusContext = createContext();
export const SidebarStatusContext = createContext();
export const MessageListContext = createContext();
function App() {
  const [loginStatus, setLoginStatus] = useState({});
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [msgLists, setMsgLists] = useState([]);

  function loginStatusHandler(user) {
    setLoginStatus(user);
  }

  return (
    <LoginStatusContext.Provider value={{ loginStatus, loginStatusHandler }}>
      <SidebarStatusContext.Provider
        value={{ isSidebarExpanded, setIsSidebarExpanded }}
      >
        <MessageListContext.Provider value={{ msgLists, setMsgLists }}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/saveditems" element={<SavedItems />} />
              <Route path="/posts" element={<Post />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<HelpAndSupports />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/postdetail/:id" element={<PostDetail />} />
              <Route
                path="/profiledetail/:userId"
                element={<ProfileDetail />}
              />
              <Route
                path="/messages/:sender/:receiver"
                element={<Messages />}
              />
              <Route path="/*" element={<FourOFour />} />
            </Routes>
          </Router>
        </MessageListContext.Provider>
      </SidebarStatusContext.Provider>
    </LoginStatusContext.Provider>
  );
}

export default App;
