import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function RegisteredRow(props) {
  const id = props.user._id;
  const [users, setUsers] = useState([]);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:8080/user/${id}`)
      .then((response) => {
        setButtonDisabled(true);
        console.log("Post deleted successfully");
        const filteredObj = Object.fromEntries(
          Object.entries(users).filter(([key]) => users[key]._id !== id)
        );

        setUsers(filteredObj);
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  }

  function handleReject(id) {
    handleDelete(id);
    console.log("Reject id: ", id);
  }

  console.log("registered row: ", props);
  return (
    <div key={id} className="post-request registeredDashboard">
      <div className="name">
        <img src={props?.user?.profileImg} alt="" />
        {props?.user?.name}
      </div>
      <Link to={`/users`} className="id semi-bold">
        {props?.user?._id}
      </Link>
      {/* <div className="purpose">{props.post.for}</div> */}
      <div className="email semi-bold">{props?.user?.email}</div>
      <div className="password semi-bold">{props?.user?.password}</div>
      <div className="phone semi-bold">{props?.user?.phoneNu || "NULL"}</div>
      <div className="location semi-bold">
        {props?.user?.location || "NULL"}
      </div>
      <div className="action">
        <button
          className={`reject ${isButtonDisabled ? "disabled" : ""}`}
          disabled={isButtonDisabled}
          onClick={() => handleReject(id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default RegisteredRow;
