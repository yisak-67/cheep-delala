import React from "react";
import "./ProfileInfo.css";
import { ProfileInfoData } from "./ProfileInfoData";

function ProfileInfo() {
  return (
    <>
      {Object.keys(ProfileInfoData).map((keyName, i) => (
        <li className="profile-info" key={i}>
          <p className="profile-info-title">{ProfileInfoData[keyName].title}</p>
          <p
            className="profile-info-value"
            contentEditable="true"
            spellcheck="false"
          >
            {ProfileInfoData[keyName].value}
          </p>
        </li>
      ))}
    </>
  );
}

export default ProfileInfo;
