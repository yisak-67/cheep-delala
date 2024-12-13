// import logo from './logo.svg';
import "./App.css";
import WaitingDashboard from "./Components/WaitingDashboard/WaitingDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createContext } from "react";
import PostDetail from "./Components/PostDetail/PostDetail";
import Navbar from "./Components/Navbar/Navbar";
import PostedDashboard from "./Components/PostedDashboard/PostedDashboard";
import PostedPostDetail from "./Components/PostedDashboard/PostDetail";
import RegisteredDashboard from "./Components/RegisteredDashboard/RegisteredDashboard";

export const PostContext = createContext();

function App() {
  const [waitingPosts, setWaitingPosts] = useState([]);
  const [postedPosts, setPostedPosts] = useState([]);

  useEffect(() => {
    const server = "http://localhost:8080";
    Promise.all([axios.get(`${server}/adminpost`), axios.get(`${server}/post`)])
      .then((responses) => {
        const response1 = responses[0];
        const response2 = responses[1];

        setWaitingPosts(responses[0].data);
        setPostedPosts(responses[1].data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [waitingPosts]);

  return (
    <PostContext.Provider
      value={{ waitingPosts, setWaitingPosts, postedPosts, setPostedPosts }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<WaitingDashboard />} />
          <Route path="/postdetail/:id" element={<PostDetail />} />
          <Route path="/postedpostdetail/:id" element={<PostedPostDetail />} />

          <Route path="/posted/:type" element={<PostedDashboard />} />
          <Route path="/users" element={<RegisteredDashboard />} />
        </Routes>
      </Router>
    </PostContext.Provider>
  );
}

export default App;
