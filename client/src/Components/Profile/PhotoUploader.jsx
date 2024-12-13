import React, { useRef } from "react";

const PhotoUploader = ({ onFileSelect }) => {
  // const fileInput = useRef(null);

  const handleFileInput = (e) => {
    // handle validations
    onFileSelect(e.target.files[0]);
  };

  return (
    <div className="photo-uploader">
      <label for="profilePhoto" class="btn">
        Select Image
      </label>
      <input
        id="profilePhoto"
        style={{ visibility: "hidden" }}
        type="file"
        onChange={handleFileInput}
        name="Change-Profile"
        accept=".jpg, .jpeg, .png"
      />
      {/* <button
        onClick={(e) => fileInput.current && fileInput.current.click()}
        className="btn btn-primary"
      >
        Upload
      </button> */}
    </div>
  );
};

export default PhotoUploader;
