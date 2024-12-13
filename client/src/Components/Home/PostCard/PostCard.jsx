import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./PostCard.css";
import _ from "lodash";
import { LoginStatusContext } from "../../../App";
const area = require("./icons/area.png");
const bathroom = require("./icons/bathroom.png");
const bedroom = require("./icons/bedroom.png");
const location = require("./icons/location.png");
const guarage = require("./icons/guarage.png");

function PostCard(props) {
  const id = props?.post?._id;
  const userId = props?.post?.user?._id;
  const { loginStatus, loginStatusHandler } = useContext(LoginStatusContext);

  const currentTime = new Date();
  const storedTime = new Date(props?.time);

  const timeDifference = currentTime - storedTime;
  const timeAgo = formatTimeDifference(timeDifference);
  function formatTimeDifference(timeDiff) {
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    }
  }
  console.log("a: ", currentTime, timeAgo);
  console.log("time: ", timeDifference, timeAgo);

  return (
    <>
      <div className="cardContainer">
        <div className="photoContainer">
          <img src={props?.post?.uploadedImgs[0]} alt="House Image"></img>
          <div className="forwhat">For {props?.post?.for}</div>
          <Link
            to={_.isEqual(loginStatus, {}) ? "signup" : `/postdetail/${id}`}
            className="formore"
          >
            For More
          </Link>
          <div className="Price">{props?.post?.price}Birr/mo</div>
        </div>
        <div className="dataContainer">
          <div className="houseTitle">
            <p className="firstTitle">{props?.post?.title}</p>
            <div className="dataContainerSeparated">
              <img src={location} alt="" />
              <p className="Location">{props?.post?.location}</p>
            </div>

            <div className="dataContainerSeparated">
              <img src={bedroom} alt="" />
              <p className="bedroom">{props?.post?.bedrooms} Bedrooms</p>
              <img src={bathroom} alt="" />
              <p className="bathroom">1 Bathrooms</p>
            </div>
            <div className="dataContainerSeparated">
              <img src={area} alt="" />
              <p className="housesize">{props?.post?.area}sq meter</p>
              <img src={guarage} alt="" />
              <p className="guarage">1 guarage</p>
            </div>
            <Link
              to={`/profiledetail/${userId}`}
              className="dataContainerSeparated datafooter"
            >
              <img src={props?.post?.user?.profileImg} alt="" />
              <p className="postername">{props?.post?.user?.name}</p>
              <p className="timeposted">2 min. ago</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCard;
