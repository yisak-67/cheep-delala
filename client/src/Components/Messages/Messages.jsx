import React, { createContext, useContext, useEffect, useState } from "react";
import "./Message.css";
import SendIcon from "@mui/icons-material/Send";
import MsgCard from "./MsgCard/MsgCard";
import MessageList from "./MessageList/MessageList";
import { SidebarStatusContext } from "../../App";
import axios from "axios";
import { LoginStatusContext } from "../../App";
import { MessageListContext } from "../../App";
import { useParams } from "react-router-dom";

function Messages() {
  const { receiver } = useParams();
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [sender, setSender] = useState({});
  const [messages, setMessages] = useState({});
  const [selectedMsg, setSelectedMsg] = useState("");

  const { msgLists, setMsgLists } = useContext(MessageListContext);
  const { isSidebarExpanded } = useContext(SidebarStatusContext);
  const { loginStatus } = useContext(LoginStatusContext);

  if (receiver) {
    if (selectedMsg == "") {
      handleMsgSelect(loginStatus._id, receiver);
    }
  }

  useEffect(() => {
    const server = "http://localhost:8080";
    const id = loginStatus?._id;

    try {
      axios
        .get(`${server}/messagelists/${id}`)
        .then((response) => {
          setMsgLists(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (e) {
      console.log(e);
    }
  }, [loginStatus, msgLists]);

  useEffect(() => {
    const user1 = selectedMsg;
    const user2 = loginStatus?._id;
    const server = "http://localhost:8080";
    axios
      .get(`${server}/messages/${user1}/${user2}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [msgLists, messages]);

  function handleClick(event) {
    const user1 = selectedMsg;
    const user2 = loginStatus?._id;

    let today = new Date();
    let hour = today.getHours();
    let minute = today.getMinutes();
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    let time = hour + ":" + minute;

    if (msg !== "") {
      axios
        .post(`http://localhost:8080/messages/${user1}/${user2}`, {
          user1: user1,
          user2: user2,
          message: {
            text: msg,
            time: time,
            sender: selectedMsg,
          },
        })
        .then((response) => {
          console.log("Message is successfully stored");
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });

      setMsgs((prevMsg) => {
        return [
          ...prevMsg,
          {
            text: msg,
            time: time,
            sender: selectedMsg,
          },
        ];
      });
    }
    setMsg("");
    event.preventDefault();
  }

  function handleChange(event) {
    setMsg(event.target.value);
  }
  function handleMsgSelect(user1, user2) {
    axios
      .get(`http://localhost:8080/messages/${user1}/${user2}`)
      .then((response) => {
        if (loginStatus?._id === response.data?.user1?._id) {
          setSender(response.data?.user2);
          setSelectedMsg(user2);
        } else {
          setSender(response.data?.user1);
          setSelectedMsg(user1);
        }

        setMsgs(response.data?.message);
        console.log("Msg selected successfully");
      })
      .catch((e) => {
        console.log("handleMsgSelect Error: ", e);
      });
  }

  return (
    <>
      <div
        className={`message-page ${
          isSidebarExpanded ? "msg-expanded" : "msg-collapsed"
        }`}
      >
        <div className="message-list">
          {loginStatus &&
            msgLists?.map((list) => {
              if (list?.user1?._id !== list?.user2?._id)
                return (
                  <MessageList
                    name={
                      loginStatus._id === list?.user1?._id
                        ? list?.user2?.name
                        : list?.user1?.name
                    }
                    imgUrl={
                      loginStatus._id === list?.user1?._id
                        ? list?.user2?.profileImg
                        : list?.user1?.profileImg
                    }
                    user1={list?.user1}
                    user2={list?.user2}
                    onSelect={handleMsgSelect}
                  />
                );
            })}
        </div>
        {selectedMsg === "" ? (
          <div className="msg-unselected">
            <div>
              <p>Select a chat to start messaging</p>
            </div>
          </div>
        ) : (
          <div className="message-page-container">
            <div className="message-profile-name">
              <h1>{sender?.name}</h1>
              {/* <p>
                abdishaa<span>@cheepDelala</span>
              </p> */}
            </div>
            <div className="messages">
              <div className="message-chat-panel">
                <div className="msg">
                  {msgs?.map((message, index) => {
                    console.log(message.text);
                    return (
                      <MsgCard
                        message={message?.text}
                        isRight={message?.sender !== loginStatus?._id}
                        time={message?.time}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="message-chat-text-area">
                <form>
                  <textarea
                    id="msg-panel"
                    placeholder="Type something..."
                    value={msg}
                    onChange={handleChange}
                  ></textarea>
                  <button type="submit" onClick={handleClick}>
                    <SendIcon />
                    send
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Messages;
