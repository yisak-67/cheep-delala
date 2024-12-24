import React, { useContext } from "react";
import "./ProfileAndName.css";
import { Link } from "react-router-dom";
import _ from "lodash";
import { LoginStatusContext } from "../../../App";

function ProfileAndName() {
  const { loginStatus, loginStatusHandler } = useContext(LoginStatusContext);
  let id = "";

  if (loginStatus) {
    id = loginStatus._id;
  }

  return _.isEqual(loginStatus, {}) ? (
    <Link to="/signup" className="sidebar-sign-up">
      <p>SIGN UP</p>
    </Link>
  ) : (

    
    <div className="miniprofile">
      <Link to={`/profiledetail/${id}`}>
        <div className="miniprofile-img">
          <img src={loginStatus?.profileImg} alt="" />
        </div>
      </Link>
      <Link to={`/profiledetail/${id}`}>
        <h1>{loginStatus.name}</h1>
      </Link>
      <Link to={`/profiledetail/${id}`}>
        <p>{loginStatus.email}</p>
      </Link>
    </div>
  );
}

export default ProfileAndName;
