import React, { useContext, useEffect, useState } from "react";
import "./MessageList.css";
import axios from "axios";
import { LoginStatusContext } from "../../../App";

function MessageList(props) {
  const [msg, setMsg] = useState({});
  const sender = "Abebe Abamecha";
  const receiver = "Abdi Ahmed";

  // const {loginStatus} = useContext(LoginStatusContext);
  const user1 = props.user1?._id;
  const user2 = props.user2?._id;

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await axios.get(
        `http://localhost:8080/messages/${user1}/${user2}`
      );

      setMsg(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  // console.log("message list: ", props.user?.name);

  return (
    <div
      className="message-list-card"
      // onClick={() => props.onSelect(props.name, msg)}
      onClick={() => props.onSelect(props?.user1?._id, props?.user2?._id)}
    >
      <img alt="" src={props.imgUrl} />
      <div>
        <h2>{props.name}</h2>
        <p>{props.message}</p>
      </div>
    </div>
  );
}

export default MessageList;
