import React, { useContext } from "react";
import "./Dashboard.css";
import RequestRow from "../RequestRow";
import { PostContext } from "../../App";
import axios from "axios";

const WaitingDashboard = () => {
  const { waitingPosts } = useContext(PostContext);
  const handleApprove = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/post"
        //   submitedInfo
      );
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form", error);
    }

    console.log(`Approving post request with ID: ${id}`);
  };
  console.log(waitingPosts);
  const handleReject = (id) => {
    console.log(`Rejecting post request with ID: ${id}`);
  };

  return (
    <div className="dashboard container">
      <h1>Waiting List</h1>
      <li className="post-request post-list-header">
        <div className="poster">poster</div>
        <div className="title">title</div>
        <div className="time bold">time</div>
        <div className="actions"></div>
      </li>
      {Object.keys(waitingPosts).map((key) => {
        const post = waitingPosts[key];
        return (
          <RequestRow
            post={post}
            handleApprove={handleApprove}
            handleReject={handleReject}
          />
        );
      })}
    </div>
  );
};

export default WaitingDashboard;
