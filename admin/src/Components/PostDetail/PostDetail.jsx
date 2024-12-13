import React, { useEffect, useState } from "react";
import "./PostDetail.css";
import { useParams } from "react-router-dom";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Parameters from "./Parameters/Parameters";
import axios from "axios";

function PostDetail() {
  const [parameterExpanded, setParameterExpanded] = useState(false);
  const [postData, setPostData] = useState({});
  const { id } = useParams();
  // console.log(id);

  const temporaryParameters = {
    Area: postData.area + " sq meter",
    Location: postData.location,
    "number of bedrooms": postData.bedrooms,
  };

  const time = () => {};

  useEffect(() => {
    fetchPosts();
    console.log("useEffect: ", postData);
  }, []);

  async function fetchPosts() {
    try {
      const response = await axios.get(
        `http://localhost:8080/adminpostdetail/${id}`
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
      {Object.keys(postData).length > 0 && (
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
              <h2>
                {postData.price} Birr{postData.for === "rent" && "/month"}
              </h2>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostDetail;
