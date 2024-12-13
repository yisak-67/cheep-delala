import React, { useContext, useEffect, useState } from "react";
import "./PostDetail.css";
import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedinIn,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import PostCard from "./PostCard";
import Parameters from "./Parameters/Parameters";
import axios from "axios";

function PostDetail() {
  const [parameterExpanded, setParameterExpanded] = useState(false);
  const [postData, setPostData] = useState({});
  const { id } = useParams();
  console.log(id);

  const temporaryParameters = {
    Area: postData.area + " sq meter",
    Location: postData.location,
    "number of bedrooms": postData.bedrooms,
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await axios.get(
        `http://localhost:8080/postdetail/${id}`
      );
      setPostData(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  function handleExpand() {
    setParameterExpanded(!parameterExpanded);
  }

  return (
    <>
      {Object.keys(postData).length > 8 && (
        <div className="post-detail">
          <div className="post-detail-info ">
            <div className="post-detail-imgs ">
              {postData.uploadedImgs && postData.uploadedImgs.length > 0 && (
                <div className="post-detail-row row">
                  <img src={postData.uploadedImgs[0]} alt="" className="col" />
                </div>
              )}
              {postData.uploadedImgs && postData.uploadedImgs.length > 3 && (
                <div className="post-detail-row row">
                  <img
                    src={postData.uploadedImgs[1]}
                    alt=""
                    className="col-4"
                  />
                  <img
                    src={postData.uploadedImgs[2]}
                    alt=""
                    className="col-4"
                  />
                  <img
                    src={postData.uploadedImgs[3]}
                    alt=""
                    className="col-4 "
                  />
                </div>
              )}
            </div>
            <div className="post-detail-sideinfo">
              <h1>{postData.title}</h1>
              <h2>{postData.price} Birr</h2>
              <h3 onClick={handleExpand}>
                Parameters{" "}
                {!parameterExpanded ? <ChevronRightIcon /> : <ExpandMoreIcon />}
              </h3>

              <div
                className={
                  !parameterExpanded
                    ? "parameters-collapsed"
                    : "parameters-expanded"
                }
              >
                {Object.keys(temporaryParameters).map((key) => (
                  <Parameters
                    title={key}
                    value={temporaryParameters[key]}
                    postData={postData}
                  />
                ))}
              </div>
              <h3>Description </h3>
              <p>{postData.description}</p>
              <Link to="/messages">
                <div className="send-message-btn">
                  <span className="btn-txt">Send Message</span>
                </div>
              </Link>
              <div className="post-detail-soical-medias">
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="social-links"
                  style={{ color: "#3b5998" }}
                />
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="social-links"
                  style={{ color: "#55acee" }}
                />
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="social-links"
                  style={{ color: "#ac2bac" }}
                />
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className="social-links"
                  style={{ color: "#0082ca" }}
                />
                <FontAwesomeIcon
                  icon={faPinterest}
                  className="social-links"
                  style={{ color: "#c61118" }}
                />
              </div>
            </div>
          </div>
          {/* <div className="suggestion">
        <h1>You may also like</h1>
        <div className="suggestion-row">
          <PostCard url="https://picsum.photos/300/200" title="House Title" />
          <PostCard url="https://picsum.photos/300/200" title="House Title" />
          <PostCard url="https://picsum.photos/300/200" title="House Title" />
          <PostCard url="https://picsum.photos/300/200" title="House Title" />

          <PostCard url="https://picsum.photos/300/200" title="House Title" />
          <PostCard url="https://picsum.photos/300/200" title="House Title" />
          <PostCard url="https://picsum.photos/300/200" title="House Title" />
          <PostCard url="https://picsum.photos/300/200" title="House Title" />
        </div>
      </div> */}
        </div>
      )}
    </>
  );
}

export default PostDetail;
