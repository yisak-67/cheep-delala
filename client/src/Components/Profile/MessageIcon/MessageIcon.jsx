import React, { useContext, useEffect } from "react";
import "./MessageIcon.css";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { LoginStatusContext } from "../../../App";
import axios from "axios";
import { MessageListContext } from "../../../App";

function MessageIcon(props) {
  const { loginStatus } = useContext(LoginStatusContext);
  const receiver = props?.profile;

  const { msgLists, setMsgLists } = useContext(MessageListContext);

  function handleClick() {
    const server = "http://localhost:8080";
    const chat = {
      user1: loginStatus,
      user2: receiver,
      message: [],
    };
    axios
      .post(`${server}/messageslist/${loginStatus._id}/${receiver._id}`, {
        chat: {
          user1: loginStatus,
          user2: receiver,
          message: [],
        },
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          // setMsgLists(chat);
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  }
  return (
    <div className="message-icon-wrapper">
      <Link
        to={`/messages/${loginStatus._id}/${receiver._id}`}
        onClick={handleClick}
      >
        <FiMessageSquare className="message-icon" />
      </Link>
    </div>
  );
}

export default MessageIcon;
