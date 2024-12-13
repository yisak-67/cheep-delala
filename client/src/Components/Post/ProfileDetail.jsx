import React, { useContext, useEffect, useState } from "react";
import ProfileStatus from "../Profile/ProfileStatus/ProfileStatus";
import MessageIcon from "../Profile/MessageIcon/MessageIcon";
import ProfileInfo from "../Profile/ProfileInfo/ProfileInfo";
import PhotoUploader from "../Profile/PhotoUploader";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProfileDetail() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [profile, setProfile] = useState({});

  const { userId } = useParams();
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await axios.get(
        `http://localhost:8080/profiledetail/${userId}`
      );
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  const handleFileSelect = (file) => {
    setSelectedPhoto(file);
    console.log("Selected file:", file);
  };

  console.log(selectedPhoto);
  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-photo">
          <img
            src={
              profile?.profileImg
              // selectedPhoto
              //   ? URL.createObjectURL(selectedPhoto)
              //   : "https://static.vecteezy.com/system/resources/previews/014/554/760/original/man-profile-negative-photo-anonymous-silhouette-human-head-businessman-worker-support-illustration-vector.jpg"
            }
            alt=""
            className="profile-img"
          />
          <PhotoUploader onFileSelect={handleFileSelect} />
        </div>
        <h1 className="profile-name">{profile?.name}</h1>
        <p className="profile-username">
          Hawasishaa<span>@cheepDelala</span>
        </p>
        <div className="profile-statuses">
          <ProfileStatus />
        </div>
        <MessageIcon profile={profile} />
      </div>
      <div>
        <ProfileInfo />
      </div>
    </div>
  );
}

export default ProfileDetail;
