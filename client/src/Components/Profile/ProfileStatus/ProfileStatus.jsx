import React from "react";
import "./ProfileStatus.css";
import { ProfileStatusData } from "./ProfileStatusData";

function ProfileStatus() {
  return (
    <>
      {ProfileStatusData.map((item, index) => {
        return (
          <div className="profile-status">
            {item.icon}
            <p className="profile-status-label">{item.label}</p>
            <p className="profile-status-description">{item.description}</p>
          </div>
        );
      })}
    </>
  );
}

export default ProfileStatus;
