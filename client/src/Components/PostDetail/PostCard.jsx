import React from "react";
import "./PostCard.css";
import { Link } from "react-router-dom";
import { CiCircleChevRight } from "react-icons/ci";

function PostCard(props) {
  return (
    <div className="suggestion-img ">
      <img src={props.url} alt="" />
      <div className="suggestion-title">
        <p>{props.title}</p>
        <Link className="nxt-btn">
          <CiCircleChevRight />
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
