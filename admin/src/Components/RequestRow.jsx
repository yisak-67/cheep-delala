import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PostContext } from "../App";

function RequestRow(props) {
  const id = props.post._id;
  const { posts, setPosts } = useContext(PostContext);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:8080/adminpost/${id}`)
      .then((response) => {
        console.log("Post deleted successfully");
        const filteredObj = Object.fromEntries(
          Object.entries(posts).filter(([key]) => posts[key]._id !== id)
        );

        setPosts(filteredObj);
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  }

  const handleApprove = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/adminpost",
        props.post
      );
      setButtonDisabled(true);
      handleDelete(id);

      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form", error);
    }
    console.log("Approve id: ", id);
  };

  function handleReject(id) {
    // window.location.reload();
    setButtonDisabled(true);
    handleDelete(id);
    console.log("Reject id: ", id);
  }

  return (
    <div key={id} className="post-request">
      <div className="poster">
        <img src={props?.post?.user?.profileImg} alt="" />

        {props.post?.user?.name}
      </div>
      <Link to={`/postdetail/${id}`} className="title">
        {props.post.title}
      </Link>
      <div className="purpose">{props.post.for}</div>
      <div className="time">{props.post.time}</div>
      <div className="actions">
        <button
          className={`approve ${isButtonDisabled ? "disabled" : ""}`}
          disabled={isButtonDisabled}
          onClick={() => handleApprove(id)}
        >
          Approve
        </button>
        <button
          className={`reject ${isButtonDisabled ? "disabled" : ""}`}
          disabled={isButtonDisabled}
          onClick={() => handleReject(id)}
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default RequestRow;
