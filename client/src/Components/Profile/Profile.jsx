import React, { useContext, useState } from "react";
import "./Profile.css";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import MessageIcon from "./MessageIcon/MessageIcon";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PhotoUploader from "./PhotoUploader";
import { LoginStatusContext } from "../../App";

function Profile() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { loginStatus, loginStatusHandler } = useContext(LoginStatusContext);

  const handleFileSelect = (file) => {
    setSelectedPhoto(file);
    console.log("Selected file:", file);
  };

  console.log(selectedPhoto);
  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-photo">
          <img src={loginStatus?.profileImg} alt="" className="profile-img" />
          <PhotoUploader onFileSelect={handleFileSelect} />
        </div>
        <h1 className="profile-name">{loginStatus?.name}</h1>
        {/* <p className="profile-username">
          Hawasishaa<span>@cheepDelala</span>
        </p> */}
        <div className="profile-statuses">
          <ProfileStatus />
        </div>
        <MessageIcon />
      </div>
      <div>
        <ProfileInfo />
      </div>
    </div>
  );
}

export default Profile;
