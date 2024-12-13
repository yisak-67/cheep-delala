import React, { useState } from "react";
import "./MsgCard.css";

function MsgCard(props) {
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
  return (
    <>
      {props.isRight ? (
        <div className="msg-card right">
          <p>
            {props.message}
            <span className="time">{props.time}</span>
          </p>
          {/* <img alt="" src="https://picsum.photos/200" /> */}
        </div>
      ) : (
        <div className="msg-card left">
          {/* <img alt="" src="https://picsum.photos/200" /> */}
          <p>
            {props.message}
            <span className="time">{props.time}</span>
          </p>
        </div>
      )}
    </>
  );
}

export default MsgCard;
