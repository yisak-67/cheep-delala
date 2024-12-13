import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PostContext } from "../../App";
import { useContext } from "react";

function PostedRow(props) {
  const id = props.post._id;
  const { postedPosts, setPostedPosts } = useContext(PostContext);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:8080/post/${id}`)
      .then((response) => {
        console.log("Post deleted successfully");
        const filteredObj = Object.fromEntries(
          Object.entries(postedPosts).filter(
            ([key]) => postedPosts[key]._id !== id
          )
        );

        setPostedPosts(filteredObj);
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  }

  const handleApprove = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/post",
        props.post
      );
      handleDelete(id);
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form", error);
    }
    console.log("Approve id: ", id);
  };

  function handleReject(id) {
    handleDelete(id);
    console.log("Reject id: ", id);
  }

  return (
    <div key={id} className="post-request">
      <div className="poster">
        <img src={props?.post?.user?.profileImg} alt="" />

        {props.post?.user?.name}
      </div>
      <Link to={`/postedpostdetail/${id}`} className="title">
        {props.post.title}
      </Link>
      <div className="purpose">{props.post.for}</div>
      <div className="time">{props.post.time}</div>
      <div className="actions">
        <button className="reject" onClick={() => handleReject(id)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default PostedRow;
