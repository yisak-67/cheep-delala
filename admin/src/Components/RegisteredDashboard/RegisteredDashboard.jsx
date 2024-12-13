import axios from "axios";
import React, { useState, useEffect } from "react";
import RegisteredRow from "./RegisteredRow";
import "./RegisteredDashboard.css";

function RegisteredDashboard() {
  const [users, setUsers] = useState([]);

  const handleReject = (id) => {
    console.log(`Rejecting post request with ID: ${id}`);
  };

  useEffect(() => {
    const server = "http://localhost:8080";
    axios
      .get(`${server}/user`)
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className="registeredDashboard container">
      <h1>Registered Users dashboard</h1>
      <li className="post-request post-list-header">
        <div className="name bold">Name</div>
        <div className="id bold ">Id</div>
        <div className="email bold">Email</div>
        <div className="password bold">Password</div>
        <div className="phone bold">Phone Number</div>
        <div className="location bold">Location</div>
        <div className="action"></div>
      </li>
      {Object.keys(users).map((key) => {
        const user = users[key];
        // console.log("li", user);
        return <RegisteredRow user={user} handleReject={handleReject} />;
      })}
    </div>
  );
}

export default RegisteredDashboard;
